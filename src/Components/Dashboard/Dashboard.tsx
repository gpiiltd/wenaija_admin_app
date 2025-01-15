import React from "react";
import InputField from "../Input/Input";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const Dashboard = () => {
  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Full name is required")
      .min(2, "Full name must be at least 2 characters long"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format")
      .trim(),
    password: Yup.string()
      .required("Password cannot be empty")
      .max(20, "Password must not exceed 20 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must contain at least 8 characters with 1 Uppercase, Lowercase, Number and Special Character"
      ),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Passwords must match")
      .trim(),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validateOnChange={true}
        validateOnBlur={true}
        validationSchema={validationSchema}
        onSubmit={() => console.log("hello")}
      >
        {({ setFieldValue, setFieldTouched }) => (
          <Form className="flex flex-col gap-5">
            <InputField
              placeholder="Enter your full name"
              type="text"
              focusStyle="green"
              label="Full Name"
              name="fullName"
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              helperText="success"
            />
            <InputField
              placeholder="Enter your email address"
              type="text"
              focusStyle="green"
              label="Email address"
              name="email"
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Dashboard;
