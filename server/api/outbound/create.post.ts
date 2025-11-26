import { Outbound } from '~/types/models'
import { outboundData } from '../data/outbound'
import { readBody, defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event) as any
  const payload = body as Partial<Outbound> //받을 필드가 일부만 올 수 있음을 표현.
  const newItem: Outbound = {
    id: Date.now(),
    sku: body.sku,
    name: body.name,
    qty: body.qty,
    status: 'pending',
    location: body.location,
    createdAt: new Date().toISOString()
  }
  outboundData.push(newItem)
  return newItem
})
