// server/api/auth/refresh.post.ts
import { defineEventHandler, getCookie, setCookie } from 'h3'
import { LoginResponse } from '~/types/auth'
import { ApiResponse } from '~/types/api'

export default defineEventHandler(async (event) => {
  console.log('🔵 서버에서 읽은 refresh token:')
  const config = useRuntimeConfig()
  const backendUrl = `${config.public.apiBase}/api/auth/refresh`
  console.log('🔵 서버에서 읽은 refresh token:')


  // 서버는 클라이언트의 쿠키(브라우저에서 보낸)를 포함하여 백엔드로 보냄
  const refreshCookie = getCookie(event, 'refresh_token')

  console.log('🔵 서버에서 읽은 refresh token:', refreshCookie)

  if (!refreshCookie) {
    throw createError({ statusCode: 401, message: 'Refresh token missing' })
  }

  try {
    const resp = await $fetch<ApiResponse<LoginResponse>>('/api/mock/refresh', { 
        method: 'POST',
        headers: { cookie: `refresh_token=${refreshCookie}` } 
    })

    const {resultCd, resultMsg, resultData} = resp

    // backend returns { accessToken, refreshToken? }
    if (resultData?.refreshToken) {
      setCookie(event, 'refresh_token', resultData.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
      })
    }
    return resp
  } catch (e) {
    throw createError({ statusCode: 401, message: '리프래시 실패' })
  }
})
