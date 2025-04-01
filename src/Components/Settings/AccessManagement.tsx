import React, { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import { TypographyVariant } from "../types";
import Typography from "../Typography";
import Button from "../Button";
import CustomModal from "../Modal";
import { Formik } from "formik";
import InputField from "../Input/Input";
import * as Yup from "yup";
import SelectOption from "../Input/SelectOptions";
import { adminOptions } from "./SettingsData";
import showCustomToast from "../CustomToast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state";
import { toast, ToastContainer } from "react-toastify";
import { resetState } from "../../features/auth/authSlice";
import { triggerAdminInvite } from "../../features/auth/authThunks";
import { triggerListAllAccounts } from "../../features/rbac/rbacThunks";

type RbacUserData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    id: string;
    email: string;
    active: boolean;
    created_at: string;
    role: string;
    
  }>;
};

const AccessManagement: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("");
 
  const [data, setData] = useState<any>({
    email: [],
    role: [],
    active: [],
    permissionCount: 0,
  });
  const {
    error: authError,
    userData: authUserData,
    message: authMessage,
    loading: authLoading,
    statusCode: authStatusCode,
  } = useSelector((state: RootState) => state.auth);
  const {
    error: rbacError,
    userData: rbacUserData,
    message: rbacMessage,
    statusCode: rbacStatusCode,
  } = useSelector((state: RootState) => state.rbac);

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format")
      .trim(),
  });

  const handleAdminInvite = (values: any) => {
    console.log(`Invite ${values.email}`);
    const payload = {
      email: values.email.trim().toLowerCase(),
    };
    dispatch(triggerAdminInvite(payload));
  };

  useEffect(() => {
    if (!authError && authStatusCode === 200) {
      showCustomToast("Success", `${authMessage}`);
      setTimeout(() => {
        setShowModal(false);
      }, 1000);
    } else if (authError && authMessage) {
      toast.error(`${authMessage}`);
      setTimeout(() => {
        setShowModal(false);
      }, 1000);
    }
    dispatch(resetState());
  }, [authError, authUserData, authMessage, dispatch, authStatusCode]);

  useEffect(() => {
    dispatch(triggerListAllAccounts({}));
  }, [dispatch]);

  useEffect(() => {
    if (rbacStatusCode === 200 && rbacUserData && !rbacError) {
      console.log("Successfully fetched accounts:", rbacUserData);
   
      const userData = (rbacUserData as RbacUserData).results;
      setData({
        email: userData?.map((user: any) => user.email) || [],
        role: userData?.map((user: any) => user.role) || [],
        active: userData?.map((user: any) => user.active) || [],
        permissionCount:
          userData?.map((user: any) => user.permissions_count) || [],
      });
      console.log("Data:", data);
    }

    if (rbacError && rbacMessage) {
      console.error("Error fetching accounts:", rbacMessage);
      toast.error(rbacMessage);
      setTimeout(() => {
        setShowModal(false);
      }, 1000);
    }
    dispatch(resetState());
  }, [ dispatch, rbacError, rbacMessage, rbacStatusCode]);

  return (
    <div className="">
      <ToastContainer />

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
        <table className="min-w-full rounded-t-xl">
          <thead>
            <tr className="text-l_gray text-left border-b-2 rounded-t-xl bg-[#F9FAFB]">
              <th className="px-4 py-4">NO</th>
              <th className="px-4 py-4">Email</th>
              <th className="px-4 py-4">User role</th>
              <th className="px-4 py-4">Permission</th>
              <th className="px-4 py-4">Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.email.length > 0 ? (
              data.email.map((email: string, index: number) => (
                <tr key={index} className="border-b-2 text-dark_gray">
                  <td className="px-4 py-4 items-center justify-center">
                    {index + 1}
                  </td>
                  <td className="px-4 py-4 text-sm">{email || "No email"}</td>
                  <td className="px-4 py-4 text-sm w-48">
                    {data.role[index] || "No user role"}
                  </td>
                  <td className="px-4 py-4">{data.permissionCount[index]}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`py-2 px-4 rounded-2xl ${
                        data.active[index] === true
                          ? "text-[#007A61] bg-[#f1fffc]"
                          : "text-[#B42319] bg-[#FDF3F3]"
                      }`}
                    >
                      {data.active[index] === true ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => navigate("/app/settings/view-admin")}
                      className="flex items-center gap-2 bg-white text-gray-600 py-4 px-6 border rounded-xl"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="flex justify-center items-center pt-4 text-center"
                >
                  Loading...
                </td>
              </tr>
            )}
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
            onSubmit={handleAdminInvite}
            validationSchema={validationSchema}
          >
            {({
              isValid,
              dirty,
              setFieldValue,
              setFieldTouched,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
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
                    loading={authLoading}
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
