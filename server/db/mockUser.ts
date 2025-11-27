const STORAGE_KEY = 'mock:user'

export async function getUserDB() {
  const storage = useStorage()
  const data = await storage.getItem(STORAGE_KEY) as any[]

  if (!data) {
    const initialData = [
      {
        id: 1,
        email: "admin",
        password: "1234",
        name: "관리자",
        role: "ADMIN"
      },
      {
        id: 2,
        email: "worker",
        password: "1111",
        name: "창고담당",
        role: "USER"
      }
    ]
    await storage.setItem(STORAGE_KEY, initialData)
    return initialData
  }

  return data
}

export async function updateUserDB(newData: any[]) {
  const storage = useStorage()
  await storage.setItem(STORAGE_KEY, newData)
}
