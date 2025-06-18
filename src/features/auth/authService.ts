import apiRoutes from '../../config'
import { post, put } from '../../network/https'

export class LoginService {
  static async signin(data: Record<string, string>) {
    LoginService._deleteToken()
    const response = await post({
      url: apiRoutes.login,
      data: { ...data },
    })
    if (response.status === 'error') {
      throw new Error(response.message as string)
    }
    if (response.status === 'success') {
      console.log('LOGIN RESPONSE', response)
      LoginService._saveToken(
        response?.results?.access_credentials.access_token
      )
      return response
    }
  }
  static _saveToken(data: string) {
    localStorage.setItem('nssf_user_token', JSON.stringify(data))
  }
  static _deleteToken() {
    localStorage.removeItem('nssf_user_token')
  }
}

export class OTPService {
  static async otp(data: Record<string, string>) {
    const response = await post({
      url: apiRoutes.login2FA,
      data: { ...data },
    })
    if (response.status === 'error') {
      throw new Error(response.message as string)
    }
    if (response.status === 'success') {
      OTPService._saveToken(response?.results?.access_credentials.access_token)

      OTPService._saveRefreshToken(
        response?.results?.access_credentials.refresh_token
      )
      OTPService._saveEmail(response?.results?.email)
      return response
    }
  }
  static _saveToken(data: string) {
    localStorage.setItem('nssf_user_token', JSON.stringify(data))
  }
  static _saveRefreshToken(data: string) {
    localStorage.setItem('nssf_refresh_token', JSON.stringify(data))
  }
  static _getRefreshToken(): string | null {
    const token = localStorage.getItem('nssf_refresh_token')
    return token ? JSON.parse(token) : null
  }
  static _getAccessToken(): string | null {
    const token = localStorage.getItem('nssf_user_token')
    return token ? JSON.parse(token) : null
  }
  static _saveEmail(data: string) {
    localStorage.setItem('nssf_user_email', JSON.stringify(data))
  }
}

export class AdminInviteService {
  static async admin_invite(data: Record<string, string>) {
    const response = await post({
      url: apiRoutes.adminInvite,
      data: { ...data },
    })
    if (response.status === 'error') {
      throw new Error(response.message as string)
    }
    if (response.status === 'success') {
      console.log('AUTH RESPONSE', response)
      return response
    }
  }
}

export class PasswordResetService {
  static async password_reset(data: Record<string, string>) {
    const response = await post({
      url: apiRoutes.passwordReset,
      data: { ...data },
    })
    if (response.status === 'error') {
      throw new Error(response.message as string)
    }
    if (response.status === 'success') {
      return response
    }
  }
}

export class VerificationService {
  static async email_verification(data: Record<string, string>) {
    const response = await post({
      url: apiRoutes.emailVerification,
      data: { ...data },
    })
    if (response.status === 'error') {
      console.log('VERIFY RESPONSE****', response)
      return Promise.reject({
        message: response.message,
        status_code: response.status_code,
        results: response.results,
      })
    }
    if (response.status === 'success') {
      console.log('VERIFY RESPONSE', response)

      VerificationService._saveToken(
        response?.results?.access_credentials.token
      )
      return response
    }
  }
  static _saveToken(data: string) {
    localStorage.setItem('nssf_user_token', JSON.stringify(data))
  }
}

export class CreateNewPasswordService {
  static async create_new_password(data: Record<string, string>) {
    const response = await put({
      url: apiRoutes.createNewPassword,
      data: { ...data },
    })
    if (response.status === 'error') {
      console.log('VERIFY RESPONSE****', response)
      return Promise.reject({
        message: response.message,
        status_code: response.status_code,
        results: response.results,
      })
    }
    if (response.status === 'success') {
      console.log('VERIFY RESPONSE', response)
      VerificationService._saveToken(
        response?.results?.access_credentials.access_token
      )
      return response
    }
  }
  static _saveToken(data: string) {
    localStorage.setItem('nssf_user_token', JSON.stringify(data))
  }
}

export class PinSetUpService {
  static async pin_set_up(data: Record<string, string>) {
    const response = await post({
      url: apiRoutes.pinSetUp,
      data: { ...data },
    })
    if (response.status === 'error') {
      console.log('VERIFY RESPONSE****', response)
      return Promise.reject({
        message: response.message,
        status_code: response.status_code,
        results: response.results,
      })
    }
    if (response.status === 'success') {
      console.log('VERIFY RESPONSE****', response.results)
      return response
    }
  }
  // static _saveToken(data: string) {
  //   localStorage.setItem("nssf_user_token", JSON.stringify(data));
  // }
}

//SIGNUP VIA INVITE
export class SignUpViaInviteService {
  static async suvi(data: Record<string, string>) {
    const response = await post({
      url: apiRoutes.signUpViaInvite,
      data: { ...data },
    })
    if (response.status === 'error') {
      console.log('VERIFY RESPONSE****', response)
      return Promise.reject({
        message: response.message,
        status_code: response.status_code,
        results: response.results,
      })
    }
    if (response.status === 'success') {
      console.log('VERIFY RESPONSE', response)
      VerificationService._saveToken(
        response?.results?.access_credentials.access_token
      )
      return response
    }
  }
  static _saveToken(data: string) {
    localStorage.setItem('nssf_user_token', JSON.stringify(data))
  }
}

export class ChangePasswordService {
  static async change_password(data: Record<string, string>) {
    const response = await put({
      url: apiRoutes.changePassword,
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
