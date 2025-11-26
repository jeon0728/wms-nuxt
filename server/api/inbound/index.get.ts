// server/api/inbound/index.get.ts
import { defineEventHandler, getCookie } from 'h3'
import { useRuntimeConfig } from '#imports'
import { Inbound } from '~/types/models'
import { inboundData } from '../data/inbound'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const backendUrl = `${config.public.apiBase}/api/mock/inbound`

  // ⭐ Access Token 가져오기 (Nuxt server는 httpOnly cookie 접근 가능)
  const accessToken = getCookie(event, 'access_token')

  if (!accessToken) {
    throw createError({ statusCode: 401, message: 'Missing access token' })
  }

  try {
    // backend API 호출
    const resp = await $fetch(backendUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    return resp
  } catch (e: any) {
    console.error('Proxy inbound failed:', e)

    if (e?.status === 401) {
      // 토큰 만료 상황
      throw createError({ statusCode: 401, message: 'Unauthorized - Token expired' })
    }

    throw createError({ statusCode: 500, message: 'Proxy Search failed' })
  }
})
