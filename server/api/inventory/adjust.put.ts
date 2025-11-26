import { inventoryData } from '../data/inventory'
import { readBody, defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event) as { sku?: string, id?: number, delta?: number, qty?: number }
  let item
  if (body.id) {
    item = inventoryData.find(it => it.id === body.id)
  } else if (body.sku) {
    item = inventoryData.find(it => it.sku === body.sku)
  }
  if (!item) throw createError({ statusCode: 404, statusMessage: 'Item not found' })
  if (typeof body.delta === 'number') {
    item.qty += body.delta
  } else if (typeof body.qty === 'number') {
    item.qty = body.qty
  }
  return item
})
