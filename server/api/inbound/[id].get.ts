import { inboundData } from '../data/inbound'
import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
  const { id } = event.context.params as { id: string }
  const found = inboundData.find(i => i.id === Number(id))
  if (!found) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }
  return found
})
