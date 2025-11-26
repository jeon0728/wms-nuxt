import { outboundData } from '../data/outbound'
import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
  // optional query handling
  const url = new URL(event.node.req.url ?? '', `http://${event.node.req.headers.host}`)
  const status = url.searchParams.get('status') // e.g., ?status=pending
  const sku = url.searchParams.get('sku')
  let result = outboundData
  if (status) result = result.filter(i => i.status === status)
  if (sku) result = result.filter(i => i.sku.includes(sku))
  return result
})
