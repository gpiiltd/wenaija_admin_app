import { createSlice } from '@reduxjs/toolkit'
import {
  triggerAdminInvite,
  triggerAuth,
  triggerChangeAuthPin,
  triggerChangePassword,
  triggerCreateNewPassword,
  triggerEmailVerification,
  triggerPasswordReset,
  triggerPinSetUp,
  triggerSignin,
  triggerSignUpViaInvite,
} from './authThunks'

interface IinitialState {
  error: boolean
  loading: boolean
  userData: Record<string, any>
  message: string
  statusCode?: number | null
}

const initialState: IinitialState = {
  error: false,
  loading: false,
  userData: {},
  message: '',
  statusCode: null,
}

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState: state => {
      state.error = initialState.error
      state.message = initialState.message
      state.statusCode = initialState.statusCode
    },
    setEmail: state => {
      const email = state.userData?.email
      if (email) {
        localStorage.setItem('userEmail', email)
      }
    },
  },
  extraReducers: builder => {
    // SIGN IN
    builder.addCase(triggerSignin.pending, state => {
      state.loading = true
      state.error = false
      state.userData = {}
      state.message = ''
    })
    builder.addCase(triggerSignin.fulfilled, (state, action) => {
      state.loading = false
      state.userData = action.payload as any
      state.error = false
      state.message = action.payload?.message as unknown as string
      state.statusCode = action.payload?.status_code as unknown as number
    })
    builder.addCase(triggerSignin.rejected, (state, action) => {
      state.loading = false
      state.error = true
      state.userData = {}
      state.message = action.payload as unknown as string
    })

    //AUTH
    builder.addCase(triggerAuth.pending, state => {
      state.loading = true
      state.error = false
      state.userData = {}
      state.message = ''
    })
    builder.addCase(triggerAuth.fulfilled, (state, action) => {
      state.loading = false
      state.userData = action.payload as any
      state.error = false
      state.message = action.payload?.message as unknown as string
      state.statusCode = action.payload?.status_code as unknown as number
    })
    builder.addCase(triggerAuth.rejected, (state, action) => {
      state.loading = false
      state.error = true
      state.userData = {}
      state.message = action.payload as unknown as string
    })

    //ADMIN INVITE
    builder.addCase(triggerAdminInvite.pending, state => {
      state.loading = true
      state.error = false
      state.userData = {}
      state.message = ''
    })
    builder.addCase(triggerAdminInvite.fulfilled, (state, action) => {
      state.loading = false
      state.userData = action.payload?.results!
      state.error = false
      state.message = action.payload?.message as unknown as string
      state.statusCode = action.payload?.status_code as unknown as number
    })
    builder.addCase(triggerAdminInvite.rejected, (state, action) => {
      state.loading = false
      state.error = true
      state.userData = {}
      state.message = action.payload as unknown as string
    })

    //PASSWORD RESET
    builder.addCase(triggerPasswordReset.pending, state => {
      state.loading = true
      state.error = false
      state.userData = {}
      state.message = ''
    })
    builder.addCase(triggerPasswordReset.fulfilled, (state, action) => {
      state.loading = false
      state.userData = action.payload?.results!
      state.error = false
      state.message = action.payload?.message as unknown as string
      state.statusCode = action.payload?.status_code as unknown as number
    })
    builder.addCase(triggerPasswordReset.rejected, (state, action) => {
      state.loading = false
      state.error = true
      state.userData = {}
      state.message = action.payload as unknown as string
      state.statusCode = action.payload as unknown as number
    })

    //EMAIL VERIFICATION
    builder.addCase(triggerEmailVerification.pending, state => {
      state.loading = true
      state.error = false
      state.userData = {}
      state.message = ''
    })
    builder.addCase(triggerEmailVerification.fulfilled, (state, action) => {
      state.loading = false
      state.userData = action.payload?.results!
      state.error = false
      state.message = action.payload?.message as unknown as string
      state.statusCode = action.payload?.status_code as unknown as number
    })
    builder.addCase(triggerEmailVerification.rejected, (state, action) => {
      state.loading = false
      state.error = true
      state.message = action.payload?.message as unknown as string
      state.statusCode = action.payload?.status_code ?? null
    })

    //CREATE NEW PASSWORD
    builder.addCase(triggerCreateNewPassword.pending, state => {
      state.loading = true
      state.error = false
      state.userData = {}
      state.message = ''
    })
    builder.addCase(triggerCreateNewPassword.fulfilled, (state, action) => {
      state.loading = false
      state.userData = action.payload?.results!
      state.error = false
      state.message = action.payload?.message as unknown as string
      state.statusCode = action.payload?.status_code as unknown as number
    })
    builder.addCase(triggerCreateNewPassword.rejected, (state, action) => {
      state.loading = false
      state.error = true
      state.message = action.payload?.message as unknown as string
      state.statusCode = action.payload?.status_code ?? null
    })
    //PIN SET UP
    builder.addCase(triggerPinSetUp.pending, state => {
      state.loading = true
      state.error = false
      state.userData = {}
      state.message = ''
    })
    builder.addCase(triggerPinSetUp.fulfilled, (state, action) => {
      state.loading = false
      state.userData = action.payload?.results!
      state.error = false
      state.message = action.payload?.message as unknown as string
      state.statusCode = action.payload?.status_code as unknown as number
    })
    builder.addCase(triggerPinSetUp.rejected, (state, action) => {
      state.loading = false
      state.error = true
      state.message = action.payload?.message as unknown as string
      state.statusCode = action.payload?.status_code ?? null
    })

    //SIGN UP VIA INVITE
    builder.addCase(triggerSignUpViaInvite.pending, state => {
      state.loading = true
      state.error = false
      state.userData = {}
      state.message = ''
    })
    builder.addCase(triggerSignUpViaInvite.fulfilled, (state, action) => {
      state.loading = false
      state.userData = action.payload?.results!
      state.error = false
      state.message = action.payload?.message as unknown as string
      state.statusCode = action.payload?.status_code as unknown as number
    })
    builder.addCase(triggerSignUpViaInvite.rejected, (state, action) => {
      state.loading = false
      state.error = true
      state.message = action.payload?.message as unknown as string
      state.statusCode = action.payload?.status_code ?? null
    })

    //CHANGE PASSWORD
    builder.addCase(triggerChangePassword.pending, state => {
      state.loading = true
      state.error = false
      state.userData = {}
      state.message = ''
    })
    builder.addCase(triggerChangePassword.fulfilled, (state, action) => {
      state.loading = false
      state.userData = action.payload?.results!
      state.error = false
      state.message = action.payload?.message as unknown as string
      state.statusCode = action.payload?.status_code as unknown as number
    })
    builder.addCase(triggerChangePassword.rejected, (state, action) => {
      state.loading = false
      state.error = true
      state.message = action.payload?.message as unknown as string
      state.statusCode = action.payload?.status_code ?? null
    })

    //CHANGE AUTH PIN
    builder.addCase(triggerChangeAuthPin.pending, state => {
      state.loading = true
      state.error = false
      state.userData = {}
      state.message = ''
    })
    builder.addCase(triggerChangeAuthPin.fulfilled, (state, action) => {
      state.loading = false
      state.userData = action.payload?.results!
      state.error = false
      state.message = action.payload?.message as unknown as string
      state.statusCode = action.payload?.status_code as unknown as number
    })
    builder.addCase(triggerChangeAuthPin.rejected, (state, action) => {
      state.loading = false
      state.error = true
      state.message = action.payload?.message as unknown as string
      state.statusCode = action.payload?.status_code ?? null
    })
  },
})

export const { resetState, setEmail } = userSlice.actions

export default userSlice.reducer
