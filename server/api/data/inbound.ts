// server/api/data/inbound.ts
import { Inbound } from '~/types/models'

export let inboundData: Inbound[] = [
  {
    id: 1,
    sku: 'SKU-001',
    name: 'Sample Item A',
    qty: 100,
    status: 'pending',
    location: 'A-01',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    sku: 'SKU-002',
    name: 'Sample Item B',
    qty: 50,
    status: 'received',
    location: 'B-02',
    createdAt: new Date().toISOString()
  }
]
