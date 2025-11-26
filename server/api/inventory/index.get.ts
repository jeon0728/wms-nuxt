import { inventoryData } from '../data/inventory'
import { defineEventHandler } from 'h3'

export default defineEventHandler(() => {
  return inventoryData
})
