import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Outbound } from '~/types/models'
import { useApi } from '~/composables/useApi'

export const useOutboundStore = defineStore('outbound', () => {
  const items = ref<Outbound[]>([])
  const loading = ref(false)
  const api = useApi()

  const fetchList = async (params?: Record<string, any>) => {
    loading.value = true
    items.value = await api.get<Outbound[]>('/outbound', params)
    loading.value = false
  }

  const create = async (payload: Partial<Outbound>) => {
    const res = await api.post<Outbound>('/outbound/create', payload)
    items.value.push(res)
    return res
  }

  const get = async (id: number) => {
    return await api.get<Outbound>(`/outbound/${id}`)
  }

  const update = async (id: number, data: Partial<Outbound>) => {
    const res = await api.put<Outbound>(`/outbound/${id}`, data)
    const idx = items.value.findIndex(i => i.id === id)
    if (idx !== -1) items.value[idx] = res
    return res
  }

  return { items, loading, fetchList, create, get, update }
})
