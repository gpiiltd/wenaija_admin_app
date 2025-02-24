import React, { useState } from "react";
import InputField from "../Input/Input";
import Button from "../Button";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { OnChangeCallback } from "react-toastify";
import { useNavigate } from "react-router";
import Toast from "../Toast";
import AccessManagement from "./AccessManagement";


const SettingView = () => {
  const [activeTab, setActiveTab] = useState("accessManagement");
  const [loading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [pin, setPin] = useState<string[]>(new Array(6).fill(""));
  const [pin2, setPin2] = useState<string[]>(new Array(6).fill(""));
  const [isFirstPinSet, setIsFirstPinSet] = useState(false);
  const [toast, setToast] = useState(false);

  const navigate = useNavigate();

  const initialValues = {
    password: "",
    newPassword: "",
    confrimPassword: "",
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password cannot be empty")
      .max(20, "Password must not exceed 20 characters")
      .trim(),
    newPassword: Yup.string()
      .required("New Password cannot be empty")
      .max(20, "New Password must not exceed 20 characters")
      .trim(),
    confrimPassword: Yup.string()
      .required("Confirm Password cannot be empty")
      .max(20, "Confirm Password must not exceed 20 characters")
      .trim(),
  });

  const handleBackspace = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-input-${index - 1}`);
      if (prevInput) (prevInput as HTMLInputElement).focus();
    }
  };

  const handleBackspace2 = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !pin2[index] && index > 0) {
      const prevInput = document.getElementById(`pin2-input-${index - 1}`);
      if (prevInput) (prevInput as HTMLInputElement).focus();
    }
  };
  const handleChangePin = (value: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = value.slice(0, 1);
    setPin(newPin);

    if (value && index < pin.length - 1) {
      const nextInput = document.getElementById(`pin-input-${index + 1}`);
      if (nextInput) (nextInput as HTMLInputElement).focus();
    }
  };

  const handleChangePin2 = (value: string, index: number) => {
    setPin2((prevPin) => {
      const newPin = [...prevPin];
      newPin[index] = value.slice(0, 1);
      return newPin;
    });

    if (value && index < pin2.length - 1) {
      const nextInput = document.getElementById(`pin2-input-${index + 1}`);
      if (nextInput) (nextInput as HTMLInputElement).focus();
    }
  };

  const handleViewSwitch = () => {
    setIsFirstPinSet(true);
    console.log("First PIN:", pin.join(""));

    setTimeout(() => {}, 1000);
  };

  const handleChangeSubmit = () => {
    setTimeout(() => {
      navigate("/signin");
    }, 1000);
  };

  const handleChangeAuthCall = () => {
    setTimeout(() => {
      //   navigate("/signin");
      setToast(true);
      console.log("First PIN:", pin.join(""));
      console.log("Second PIN:", pin2.join(""));
    }, 0);
  };

  return (
    <div className="w-full  bg-black flex flex-col items-center">
      <Toast isVisible={toast} onCancel={() => setToast(false)} />
      <div className="w-full min-h-screen bg-white p-6">
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`px-4 py-2 text-md ${
              activeTab === "accessManagement" ? "font-bold" : "font-normal"
            } ml-4 ${
              activeTab === "accessManagement"
                ? "border-b-2 border-[#007A61] text-[#007A61]"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("accessManagement")}
          >
            Access Management
          </button>
          <button
            className={`px-4 py-2 text-md  ${
              activeTab === "password" ? "font-bold" : "font-normal"
            }  ${
              activeTab === "password"
                ? "border-b-2 border-[#007A61] text-[#007A61]"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("password")}
          >
            Password reset
          </button>
          <button
            className={`px-4 py-2 text-md ${
              activeTab === "authPin" ? "font-bold" : "font-normal"
            } ml-4 ${
              activeTab === "authPin"
                ? "border-b-2 border-[#007A61] text-[#007A61]"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("authPin")}
          >
            Change authentication pin
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-10">
          {activeTab === "accessManagement" && <AccessManagement />}
          {activeTab === "password" && (
            <PasswordReset
              validationSchema={validationSchema}
              showPassword={showPassword}
              showNewPassword={showNewPassword}
              showConfirmPassword={showConfirmPassword}
              setShowPassword={() => setShowPassword(!showPassword)}
              setShowNewPassword={() => setShowNewPassword(!showNewPassword)}
              setShowConfirmPassword={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              initialValues={initialValues}
              loading={loading}
              handleSubmitChange={handleChangeSubmit}
            />
          )}
          {activeTab === "authPin" && (
            <ChangeAuthPin
              pin={pin}
              pin2={pin2}
              isFirstPinSet={isFirstPinSet}
              handleBackspace={handleBackspace}
              handleChange={handleChangePin}
              handleChangeAuthPin={handleViewSwitch}
              handleSubmitAuthPin={handleChangeAuthCall}
              handleChange2={handleChangePin2}
              handleBackspace2={handleBackspace2}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingView;

// Password Reset Form
interface PasswordResetProps {
  initialValues: any;
  handleSubmitChange: OnChangeCallback;
  validationSchema: any;
  showPassword: boolean;
  setShowPassword: Function;
  showNewPassword: boolean;
  setShowNewPassword: Function;
  showConfirmPassword: boolean;
  setShowConfirmPassword: Function;
  loading: boolean;
}

function PasswordReset({
  initialValues,
  handleSubmitChange,
  validationSchema,
  showPassword,
  setShowPassword,
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  loading,
}: PasswordResetProps) {
  return (
    <div className="w-full  min-h-2 flex justify-center">
      <div className="px-6 py-10 mx-auto w-2/4 bg-white shadow-lg rounded-xl">
        <div className="">
          <h1 className="text-2xl font-bold mb-2">Password reset</h1>
          <p className="text-gray-600">Change your password</p>
        </div>
        <Formik
          initialValues={initialValues}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={handleSubmitChange}
          validationSchema={validationSchema}
        >
          {({ isValid, dirty, setFieldValue, setFieldTouched }) => (
            <Form>
              <div className="mt-8">
                <InputField
                  label=""
                  name="Existing password"
                  type={showPassword ? "password" : "text"}
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
                  name="New password"
                  type={showNewPassword ? "password" : "text"}
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
                  name="Confirm new password"
                  type={showConfirmPassword ? "password" : "text"}
                  placeholder="Confirm new password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  icon={showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                />
              </div>
              <div className="mt-3">
                <Button
                  text="Save changes"
                  loading={loading}
                  active={true}
                  bg_color="#007A61"
                  text_color="#FFFFFF"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

// Change Authentication PIN Form

interface ChangeAuthPinProps {
  pin: string[];
  pin2: string[];
  isFirstPinSet: boolean;
  handleChangeAuthPin: any;
  handleSubmitAuthPin: any;
  handleChange: (value: string, index: number) => void;
  handleBackspace: (e: React.KeyboardEvent, index: number) => void;
  handleChange2: (value: string, index: number) => void;
  handleBackspace2: (e: React.KeyboardEvent, index: number) => void;
}

function ChangeAuthPin({
  pin,
  pin2,
  handleChangeAuthPin,
  handleSubmitAuthPin,
  isFirstPinSet,
  handleChange,
  handleBackspace,
  handleChange2,
  handleBackspace2,
}: ChangeAuthPinProps) {
  return (
    <div>
      {isFirstPinSet ? (
        <div className=" bg-white w-[32rem] mx-auto p-10 rounded-md shadow-md flex flex-col items-center justify-center">
          <div className="text-start w-full">
            <h1 className="text-2xl font-bold mb-1">
              Enter new authentication pin
            </h1>
            <p className="text-gray-500 text-md font-light mb-2">
              Kindly enter your new 6 digit security code{" "}
            </p>
          </div>

          <div className="flex space-x-6 mt-6 w-full">
            {pin2.map((_, index) => (
              <input
                key={index}
                id={`pin2-input-${index}`}
                type="text"
                value={pin2[index]}
                onChange={(e) => handleChange2(e.target.value, index)}
                onKeyDown={(e) => handleBackspace2(e, index)}
                className="w-12 h-12 text-center justify-stretch text-xl font-medium border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                maxLength={1}
              />
            ))}
          </div>

          <button
            onClick={handleSubmitAuthPin}
            className="bg-[#007A61] py-3 w-full rounded-lg mt-10 text-white text-sm font-normal"
          >
            Submit Changes
          </button>
        </div>
      ) : (
        <div className=" bg-white w-[32rem] mx-auto p-10 rounded-md shadow-md flex flex-col items-center justify-center">
          <div className="text-start w-full">
            <h1 className="text-2xl font-bold mb-1">
              Enter current authentication Pin
            </h1>
            <p className="text-gray-500 text-md font-light mb-2">
              Kindly enter your 6 digit security code{" "}
            </p>
          </div>

          <div className="flex space-x-6 mt-6 w-full">
            {pin.map((_, index) => (
              <input
                key={index}
                id={`pin-input-${index}`}
                type="text"
                value={pin[index]}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                className="w-12 h-12 text-center justify-stretch text-xl font-medium border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                maxLength={1}
              />
            ))}
          </div>

          <button
            onClick={handleChangeAuthPin}
            className="bg-[#007A61] py-3 w-full rounded-lg mt-10 text-white text-sm font-normal"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
