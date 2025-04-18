import axios from 'axios'
import apiRoutes from '../../config'
import { get, patch } from '../../network/https'

export class AddInstitution {
  static async add_institution(data: Record<string, string | any>) {
    const token = JSON.parse(localStorage.getItem('nssf_user_token') as string)
    console.log('Token used for request:', token)
    try {
      const response = await axios.post(
        `http://api.test.nssf.ng${apiRoutes.institutions}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log('response create institution', response.data)
      return response.data
    } catch (error: any) {
      console.log('Error response:', error.response)
      console.log('Error message:', error.response?.data?.message)
      return Promise.reject({
        message: error.response?.data?.message || 'An error occurred',
        status_code: error.response?.status,
        results: error.response?.data?.results,
      })
    }
  }
}

export class GetRecentlyAddedInstitutions {
  static async get_recently_added_institutions(data: Record<string, any>) {
    const response = await get({
      url: apiRoutes.getAllInstitution,
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

export class GetAllInstitutions {
  static async all_institutions(data: Record<string, any>) {
    console.log('Getting all institutions...')
    const response = await get({
      url: apiRoutes.institutions,
      data,
    })
    console.log('After get function call', response)

    if (response.status === 'error') {
      console.log('All institution error response', response)

      return Promise.reject({
        message: response.message,
        status_code: response.status_code,
        results: response.results,
      })
    }
    if (response) {
      console.log('All institution response', response)
      return response
    }
  }
}

export class ViewInstitute {
  static async view_institute(id: string) {
    const response = await get({
      url: `${apiRoutes.getInstitute}/${id}`,
    })
    if (response.status === 'error') {
      console.error('Error*** Response GI', JSON.stringify(response, null, 2))
      console.log('Err Response GI', response)
      return Promise.reject({
        message: response.message,
        status_code: response.status_code,
        results: response.results,
      })
    }
    if (response.status === 'success') {
      console.log('Response GI', response)
      return response
    }
  }
}

//UPDATE INSTITUTE
export class UpdateInstitute {
  static async update_institute(
    id: string,
    data: {
      name: string
      email: string
      mobile_number: string
      address: string
      state: number
      local_government: number
      ward: number
      operation_days: string
      opening_time: string
      closing_time: string
      logo: string
    }
  ) {
    const response = await patch({
      url: `${apiRoutes.institutions}${id}/`,
      data,
    })

    if (response.status === 'error') {
      console.log('err', response)
      return Promise.reject({
        message: response.message,
        status_code: response.status_code,
        results: response.results,
      })
    }

    if (response.status === 'success') {
      console.log('success', response)
      return response
    }
  }
}

//Get institution analytics
export class GetInstitutionsAnalytics {
  static async get_institutions_analytics(data: Record<string, string>) {
    const response = await get({
      url: apiRoutes.institutionAnalytics,
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
