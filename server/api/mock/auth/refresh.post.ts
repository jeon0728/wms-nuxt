import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const refresh = getCookie(event, 'refresh_token')

  if (refresh === 'mock-refresh-token-456') {
    const refreshRes = {
      accessToken: 'mock-access-token-new-789',
      refreshToken: null,
      user: null
    }
    return {
      resultCd: 200,
      resultMsg: '토큰 갱신 완료',
      resultData: refreshRes
    }
  }

  return {
    resultCd: 401,
    resultMsg: '아이디 또는 비밀번호가 올바르지 않습니다.',
    resultData: null
  }
})
