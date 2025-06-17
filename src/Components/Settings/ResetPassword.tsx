import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import * as Yup from 'yup'
import Button from '../Button'
import InputField from '../Input/Input'

const ResetPassword = () => {
  const [loading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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

  const handleResetPassword = (values: any) => {
    console.log('values****', values)
    // setLoading(!loading)
    const payload = {
      old_password: values.password,
      new_password: values.newPassword,
    }

    // dispatch(triggerChangePassword(payload));
    // setTimeout(() => {
    //   setLoading(false);
    // }, 3000);
  }
  return (
    <div className="w-full  min-h-2 flex justify-center">
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
          onSubmit={handleResetPassword}
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

export default ResetPassword
