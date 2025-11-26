const STORAGE_KEY = 'mock:inbound'

export async function getInboundDB() {
  const storage = useStorage()
  const data = await storage.getItem(STORAGE_KEY) as any[]

  if (!data) {
    const initialData = [
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
    await storage.setItem(STORAGE_KEY, initialData)
    return initialData
  }

  return data
}

export async function updateInboundDB(newData: any[]) {
  const storage = useStorage()
  await storage.setItem(STORAGE_KEY, newData)
}
