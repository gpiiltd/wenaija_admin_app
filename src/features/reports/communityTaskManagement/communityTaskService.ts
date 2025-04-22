import apiRoutes from '../../../config'
import { get } from '../../../network/https'

export type QuestionPayload = {
  title: string
  options: {
    text: string
    weight: number
    requires_comment: boolean
    requires_image: boolean
  }[]
}[]

export class GetCommunityTaskCategories {
  static async community_task_categories(data: Record<string, string>) {
    const response = await get({
      url: `${apiRoutes.getCategories}?category_type=community_task`,
      data: { ...data },
    })
    if (response.status === 'error') {
      return Promise.reject({
        message: response.message,
        status_code: response.status_code,
        results: response.results,
      })
    }
    if (response.status === 'success') {
      return response
    }
  }
}

export class GetCommunityTaskMetrics {
  static async community_task_metrics(data: Record<string, string>) {
    const response = await get({
      url: apiRoutes.ctMetrics,
      data,
    })
    if (response.status === 'error') {
      return Promise.reject({
        message: response.message,
        status_code: response.status_code,
        results: response.results,
      })
    }
    if (response.status === 'success') {
      return response
    }
  }
}
