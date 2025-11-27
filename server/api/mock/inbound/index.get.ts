// server/api/mock/inbound/index.get.ts
import { getInboundDB } from '~/server/db/mockInbound'
import { defineEventHandler, getHeader } from 'h3'

export default defineEventHandler(async (event) => {
  const data = await getInboundDB()

  return {
    resultCd: 200,
    resultMsg: 'Success',
    resultData: data
  }
})
