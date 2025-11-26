// server/api/mock/inbound/[id].put.ts
import { getInboundDB, updateInboundDB } from '~/server/db/mockInbound'
import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)
  const body = await readBody(event)

  let db = await getInboundDB()
  const itemIndex = db.findIndex(item => item.id === id)

  if (itemIndex === -1) {
    return {
      status: 404,
      message: 'Item not found',
      data: null
    }
  }

  // 업데이트 처리
  db[itemIndex] = {
    ...db[itemIndex],
    ...body
  }

  await updateInboundDB(db)

  return {
    status: 200,
    message: 'Updated successfully',
    data: db[itemIndex]
  }
})
