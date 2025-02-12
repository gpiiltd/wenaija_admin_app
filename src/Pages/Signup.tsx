import React, { useState } from "react";
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

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    password: "",
    confrimPassword: "",
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

  const handleAuthPin = () => {
    setLoading(!loading);
    setTimeout(() => {
      setLoading(false);
      navigate("/auth-pin");
    }, 3000);
  };

  const handleLogin = () => {
    setTimeout(() => {
      navigate("/signin");
    }, 1000);
  };

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
        <div className="pt-5">
          <Formik
            initialValues={initialValues}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={(values) => {
              console.log("Form values:", values);
            }}
            validationSchema={validationSchema}
          >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => (
              <Form>
                <div className="mt-3">
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

                <div className="mt-5">
                  <InputField
                    type={showConfirmPassword ? "password" : "text"}
                    focusStyle="green"
                    label=""
                    name="confirmPassword"
                    helperText="Passwords matched"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    icon={
                      showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />
                    }
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    placeholder="Confirm password"
                  />
                </div>

                <Button
                  label="Sign Up"
                  handleLogin={handleAuthPin}
                  loading={loading}
                  disabled={isValid && dirty}
                />
              </Form>
            )}
          </Formik>
          <div className="flex mb-6 gap-1 pt-4 items-center justify-center">
            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-[#5E5959] font-light"
            >
              Don't have an account?
            </Typography>
            <Link to="/">
              <Typography
                variant={TypographyVariant.NORMAL}
                className="text-orange font-extrabold cursor-pointer"
              >
                Login
              </Typography>
            </Link>
          </div>
        </div>
      </div>
    </AuthPages>
  );
};

export default Login;
