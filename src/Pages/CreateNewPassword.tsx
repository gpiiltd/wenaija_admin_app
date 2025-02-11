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
import Dialog from "../Components/Auth/Dialog";

const CreateNewPassword = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const navigate = useNavigate();
  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password cannot be empty")
      .max(20, "Password must not exceed 20 characters")
      .trim(),
    confirmPassword: Yup.string()
      .required("Password cannot be empty")
      .max(20, "Password must not exceed 20 characters")
      .trim(),
  });

  const handleRequest = () => {
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const handleDialog = () => {
    setTimeout(() => {
      openDialog();
    }, 1000);
  };

  return (
    <div className="w-full">
      <Dialog
        isOpen={isDialogOpen}
        onClose={handleRequest}
        title="Password update successful"
        subText="Great Job! Kindly login in to access the dashboard."
        buttonTitle="Login"
        className="absolute w-full bg-[#34405499]"
        feedBackClassName="w-[373px] lg:w-[573px] flex items-center justify-center"
      >
        <p>This is a reusable dialog component!</p>
      </Dialog>

      <AuthPages>
        <div className="w-full">
          <Typography
            variant={TypographyVariant.SUBTITLE}
            className="text-black font-bold text-2xl flex flex-col items-center mb-2"
          >
            Create new password
          </Typography>
          <Typography
            variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
            className="text-[#5E5959] font-light flex flex-col items-center"
          >
            Kindly create a new password to proceed to dashboard
          </Typography>
          <div className="pt-2">
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
                  <div className="mt-8">
                    <InputField
                      label=""
                      name="Password"
                      type={showPassword ? "password" : "text"}
                      placeholder="Password"
                      onClick={() => setShowPassword(!showPassword)}
                      icon={showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                    />
                  </div>
                  {/* Password Input */}
                  <div className="mt-8">
                    <InputField
                      label=""
                      name="Confirm Password"
                      type={showPassword ? "password" : "text"}
                      placeholder="Confirm Password"
                      onClick={() => setShowPassword(!showPassword)}
                      icon={showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                    />
                  </div>

                  <Button
                    label="Submit"
                    handleLogin={handleDialog}
                    loading={loading}
                    disabled={isValid && dirty}
                  />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </AuthPages>
    </div>
  );
};

export default CreateNewPassword;
