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
import Dialog from "../Components/Auth/Dialog";
import { AppDispatch, RootState } from "../state";
import { useDispatch, useSelector } from "react-redux";
import showCustomToast from "../Components/CustomToast";
import { toast, ToastContainer } from "react-toastify";
import { resetState } from "../features/auth/authSlice";
import { triggerCreateNewPassword } from "../features/auth/authThunks";

const CreateNewPassword = () => {
  const dispatch: AppDispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirnPassword] = useState(true);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const { error, message, loading, statusCode } = useSelector(
    (state: RootState) => state.auth
  );
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
      .required("Confirm password cannot be empty")
      .oneOf([Yup.ref("password")], "Passwords must match") 
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

  const handleCreateNewPassword = (values: any) => {
    const payload = {
      new_password: values.password,
      confirm_new_password: values.confirmPassword,
    };
    console.log(payload);
    dispatch(triggerCreateNewPassword(payload));
  };

  useEffect(() => {
    if (!error && statusCode === 200) {
      showCustomToast("Success", message);
      setTimeout(() => {
        navigate("/auth-pin-set-up");
      }, 2000);
    } else if (error && message) {
      toast.error(message);
    }
    dispatch(resetState());
  }, [error, statusCode, message, navigate, dispatch]);

  return (
    <div className="w-full">
                  <ToastContainer />
      
      <Dialog
        isOpen={isDialogOpen}
        onClose={handleRequest}
        title="Password update successful"
        subText="Great Job! Kindly login in to access the dashboard."
        buttonTitle="Login"
        className="absolute w-full bg-[#34405499]"
        feedBackClassName="w-[373px] lg:w-[573px] flex items-center justify-center"
      >
        <Typography variant={TypographyVariant.NORMAL}>
          This is a reusable dialog component!
        </Typography>
      </Dialog>

      <AuthPages>
        <div className="w-full">
          <Typography
            variant={TypographyVariant.TITLE}
            className="text-black font-bold text-2xl flex flex-col items-center mb-2"
          >
            Create new password
          </Typography>
          <Typography
            variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
            className="text-[#5E5959] font-light flex flex-col text-center"
          >
            Kindly create a new password to proceed to dashboard
          </Typography>
          <div className="pt-2">
            <Formik
              initialValues={initialValues}
              validateOnChange={true}
              validateOnBlur={true}
              onSubmit={handleCreateNewPassword}
              validationSchema={validationSchema}
            >
              {({ isValid, dirty, setFieldValue, setFieldTouched }) => (
                <Form>
                  <div className="mt-8">
                    <InputField
                      label=""
                      name="password"
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
                      name="confirmPassword"
                      type={showConfirmPassword ? "password" : "text"}
                      placeholder="Confirm Password"
                      onClick={() => setShowConfirnPassword(!showConfirmPassword)}
                      icon={showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                    />
                  </div>
                  <div className="mt-5">
                    <Button
                      text="Submit"
                      loading={loading}
                      active={isValid && dirty}
                      bg_color="#007A61"
                      text_color="white"
                    />
                  </div>
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
