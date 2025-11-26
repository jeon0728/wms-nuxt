// server/api/data/outbound.ts
import { Outbound } from '~/types/models'

export let outboundData: Outbound[] = [
  {
    id: 1,
    sku: 'SKU-003',
    name: 'Sample Item C',
    qty: 10,
    status: 'pending',
    location: 'C-01',
    createdAt: new Date().toISOString()
  }
]
