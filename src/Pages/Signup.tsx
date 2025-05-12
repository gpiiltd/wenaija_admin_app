import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import AuthPages from '../Components/AuthPages'
import Button from '../Components/Button'
import showCustomToast from '../Components/CustomToast'
import InputField from '../Components/Input/Input'
import { TypographyVariant } from '../Components/types'
import Typography from '../Components/Typography'
import { resetState } from '../features/auth/authSlice'
import { triggerSignUpViaInvite } from '../features/auth/authThunks'
import { AppDispatch, RootState } from '../state'

const Login = () => {
  const dispatch: AppDispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(true)
  const [showConfirmPassword, setShowConfirmPassword] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  const [token, setToken] = useState('')
  const [email, setEmail] = useState('')
  const { error, message, loading, statusCode } = useSelector(
    (state: RootState) => state.auth
  )

  const initialValues = {
    password: '',
    confirmPassword: '',
  }

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password cannot be empty')
      .max(20, 'Password must not exceed 20 characters')
      .trim(),
    confirmPassword: Yup.string()
      .required('Confirm password cannot be empty')
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .trim(),
  })
  console.log('TOKEN', token)
  console.log('EMAIL', email)

  const handleSignUpViaInvite = (values: any) => {
    const payload = {
      invitation_token: token,
      email: email,
      password: values.password,
    }
    console.log(payload)
    dispatch(triggerSignUpViaInvite(payload))
  }

  useEffect(() => {
    if (!error && statusCode === 200) {
      showCustomToast('Success', message)
      setTimeout(() => {
        navigate('/auth-pin-set-up')
      }, 2000)
    } else if (error && message) {
      toast.error(message)
    }
    dispatch(resetState())
  }, [error, statusCode, message, navigate, dispatch])

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const urlToken = searchParams.get('token')
    const urlEmail = searchParams.get('email')
    console.log('url token', urlToken)
    console.log('url token', urlEmail)
    if (urlToken && urlEmail) {
      sessionStorage.setItem('verificationToken', urlToken)
      sessionStorage.setItem('verificationEmail', urlEmail)
      navigate('/email-verification', { replace: true })
    } else {
      const storedToken = sessionStorage.getItem('verificationToken')
      const storedEmail = sessionStorage.getItem('verificationEmail')

      if (!storedToken || !storedEmail) {
        navigate('/error', { replace: true })
      } else {
        setToken(storedToken)
        setEmail(storedEmail)
      }
    }
  }, [location, navigate])

  return (
    <AuthPages>
      <div className="w-full">
        <Typography
          variant={TypographyVariant.TITLE}
          className="text-black font-bold text-2xl flex flex-col items-center mb-2"
        >
          Create password
        </Typography>
        <Typography
          variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
          className="text-[#5E5959] font-light flex flex-col items-center"
        >
          Kindly enter your password to complete sign up
        </Typography>
        <div className="pt-5 ">
          <Formik
            initialValues={initialValues}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={handleSignUpViaInvite}
            validationSchema={validationSchema}
          >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => (
              <Form>
                <div className="mt-3">
                  <InputField
                    label=""
                    name="password"
                    type={showPassword ? 'password' : 'text'}
                    placeholder="Password"
                    onClick={() => setShowPassword(!showPassword)}
                    icon={showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                  />
                </div>

                <div className="mt-5 mb-5">
                  <InputField
                    label=""
                    name="confirmPassword"
                    type={showConfirmPassword ? 'password' : 'text'}
                    placeholder="Confirm Password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    icon={
                      showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />
                    }
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                  />
                </div>

                <Button
                  text="Sign Up"
                  active={isValid && dirty}
                  bg_color="#007A61"
                  text_color="white"
                  loading={loading}
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </AuthPages>
  )
}

export default Login
