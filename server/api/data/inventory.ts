// server/api/data/inventory.ts
import { Item } from '~/types/models'

export let inventoryData: Item[] = [
  { id: 1, sku: 'SKU-001', name: 'Sample Item A', qty: 100, location: 'A-01', createdAt: new Date().toISOString() },
  { id: 2, sku: 'SKU-002', name: 'Sample Item B', qty: 50, location: 'B-02', createdAt: new Date().toISOString() }
]
