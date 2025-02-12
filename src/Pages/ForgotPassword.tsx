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
import Icon from "../Assets/svgImages/Svg_icons_and_images";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // Capture email input

  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format")
      .trim(),
  });

  const handleResetPassword = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/auth-pin", { state: { email: "jken04680@gmail.com" } }); // Pass email correctly
    }, 3000);
  };

  return (
    <AuthPages>
      <div className="w-full">
        <Icon type="forgotPassword" className="mb-8 mx-auto" />
        <Typography
          variant={TypographyVariant.NORMAL}
          className="text-black font-bold text-2xl flex flex-col items-center mb-2"
        >
          Forgot password?
        </Typography>
        <Typography
          variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
          className="text-[#5E5959] font-light flex flex-col items-center"
        >
          Enter your email to reset your password
        </Typography>
        <div className="pt-8">
          <Formik
            initialValues={initialValues}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={(values) => {
              console.log("Form values:", values);
              setEmail(values.email);
            }}
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

   <Button
                  text="Reset password"
                  onClick={handleResetPassword}
                  loading={loading}
                  active={isValid && dirty}
                />
             
              </Form>
            )}
          </Formik>
          <div className="flex mb-6 gap-1 pt-4 items-center justify-center">
            <Link to="/login">
              <Typography
                variant={TypographyVariant.NORMAL}
                className="text-orange font-normal cursor-pointer"
              >
                Go back to login
              </Typography>
            </Link>
          </div>
        </div>
      </div>
    </AuthPages>
  );
};

export default ForgotPassword;
