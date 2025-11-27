// server/api/logout.post.ts
import { defineEventHandler, setCookie, getCookie } from 'h3'
import { ApiResponse } from '~/types/api'
import { LoginResponse } from '~/types/auth'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const backendUrl = `${config.public.apiBase}/api/mock/auth/logout`

  try {
    // 저장된 refreshToken 쿠키 가져오기 (백엔드가 필요할 수도 있으니까)
    const refreshToken = getCookie(event, 'refresh_token')

    const resp = await $fetch<ApiResponse<LoginResponse>>(backendUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Cookie: refreshToken ? `refresh_token=${refreshToken}` : ''
      }
    })

    // Nuxt 서버에서도 쿠키 삭제 (access / refresh / JWT 등)
    setCookie(event, 'access_token', '', { httpOnly: true, expires: new Date(0), path: '/' })
    setCookie(event, 'refresh_token', '', { httpOnly: true, expires: new Date(0), path: '/' })

    return resp
  } catch (error) {
    console.warn('Backend logout failed:', error)
  }
})
