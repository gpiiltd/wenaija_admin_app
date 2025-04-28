import apiRoutes from '../../../config'
import { get, post } from '../../../network/https'

export type CommunityTaskPayload = {
  question: string
  indicator_identifier: string
  question_type: string
  max_points: number
  options: string | string[]
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

export class CreateCommunityTask {
  static async create_community_task(data: CommunityTaskPayload) {
    const response = await post({
      url: apiRoutes.createCommunityTask,
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

export class GetPeningTasks {
  static async pending_tasks(data: Record<string, string>) {
    const response = await get({
      url: apiRoutes.getPendingTasks,
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

export class ViewSubmittedTask {
  static async view_submitted_task(id: string) {
    const response = await get({
      url: `${apiRoutes.getSubmission}${id}/detail`,
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

//No dispatch yet
export class ReviewSubmittedTask {
  static async review_submitted_task(
    id: string,
    percentage: number,
    feedback: string
  ) {
    const response = await post({
      url: `${apiRoutes.getSubmission}${id}/review`,
      data: {
        percentage,
        feedback,
      },
    })

    if (response.status === 'error') {
      console.error('Error*** Response II', JSON.stringify(response, null, 2))
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

export class GetReviewedTasks {
  static async reviewed_tasks(data: Record<string, string>) {
    const response = await get({
      url: apiRoutes.reviewedTasks,
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
