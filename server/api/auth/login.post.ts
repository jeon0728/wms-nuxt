// server/api/auth/login.post.ts
import { defineEventHandler, readBody, setCookie } from 'h3'
import type { LoginResponse } from '~/types/auth'
import type { ApiResponse } from '~/types/api'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // 외부 백엔드에 실제 인증 요청
  const config = useRuntimeConfig()
  const backendUrl = `${config.public.apiBase}/api/mock/auth/login`

  try {
    const resp = await $fetch<ApiResponse<LoginResponse>>(backendUrl, {
      method: 'POST',
      body,
      // fetch from server side
    })

    const {resultCd, resultMsg, resultData} = resp

    // 예: backend returns { accessToken: 'xxx', refreshToken: 'yyy' }
    // 우리는 refreshToken은 httpOnly cookie로 저장하고 accessToken만 반환
    // 단, 실제 backend가 refresh token을 반환하지 않는다면 backend가 직접 Set-Cookie 하게 해야 함.
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
    throw createError({ statusCode: 401, message: '로그인 실패' })
  }
})
