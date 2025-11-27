// server/api/mock/inbound/[id].put.ts
import { getInboundDB, updateInboundDB } from '~/server/db/mockInbound'
import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)
  let db = await getInboundDB()
  const itemIndex = db.findIndex(item => item.id === id)

  if (itemIndex === -1) {
    return {
      resultCd: 404,
      resultMsg: 'Item not found',
      resultData: null
    }
  } else {
    return {
      resultCd: 200,
      resultMsg: 'Updated successfully',
      resultData: db[itemIndex]
    }
  }
})
