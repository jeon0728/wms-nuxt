// middleware/auth.global.ts
import { useAuthStore } from '~/stores/auth'
import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()
  // SSR 첫 진입 시 쿠키에서 토큰 복구
  auth.loadFromCookie()

  // 보호가 필요한 경로라면 meta에 `requiresAuth: true` 설정
  if (to.meta?.requiresAuth) {
    if (!auth.accessToken) {
      // 시도: refresh할 수 있는지 확인
      const ok = await auth.refreshToken()
      if (!ok) {
        return navigateTo('/login')
      }
    }
  }
})
