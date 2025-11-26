import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Item } from '~/types/models'
import { useApi } from '~/composables/useApi'

export const useInventoryStore = defineStore('inventory', () => {
  const list = ref<Item[]>([])
  const api = useApi()

  const fetchAll = async () => {
    list.value = await api.get<Item[]>('/inventory')
  }

  const adjust = async (payload: { id?: number, sku?: string, delta?: number, qty?: number }) => {
    const res = await api.put<Item>('/inventory/adjust', payload)
    const idx = list.value.findIndex(i => (payload.id && i.id === payload.id) || (payload.sku && i.sku === payload.sku))
    if (idx !== -1) list.value[idx] = res
    return res
  }

  return { list, fetchAll, adjust }
})
