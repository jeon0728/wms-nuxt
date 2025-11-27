// server/api/mock/inbound/create.post.ts
import { defineEventHandler, readBody } from 'h3'
import { getInboundDB, updateInboundDB } from '~/server/db/mockInbound'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // 새 ID 생성 (간단히 timestamp 사용)
  const newId = Date.now()

  // DB 읽어오기
  let db = await getInboundDB()

  // 같은 데이터가 존재하는지 검증할 수도 있지만,
  // 보통 create 시에는 unique key 기준으로 확인 필요
  const isExist = db.some(item => item.name === body.name) // 예시
  if (isExist) {
    return {
      resultCd: 409,
      resultMsg: 'Item already exists',
      resultData: null
    }
  }

  // 새 데이터 push
  const newItem = {
    id: newId,
    ...body,
    createdAt: new Date()
  }

  db.push(newItem)

  // DB 업데이트
  await updateInboundDB(db)

  return {
    resultCd: 200,
    resultMsg: 'Created successfully',
    resultData: newItem
  }
})
