import { inboundData } from '../data/inbound'
import { readBody, defineEventHandler } from 'h3'
import { Inbound } from '~/types/models'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const payload = body as Partial<Inbound> //받을 필드가 일부만 올 수 있음을 표현.
  const newItem: Inbound = {
    id: Date.now(),
    sku: payload.sku ?? `SKU-${Math.floor(Math.random()*10000)}`,
    name: payload.name ?? 'Unknown',
    qty: payload.qty ?? 0,
    status: 'pending',
    location: payload.location,
    createdAt: new Date().toISOString()
  }
  inboundData.push(newItem)
  return newItem
})
