// server/api/mock/inbound/index.get.ts
import { getInboundDB } from '~/server/db/mockInbound'
import { defineEventHandler, getHeader } from 'h3'

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'authorization')
  const data = await getInboundDB()

  // 정해진 mock 토큰인지 확인
  if (authHeader !== 'Bearer mock-access-token-new-789' && 
      authHeader !== 'Bearer mock-access-token-123') {
    return {
      status: 401,
      message: 'Invalid or expired token'
    }
  }

  return {
    status: 200,
    data: data
  }
})
