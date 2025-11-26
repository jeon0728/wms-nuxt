import { outboundData } from '../data/outbound'
import { readBody, defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params as { id: string }
  const idx = outboundData.findIndex(o => o.id === Number(id))
  if (idx === -1) throw createError({ statusCode: 404 })
  const body = await readBody(event)
  // partial update: accept status change ('received') or qty/location edits
  outboundData[idx] = { ...outboundData[idx], ...body }
  return outboundData[idx]
})
