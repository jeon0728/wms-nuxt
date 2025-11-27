import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Inbound } from '~/types/models'
import type { ApiResponse } from '~/types/api'
import { useApi } from '~/composables/useApi'

export const useInboundStore = defineStore('inbound', () => {
  const items = ref<Inbound[]>([])
  const loading = ref(false)
  const errorMsg = ref<string>("")
  const { requestApi } = useApi()

  async function fetchList() {
    try {
        const result = await requestApi<ApiResponse<Inbound[]>>(
            '/api/inbound',
            { method: 'GET' }
        )
        const {resultCd, resultMsg, resultData} = result
        items.value = resultData
    } catch (err: any) {
        errorMsg.value = err?.data?.message || '회원 조회 중 오류가 발생했습니다.'
    }finally {
        loading.value = false
    }
  }

  async function fetchListBySearchText(payload: { searchText: string }) {
    try {
        const result = await requestApi<Array<Inbound>>(
            '/api/inbound',
            { method: 'POST', body: payload }
        )
        items.value = result
    } catch (err: any) {
        errorMsg.value = err?.data?.message || '회원 조회 중 오류가 발생했습니다.'
    }finally {
        loading.value = false
    }
  }

  // async function getDetailById(id: number) {
  //   await fetchList()
  //   return items.value.find(u => u.id === id)
  // }

  async function getDetailById(id: number) {
    try {
      const detailData = await requestApi<ApiResponse<Inbound>>(
        `/api/inbound/${id}`,
        { 
          method: 'GET'
        }
      )

      const {resultCd, resultMsg, resultData} = detailData
      
      // store.item 배열에서 해당 ID 업데이트
      //const idx = items.value.findIndex(u => u.id === id)
      if (resultCd === 200) return resultData
      
    } catch (err: any) {
      errorMsg.value = err?.data?.message || '수정 중 오류가 발생했습니다.'
      return false
    } finally {
      loading.value = false
    }
  }

  async function create(payload: Partial<Inbound>) {
    try {
      const newData = await requestApi<ApiResponse<Inbound>>(
        '/api/inbound/create',
        { 
          method: 'POST',
          body: payload
        }
      )

      const {resultCd, resultMsg, resultData} = newData

      console.log(resultCd)
      console.log(resultMsg)
      console.log(resultData)

      if (resultCd === 200) {
        items.value.push(resultData) // 목록 상태 갱신  
        return true
      } 
      else return false 
      
    } catch (err: any) {
      errorMsg.value = err?.data?.message || '등록 중 오류가 발생했습니다.'
      return false
    } finally {
      loading.value = false
    }
  }

  async function update(id: number, data: Partial<Inbound>) {
    try {
      const updatedData = await requestApi<Inbound>(
        `/api/inbound/${id}`,
        { 
          method: 'PUT',
          body: data
        }
      )
      
      // store.item 배열에서 해당 ID 업데이트
      const idx = items.value.findIndex(u => u.id === id)
      if (idx !== -1) {
        items.value[idx] = updatedData
      }

      return true
      
    } catch (err: any) {
      errorMsg.value = err?.data?.message || '수정 중 오류가 발생했습니다.'
      return false
    } finally {
      loading.value = false
    }
  }

  // const create = async (payload: Partial<Inbound>) => {
  //   const res = await api.post<Inbound>('/inbound/create', payload)
  //   items.value.push(res)
  //   return res
  // }

  return { 
    items,
    loading,
    fetchList,
    fetchListBySearchText,
    getDetailById,
    create,
    update
  }
})
