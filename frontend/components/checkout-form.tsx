'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/utils'
import { initPaymentSession, setCartEmail, completeCart } from '@/lib/medusa/checkout'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// ── Inner form — rendered inside <Elements> so useStripe/useElements work ──

function PaymentForm({ cartId }: { cartId: string }) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const { clearCart } = useCart()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError('First name, last name, and email are required.')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      // Set email on cart before confirming payment
      await setCartEmail(cartId, email.trim())

      // Confirm payment with Stripe — redirect: 'if_required' keeps us on-page
      // for standard cards; only redirects for 3DS/bank flows
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          payment_method_data: {
            billing_details: { name: `${firstName.trim()} ${lastName.trim()}`, email: email.trim(), phone: phone.trim() || undefined },
          },
        },
        redirect: 'if_required',
      })

      if (stripeError) {
        setError(stripeError.message ?? 'Payment failed. Please try again.')
        return
      }

      if (paymentIntent?.status === 'succeeded' || paymentIntent?.status === 'requires_capture') {
        const order = await completeCart(cartId)
        clearCart()
        router.push(`/order/${order.id}`)
      } else {
        setError('Payment was not completed. Please try again.')
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact info */}
      <div>
        <h2 className="mb-4 text-lg font-extrabold text-foreground">Contact information</h2>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="firstName" className="mb-1 block text-sm font-semibold text-foreground">
                First name <span className="text-primary">*</span>
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="Kim"
                className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="mb-1 block text-sm font-semibold text-foreground">
                Last name <span className="text-primary">*</span>
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Nhung"
                className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-semibold text-foreground">
              Email <span className="text-primary">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-semibold text-foreground">
              Phone <span className="text-xs font-normal text-muted-foreground">(optional)</span>
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(248) 555-0142"
              className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Payment */}
      <div>
        <h2 className="mb-4 text-lg font-extrabold text-foreground">Payment</h2>
        <div className="rounded-xl border border-border bg-background p-4">
          <PaymentElement />
        </div>
      </div>

      {error && (
        <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting || !stripe || !elements}
        className="w-full rounded-full bg-primary px-6 py-4 text-base font-bold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-60"
      >
        {submitting ? 'Placing order…' : 'Place order'}
      </button>

      <p className="text-center text-xs text-muted-foreground">
        This is a pickup order — no shipping address required. We&apos;ll email your confirmation.
      </p>
    </form>
  )
}

// ── Outer wrapper — initializes Stripe Elements with client_secret ──

export function CheckoutForm() {
  const { cart, clearCart } = useCart()
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [initError, setInitError] = useState<string | null>(null)

  useEffect(() => {
    if (!cart?.id) return
    setInitError(null)
    initPaymentSession(cart.id)
      .then(setClientSecret)
      .catch((err) => setInitError(err?.message ?? 'Could not initialize payment'))
  }, [cart?.id])

  if (!cart || cart.items.length === 0) {
    return (
      <p className="text-muted-foreground">
        Your cart is empty.{' '}
        <a href="/products" className="font-semibold text-primary hover:underline">
          Continue shopping
        </a>
      </p>
    )
  }

  if (initError) {
    return (
      <div className="space-y-3">
        <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {initError}
        </p>
        <button
          type="button"
          onClick={() => { clearCart(); window.location.href = '/products' }}
          className="text-sm font-semibold text-primary hover:underline"
        >
          Clear cart and start over →
        </button>
      </div>
    )
  }

  if (!clientSecret) {
    return <p className="text-sm text-muted-foreground">Preparing checkout…</p>
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: { colorPrimary: 'oklch(0.585 0.222 25)' },
        },
      }}
    >
      <PaymentForm cartId={cart.id} />
    </Elements>
  )
}

// ── Order summary sidebar ──

export function OrderSummary() {
  const { cart } = useCart()
  if (!cart) return null

  return (
    <div className="rounded-2xl border border-border bg-muted/40 p-6">
      <h2 className="mb-4 text-base font-extrabold text-foreground">Order summary</h2>
      <ul className="space-y-3">
        {cart.items.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <div className="size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
              {item.thumbnail && (
                <img src={item.thumbnail} alt={item.title} className="size-full object-cover" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground">Qty {item.quantity}</p>
            </div>
            <span className="text-sm font-bold text-foreground">{formatPrice(item.subtotal)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 border-t border-border pt-4">
        <div className="flex items-center justify-between font-bold text-foreground">
          <span>Subtotal</span>
          <span>{formatPrice(cart.subtotal)}</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">Taxes calculated at checkout</p>
      </div>
    </div>
  )
}
