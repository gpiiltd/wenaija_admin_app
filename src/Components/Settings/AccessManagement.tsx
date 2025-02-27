import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import { TypographyVariant } from "../types";
import Typography from "../Typography";
import Button from "../Button";
import CustomModal from "../Modal";
import { adminAccounts } from "./SettingsData";
import { Formik } from "formik";
import InputField from "../Input/Input";
import * as Yup from "yup";
import SelectOption from "../Input/SelectOptions";
import { adminOptions } from "./SettingsData";
import showCustomToast from "../CustomToast";

const AccessManagement: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("");

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format")
      .trim(),
  });

  const addNewAdmin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowModal(false);
    }, 2000);
    setTimeout(() => {
      showCustomToast(
        "Admin account successfully created",
        `enem@gmail.com has been notified to complete account setup`
        // `${initialValues.email} has been notified to complete account setup`
      );
    }, 2000);
  };

  return (
    <div className="">
      <div className="flex justify-end gap-4">
        <button
          onClick={() => navigate("/app/settings/roles-and-permissions")}
          className="flex items-center gap-2 px-6 py-4  rounded-lg hover:bg-gray-50 text-[#007A61]"
        >
          <Icon type="lock" className="w-6 h-6" />
          Manage Roles And Permissions
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-4 bg-[#007A61] text-white rounded-lg"
        >
          <Icon type="plus" className="w-6 h-6" />
          Add New Admin
        </button>
      </div>
      <Typography
        variant={TypographyVariant.TITLE}
        className=" font-bold text-xl"
      >
        View Admin Accounts
      </Typography>

      <div className="overflow-x-auto rounded-xl border-2 border-b-0 mt-8">
        <table className="min-w-full  rounded-t-xl">
          <thead>
            <tr className="text-l_gray  text-left  border-b-2 rounded-t-xl bg-[#F9FAFB] ">
              <th className="px-4 py-4 ">NO</th>
              <th className="px-4 py-4  ">Email</th>
              <th className="px-4 py-4  ">User role</th>
              <th className="px-4 py-4  ">Permission</th>
              <th className="px-4 py-4  ">Status</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {adminAccounts.map((admin, index) => (
              <tr key={admin.id} className="border-b-2 text-dark_gray">
                <td className=" px-4 py-4 items-center justify-center ">
                  {index + 1}
                </td>
                <td className=" px-4 py-4 text-sm "> {admin.email}</td>
                <td className=" px-4 py-4 text-sm w-48"> {admin.role}</td>
                <td className=" px-4 py-4 ">{admin.permission}</td>
                <td className={`px-4 py-4`}>
                  {" "}
                  <span
                    className={` py-2 px-4 rounded-2xl ${
                      admin.status === "Active"
                        ? "text-[#007A61] bg-[#f1fffc]"
                        : "text-[#B42319] bg-[#FDF3F3]"
                    }`}
                  >
                    {admin.status}
                  </span>
                </td>
                <td className=" px-4 py-4 ">
                  <button
                    onClick={() => navigate("/app/settings/view-admin")}
                    className="flex items-center  gap-2 bg-white text-gray-600 py-4 px-6 border rounded-xl"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CustomModal
        width="45%"
        height="65%"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <div className="flex flex-col  px-12 ">
          <Typography
            variant={TypographyVariant.TITLE}
            className="text-dark_gray font-semibold "
          >
            Add Admin
          </Typography>
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
                <div className="mt-5 mb-12">
                  <InputField
                    type="text"
                    focusStyle="green"
                    label="Email Address"
                    name="email"
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    placeholder="Enter email address"
                  />
                </div>
                <SelectOption
                  label="Select Admin type"
                  options={adminOptions}
                  value={selectedValue}
                  onChange={setSelectedValue}
                  className="pb-3"
                />

                <div className="flex items-center justify-center gap-4 mx-24 mt-12">
                  <Button
                    text="Cancel"
                    bg_color="white"
                    text_color="black"
                    border_color="border-green-500"
                    active={true}
                    loading={false}
                    onClick={() => setShowModal(false)}
                  />
                  <Button
                    text="Save"
                    bg_color="#007A61"
                    text_color="white"
                    active={isValid && dirty}
                    border_color="border-green-500"
                    loading={loading}
                    onClick={addNewAdmin}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </CustomModal>
    </div>
  );
};

export default AccessManagement;
