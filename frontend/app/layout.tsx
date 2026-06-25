import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/lib/i18n'
import { CartProvider } from '@/lib/cart-context'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kimnhungsuperfood.com'),
  title: {
    default:
      'Kim Nhung Superfood | Asian Supermarket in Madison Heights, Michigan',
    template: '%s | Kim Nhung Superfood',
  },
  description:
    "Metro Detroit's largest Asian & Vietnamese superstore. 25,000 sq ft of live seafood, fresh bánh mì bakery, imported pantry staples, Asian beauty brands, and a new indoor food hall in Madison Heights, MI.",
  keywords: [
    'Asian grocery Madison Heights',
    'Vietnamese grocery Michigan',
    'Asian supermarket Detroit',
    'Asian food near me',
    'live seafood Michigan',
    'Asian bakery Michigan',
    'bánh mì Madison Heights',
    'H Mart alternative Detroit',
    'Kim Nhung Superfood',
  ],
  openGraph: {
    title: 'Kim Nhung Superfood | Asian Superstore in Madison Heights, MI',
    description:
      "Metro Detroit's destination Asian superstore — live seafood, fresh bakery, imported groceries, beauty, and an upcoming indoor food hall.",
    url: 'https://www.kimnhungsuperfood.com',
    siteName: 'Kim Nhung Superfood',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fdf8f1' },
    { media: '(prefers-color-scheme: dark)', color: '#2b1f18' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} bg-background`}>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <ThemeProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </ThemeProvider>
        </LanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
