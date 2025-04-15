import React, { useEffect, useState } from "react";
import { TypographyVariant } from "../Components/types";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AuthPages from "../Components/AuthPages";
import Typography from "../Components/Typography";
import InputField from "../Components/Input/Input";
import Button from "../Components/Button";
import { resetState } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { AppDispatch, RootState } from "../state";
import showCustomToast from "../Components/CustomToast";
import { triggerSignin } from "../features/auth/authThunks";

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(true);
  const { error, userData, message, loading, statusCode } = useSelector(
    (state: RootState) => state.auth,
  );
  useSelector((state: RootState) => state.rbac);
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
    };
    dispatch(triggerSignin(payload));
  };

  useEffect(() => {
    if (!error && statusCode === 200) {
      showCustomToast("Success", message);
      setTimeout(() => {
        navigate("/auth-pin");
      }, 2000);
    } else if (error && message) {
      toast.error(`${message}`);
    }
    dispatch(resetState());
  }, [error, userData, message, loading, navigate, dispatch, statusCode]);

  useEffect(() => {
    if (window.location.hostname !== "localhost") {
      window.location.href = `http://localhost:3000${window.location.pathname}${window.location.search}`;
    }
  }, []);

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
                  <div className="mt-6">
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
                  <div onClick={() => navigate("/forgotPassword")}>
                    <Typography
                      variant={TypographyVariant.BODY_SMALL_MEDIUM}
                      className="text-[#ED7D31] font-light text-sm pt-1  flex flex-col items-end cursor-pointer"
                    >
                      Forgot password?
                    </Typography>
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

            <Typography
              variant={TypographyVariant.SMALL}
              className="text-gray-600  pt-3 text-center"
            >
              Don’t have an account?{" "}
              <span
                className="text-orange ml-1 font-bold cursor-pointer"
                onClick={() => navigate("/createpassword")}
              >
                Sign up
              </span>
            </Typography>
          </div>
        </div>
      </AuthPages>
    </>
  );
};

export default Login;
