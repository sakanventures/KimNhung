import type { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import { Modules } from '@medusajs/framework/utils'

export default async function orderNumberSubscriber({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const orderService = container.resolve(Modules.ORDER)

  const now = new Date()
  const startOfDay = new Date(now)
  startOfDay.setHours(0, 0, 0, 0)
  const endOfDay = new Date(now)
  endOfDay.setHours(23, 59, 59, 999)

  // Count all orders placed today (including this one — it's already persisted)
  const todayOrders = await orderService.listOrders(
    { created_at: { $gte: startOfDay, $lte: endOfDay } } as never,
    { select: ['id'], take: undefined },
  )

  const counter = String(todayOrders.length).padStart(3, '0')
  const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`
  const orderNumber = `KN-${dateStr}-${counter}`

  await orderService.updateOrders([
    { id: data.id, metadata: { order_number: orderNumber } },
  ])
}

export const config: SubscriberConfig = {
  event: 'order.placed',
}
