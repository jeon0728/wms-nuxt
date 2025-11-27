import { readBody, defineEventHandler } from 'h3'
import { Inbound } from '~/types/models'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  const id = event.context.params?.id
  const backendUrl = `${config.public.apiBase}/api/mock/inbound/create`

  // ⭐ Access Token 가져오기 (Nuxt server는 httpOnly cookie 접근 가능)
  const accessToken = getCookie(event, 'access_token')

  if (!accessToken) {
    throw createError({ status: 401, message: 'Missing access token' })
  }

  try {
    // backend API 호출
    const resp = await $fetch(backendUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body
    })

    return resp
  } catch (e: any) {
    console.error('Proxy inbound failed:', e)

    if (e?.status === 401) {
      // 토큰 만료 상황
      throw createError({ status: 401, message: 'Unauthorized - Token expired' })
    }

    throw createError({ status: 500, message: 'Proxy update failed' })
  }
})
