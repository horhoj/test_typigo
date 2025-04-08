import { AxiosError } from 'axios'
import { ref } from 'vue'
import type { Ref } from 'vue'

export interface RequestError {
  code: number | null
  message: string
}

export const useRequest = <T, P extends unknown[]>(
  request: (...params: P) => Promise<T>,
  isClearDataOnNewRequest = false
) => {
  const response = ref(null) as Ref<T | null>
  const isLoading = ref<boolean>(false)
  const requestError = ref<RequestError | null>(null)

  const run = async (...params: P): Promise<void> => {
    try {
      isLoading.value = true
      requestError.value = null
      if (isClearDataOnNewRequest) {
        response.value = null
      }

      const currentResponse = await request(...params)

      if (currentResponse !== undefined && currentResponse !== null) {
        response.value = currentResponse
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        requestError.value = {
          code: e.response?.status ?? null,
          message: e.message
        }
      } else {
        requestError.value = { code: null, message: 'unknown error' }
      }
      response.value = null
    } finally {
      isLoading.value = false
    }
  }

  return {
    response,
    isLoading,
    requestError,
    run
  }
}
