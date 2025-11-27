// types/api.ts
export interface ApiResponse<T> {
  resultCd: number
  resultMsg?: string
  resultData: T
}
