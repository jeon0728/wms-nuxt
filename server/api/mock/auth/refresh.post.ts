import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const refresh = getCookie(event, 'refresh_token')

  if (refresh === 'mock-refresh-token-456') {
    return {
      accessToken: 'mock-access-token-new-789'
    }
  }

  return {
    status: 401,
    message: 'Refresh token invalid'
  }
})
