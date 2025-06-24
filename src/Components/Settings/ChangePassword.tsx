import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import * as Yup from 'yup'
import { resetState } from '../../features/auth/authSlice'
import { triggerChangePassword } from '../../features/auth/authThunks'
import { AppDispatch, RootState } from '../../state'
import Button from '../Button'
import showCustomToast from '../CustomToast'
import InputField from '../Input/Input'

const ChangePassword = () => {
  const dispatch: AppDispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { loading, error, message, statusCode } = useSelector(
    (state: RootState) => state.auth
  )

  const handleChangePassword = (values: any) => {
    const payload = {
      old_password: values.password,
      new_password: values.confirmNewPassword,
    }

    dispatch(triggerChangePassword(payload))
  }

  useEffect(() => {
    if (statusCode === 200) {
      showCustomToast('Success', message)
      setTimeout(() => {
        // dispatch(resetState())
        // window.location.reload()
      }, 3000)
    }

    if (statusCode !== null && error) {
      toast.error(message)
      dispatch(resetState())
    }
  }, [message, statusCode, error, dispatch])

  const initialValues = {
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  }

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password cannot be empty')
      .max(20, 'Password must not exceed 20 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Must contain at least 8 characters with 1 Uppercase, Lowercase, Number and Special Character'
      ),
    newPassword: Yup.string()
      .required('Password cannot be empty')
      .max(20, 'Password must not exceed 20 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Must contain at least 8 characters with 1 Uppercase, Lowercase, Number and Special Character'
      ),
    confirmNewPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      .trim(),
  })

  return (
    <div className="w-full  min-h-2 flex justify-center">
      <ToastContainer />
      <div className="px-6 py-10 mx-auto w-3/5 bg-white shadow-lg rounded-xl">
        <div className="">
          <h1 className="text-2xl font-bold mb-2">Password reset</h1>
          <p className="text-gray-600">Change your password</p>
        </div>
        <Formik
          initialValues={initialValues}
          validateOnChange={true}
          validateOnBlur={true}
          validationSchema={validationSchema}
          onSubmit={handleChangePassword}
        >
          {({ isValid, dirty, setFieldValue, setFieldTouched }) => (
            <Form>
              <div className="mt-8">
                <InputField
                  label=""
                  name="password"
                  type={showPassword ? 'password' : 'text'}
                  placeholder="Existing password"
                  onClick={() => setShowPassword(!showPassword)}
                  icon={showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                />
              </div>
              <div className="mt-8">
                <InputField
                  label=""
                  name="newPassword"
                  type={showNewPassword ? 'password' : 'text'}
                  placeholder="New password"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  icon={showNewPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                />
              </div>

              <div className="mt-8">
                <InputField
                  label=""
                  name="confirmNewPassword"
                  type={showConfirmPassword ? 'password' : 'text'}
                  placeholder="Confirm new password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  icon={showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                />
              </div>
              <div className="mt-8">
                <Button
                  text="Save changes"
                  loading={loading}
                  active={isValid && dirty}
                  bg_color="#007A61"
                  text_color="#FFFFFF"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default ChangePassword
