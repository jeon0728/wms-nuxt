// stores/auth.ts
import { defineStore } from 'pinia'
import { useCookie, useRuntimeConfig } from '#app'
import type { LoginResponse } from '~/types/auth'
import type { ApiResponse } from '~/types/api'
import type { LoginPayload } from '~/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const config = useRuntimeConfig()
  const accessToken = ref<string | null>(null)
  // optional: store user info
  const user = ref<{ id: number; email: string; name?: string } | null>(null)
  const { requestApi } = useApi()

  // refresh 락/큐 (동시 refresh 방지)
  let refreshPromise: Promise<boolean> | null = null

  const saveAccessToken = (token: string | null) => {
    accessToken.value = token
    // 클라이언트 측 저장: localStorage는 XSS 위험. 짧은 Access token이라면 localStorage 사용 가능하나 권장 X.
    // 여기선 쿠키에도 저장(보완 필요). 또는 in-memory만으로 두고 SSR에서 load할 수 있게 하자.
    const cookie = useCookie('access_token')
    cookie.value = token
  }

  const loadFromCookie = () => {
    const cookie = useCookie('access_token')
    if (cookie.value) accessToken.value = cookie.value
  }

  async function login(payload: LoginPayload) {
    // 로그인 요청은 백엔드 API로 보내는 것이 기본(A 옵션)
    try {
      const url = `${config.public.apiBase}/api/auth/login`
      const res = await requestApi<ApiResponse<LoginResponse>>(url, {
        method: 'POST',
        body: payload,
        credentials: 'include' // 타 도메인끼리도 쿠키전송 되도록 하기 위해서
      })

      const {resultCd, resultMsg, resultData} = res

      if (resultCd === 200) {
        saveAccessToken(resultData.accessToken)
        if (res.resultData.user) user.value = resultData.user ?? null
        return true
      }
      return false
    } catch (e) {
      console.error('login error', e)
      return false
    }
  }

  async function logout() {
    // inform backend to clear refresh cookie (optional)
    try {
      const url = `${config.public.apiBase}/api/auth/logout`
      const res = await requestApi(url, { method: 'POST', credentials: 'include' })
      const {resultCd, resultMsg, resultData} = res

      if (resultCd === 200) {
        saveAccessToken(null)
        user.value = null
        // remove cookie
        useCookie('access_token').value = null
        router.push('/login')
      }
    } catch (e) {
      console.warn('logout request failed', e)
    }
  }

  // refreshToken으로 새로운 access token 요청 (동시성 처리 포함)
  async function refreshToken(): Promise<boolean> {
    if (refreshPromise) return refreshPromise // 이미 진행 중이면 대기
    refreshPromise = (async () => {
      try {
        const url = `${config.public.apiBase}/api/auth/refresh`
        // refresh 토큰은 httpOnly 쿠키에 있으므로 credentials: 'include'
        const res = await requestApi<ApiResponse<LoginResponse>>(url, {
          method: 'POST',
          credentials: 'include'
        })

        const {resultCd, resultMsg, resultData} = res

        if (resultCd === 200) {
          saveAccessToken(resultData.accessToken)
          return true
        }
        // 실패 시 강제 로그아웃
        await logout()
        return false
      } catch (e) {
        console.error('refresh failed', e)
        await logout()
        return false
      } finally {
        refreshPromise = null
      }
    })()
    return refreshPromise
  }

  // ⭐ 로그인 여부 계산
  const isLoggedIn = computed(() => {
    return !!accessToken.value && !!user.value
  })

  return {
    accessToken,
    user,
    login,
    logout,
    refreshToken,
    loadFromCookie,
    isLoggedIn
  }
})
