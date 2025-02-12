import React, { useEffect, useState } from "react";
import { TypographyVariant } from "../Components/types";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AuthPages from "../Components/AuthPages";
import Typography from "../Components/Typography";
import InputField from "../Components/Input/Input";
import Button from "../Components/Button";
import { resetState, triggerSignin } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { AppDispatch, RootState } from "../state";

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(true);
  const { error, userData, message, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format")
      .trim(),
    password: Yup.string()
      .required("Password cannot be empty")
      .max(20, "Password must not exceed 20 characters")
      .trim(),
  });

  const handleLogin = (values: any) => {
    const payload = {
      email: values.email.trim().toLowerCase(),
      password: values.password.trim(),
      user_type: "superadmin",
    };
    dispatch(triggerSignin(payload));
  };

  const handleForgotPassword = () => {
    setTimeout(() => {
      navigate("/forgotPassword");
    }, 2000);
  };

  useEffect(() => {
    if (!error && Object.keys(userData).length > 0) {
      toast.success(`Login successfull`);
      setTimeout(() => {
        navigate("app/dashboard");
      }, 2000);
    } else if (error && message) {
      toast.error(`${message}`);
    }
    dispatch(resetState());
  }, [error, userData, message, loading, navigate, dispatch]);

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
                  <div className="mt-8">
                    <InputField
                      label=""
                      name="password"
                      type={showPassword ? "password" : "text"}
                      placeholder="Enter your password"
                      onClick={() => setShowPassword(!showPassword)}
                      icon={showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                    />
                  </div>
                  <div>                  
                  </div>
                  <Button
                  text="Log in"
                  active={isValid && dirty}
                  bg_color="#007A61"
                  text_color="white"
                  loading={loading}
                />
                </Form>
              )}
            </Formik>
            <div className="flex mb-6 gap-1 pt-4 items-center justify-center">
                </div>
                <a onClick={handleForgotPassword}>
                  <Typography
                    variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                    className="  text-[#ED7D31] font-light text-sm  flex flex-col items-end mt-3"
                  >
                    Forgot password?
                  </Typography>
                </a>
            
          
          <div className="flex mb-6 gap-1 pt-4 items-center justify-center">
            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-[#5E5959] font-light"
            >
              Don't have an account?
            </Typography>
            <Link to="/signup" />
              <Typography
                variant={TypographyVariant.NORMAL}
                className="text-[#5E5959] font-light"
              >
                Don't have an account?
              </Typography>
              <Link to="/signup">
                <Typography
                  variant={TypographyVariant.NORMAL}
                  className="text-orange font-extrabold cursor-pointer"
                >
                  Sign Up
                </Typography>
              </Link>
            </div>
          </div>
        </div>
      </AuthPages>
    </>
  );
};

export default Login;
