import React, { useEffect} from "react";
import { TypographyVariant } from "../Components/types";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthPages from "../Components/AuthPages";
import Typography from "../Components/Typography";
import InputField from "../Components/Input/Input";
import Button from "../Components/Button";
import Icon from "../Assets/svgImages/Svg_icons_and_images";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state";
import { triggerPasswordReset } from "../features/auth/authThunks";
import showCustomToast from "../Components/CustomToast";
import { toast } from "react-toastify";
import { resetState } from "../features/auth/authSlice";

const ForgotPassword = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { error, userData, message, loading,statusCode } = useSelector(
    (state: RootState) => state.auth
  );

  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format")
      .trim(),
  });

  const handlePasswordReset = (values: any) => {
    const payload = {
      email: values.email.trim().toLowerCase(),
    };
    dispatch(triggerPasswordReset(payload));
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
  }, [error, userData, message, loading, navigate, dispatch]);

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
            validationSchema={validationSchema}
            onSubmit={handlePasswordReset}
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
                <div className='mt-3'>
                <Button
                  text="Reset password"
                  loading={loading}
                  active={isValid && dirty}
                  bg_color="#007A61"
                  text_color="white"
                />
                </div>
               
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
