// types/models.ts
export type ID = number

export type Item = {
  id: ID
  sku: string
  name: string
  qty: number
  location?: string
  createdAt: string
}

export type Inbound = {
  id: ID
  sku: string
  name?: string
  qty: number
  status: 'pending' | 'received'
  location?: string
  createdAt: string
}

export type Outbound = {
  id: ID
  sku: string
  name?: string
  qty: number
  status: 'pending' | 'shipped'
  location?: string
  createdAt: string
}


