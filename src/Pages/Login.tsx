import { Form, Formik, FormikProps } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import * as Yup from 'yup'
import AuthPages from '../Components/AuthPages'
import Button from '../Components/Button'
import showCustomToast from '../Components/CustomToast'
import InputField from '../Components/Input/Input'
import { TypographyVariant } from '../Components/types'
import Typography from '../Components/Typography'
import { resetState } from '../features/auth/authSlice'
import { triggerSignin } from '../features/auth/authThunks'
import { AppDispatch, RootState } from '../state'

const Login = () => {
  const dispatch: AppDispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(true)
  const { error, userData, message, loading, statusCode } = useSelector(
    (state: RootState) => state.auth
  )
  const navigate = useNavigate()
  const formikRef = useRef<FormikProps<any>>(null)

  const initialValues = {
    email: '',
    password: '',
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format')
      .trim(),
    password: Yup.string()
      .required('Password cannot be empty')
      .max(20, 'Password must not exceed 20 characters')
      .trim(),
  })

  const handleLogin = (values: any) => {
    const payload = {
      email: values.email.trim().toLowerCase(),
      password: values.password.trim(),
    }
    dispatch(triggerSignin(payload))
  }

  useEffect(() => {
    if (!error && statusCode === 200) {
      showCustomToast('Success', message)
      setTimeout(() => {
        navigate('/auth-pin')
      }, 2000)
    } else if (error && message) {
      toast.error(`${message}`)
      formikRef.current?.resetForm()
    }
    dispatch(resetState())
  }, [error, userData, message, loading, navigate, dispatch, statusCode])

  return (
    <>
      <ToastContainer />
      <AuthPages>
        <div className="w-full">
          <Typography
            variant={TypographyVariant.TITLE}
            className="text-black font-bold text-2xl flex flex-col items-center mb-2"
          >
            Login
          </Typography>
          <Typography
            variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
            className="text-[#5E5959] font-light flex flex-col items-center"
          >
            Kindly fill in your email address
          </Typography>
          <div className="pt-8">
            <Formik
              initialValues={initialValues}
              validateOnChange={true}
              validateOnBlur={true}
              onSubmit={handleLogin}
              validationSchema={validationSchema}
              innerRef={formikRef} // ✅ make sure this is correct
            >
              {({ isValid, dirty, setFieldValue, setFieldTouched }) => (
                <Form>
                  <InputField
                    label=""
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                  />
                  {/* Password Input */}
                  <div className="mt-6">
                    <InputField
                      label=""
                      name="password"
                      type={showPassword ? 'password' : 'text'}
                      placeholder="Enter your password"
                      onClick={() => setShowPassword(!showPassword)}
                      icon={showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                    />
                  </div>
                  <div className="flex justify-end items-center">
                    <div onClick={() => navigate('/forgotPassword')}>
                      <Typography
                        variant={TypographyVariant.BODY_SMALL_MEDIUM}
                        className="text-[#ED7D31] font-light text-sm pt-1  flex flex-col items-end cursor-pointer"
                      >
                        Forgot password?
                      </Typography>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Button
                      text="Log in"
                      active={isValid && dirty}
                      bg_color="#007A61"
                      text_color="white"
                      loading={loading}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </AuthPages>
    </>
  )
}

export default Login
