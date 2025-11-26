import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // 아주 단순한 로그인 체크
  if (body.email === 'test' && body.password === '1234') {
    // 정상 발급했다고 가정
    return {
      accessToken: 'mock-access-token-123',
      refreshToken: 'mock-refresh-token-456'
    }
  }

  return {
    status: 401,
    message: 'Invalid credentials'
  }
})
