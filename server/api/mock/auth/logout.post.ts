// server/api/mock/logout.post.ts
import { defineEventHandler, setCookie } from 'h3'

export default defineEventHandler(async (event) => {
  console.log('[MOCK] User logged out')

  // 쿠키 제거
  setCookie(event, 'access_token', '', { httpOnly: true, expires: new Date(0), path: '/' })
  setCookie(event, 'refresh_token', '', { httpOnly: true, expires: new Date(0), path: '/' })

  return {
      resultCd: 200,
      resultMsg: '로그아웃 성공',
      resultData: null
    }
})
