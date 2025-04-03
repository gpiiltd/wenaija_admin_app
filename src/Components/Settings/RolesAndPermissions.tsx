import React, { useEffect, useState } from "react";
import { TypographyVariant } from "../types";
import Typography from "../Typography";
import CustomModal from "../Modal";
import Button from "../Button";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import Breadcrumb from "../Breadcrumb";
import GoBack from "../GoBack";
import { rolesData as rolesDatum } from "./SettingsData";
import { Form } from "formik";
import TextAreaField from "../Input/Textarea";
import { Formik } from "formik";
import InputField from "../Input/Input";
import * as Yup from "yup";
import StatusToggle from "../Toggle";
import showCustomToast from "../CustomToast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state";
import { triggerGetAllRoles } from "../../features/rbac/rbacThunks";

const RolesAndPermissions: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const {
    rolesData: {
      data: rolesData,
      loading: rolesLoading,
      error: rolesError,
      message: rolesMessage,
      statusCode: rolesStatusCode,
    },
  } = useSelector((state: RootState) => state.rbac);
  console.log("rolesdata", rolesData);
  // const [expandedRole, setExpandedRole] = useState(rolesData[0].name);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, setStatus] = useState(true);

  // const togglePermissions = (name: string) => {
  //   setExpandedRole(name);
  // };

  const handleRoleChange = () => {
    setShowModal(false);
    setShowModal2(true);
  };

  // const getToggledPermissions = () => {
  //   const toggledPermissions = rolesData
  //     .filter((rolesDatum:any) => rolesDatum.role === expandedRole)
  //     .flatMap((rolesDatum:any) =>
  //       rolesDatum.permissions.filter((permission:any) => permission.allowed)
  //     );
  //   console.log(toggledPermissions);

  //   setTimeout(() => {
  //     showCustomToast(
  //       "Roles &  permission  successfully created",
  //       "Great job!"
  //     );
  //   }, 2000);
  // };

  const initialValues = {
    email: "",
    role: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format")
      .trim(),
    role: Yup.string().required("Role is required").trim(),
  });

  //GET ALL ROLES
  useEffect(() => {
    dispatch(triggerGetAllRoles({}));
  }, []);

  useEffect(() => {
    if (rolesData?.length > 0) {
      console.log("ROLES", rolesData.name);
    } else {
      console.log("Error fetching roles");
    }
  }, [rolesData]);

  return (
    <div className="">
      <GoBack label="Roles and permission" />
      <Breadcrumb />

      <div className="flex justify-end gap-4 mt-4">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-4 bg-[#007A61] text-white rounded-lg"
        >
          <Icon type="plus" className="w-6 h-6" />
          Add New Role
        </button>
      </div>

      <Typography
        variant={TypographyVariant.TITLE}
        className="font-bold text-xl mb-4"
      >
        View Roles & Permissions
      </Typography>
      <div className="flex items-start justify-between gap-6 w-full">
        <div className="w-[60%]">
        <div className="space-y-6">
  {Array.isArray(rolesData) &&
    rolesData.map((role: { id: number; name: string; description: string | null }) => (
      <div
        key={role.id}
        className="shadow rounded-lg p-4 cursor-pointer border-gray-300"
      >
        <div className="flex justify-between items-center">
          <div>
            <Typography
              variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
              className="font-semibold"
            >
              {role.name}
            </Typography>
            
            <Typography
              variant={TypographyVariant.BODY_SMALL_MEDIUM}
              className="text-gray-700 mt-1"
            >
              {role.description ? role.description : "No description available"}
            </Typography>
          </div>
          
          <button
            onClick={() => setShowModal2(true)}
            className="px-4 py-2 text-[#007A61] bg-white rounded-lg font-semibold"
          >
            Edit Role
          </button>
        </div>
      </div>
    ))
  }
</div>

        </div>

        <div className="w-[40%] border rounded-lg p-4">
  <Typography
    variant={TypographyVariant.TITLE}
    className="font-bold text-xl mb-4"
  >
    Permissions
  </Typography>
  <p className="text-gray-700 text-sm border-b pb-2 mb-8">
    This account will be able to do the following:
  </p>

  {Array.isArray(rolesData.permissions) && rolesData.permissions.length > 0 ? (
    rolesData.permissions.map((permission: { id: number; name: string; description: string | null }) => (
      <div
        key={permission.id}
        className="flex justify-between items-center mb-4 border-b pb-2"
      >
        <div>
          <Typography
            variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
            className="font-semibold"
          >
            {permission.name}
          </Typography>
          
          <Typography
            variant={TypographyVariant.BODY_SMALL_MEDIUM}
            className="text-gray-700 mt-1"
          >
            {permission.description ? permission.description : "No description available"}
          </Typography>
        </div>

        <button
          onClick={() => setShowModal2(true)}
          className="px-4 py-1 text-[#007A61] bg-white rounded-lg font-semibold"
        >
          Edit Permission
        </button>
      </div>
    ))
  ) : (
    <Typography
      variant={TypographyVariant.BODY_SMALL_MEDIUM}
      className="text-gray-500"
    >
      No permission available
    </Typography>
  )}
</div>


        {/* Add New Role Modal */}
        <CustomModal
          width="45%"
          height="65%"
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        >
          <div className="flex flex-col px-12">
            <Typography
              variant={TypographyVariant.TITLE}
              className="text-dark_gray font-semibold"
            >
              Add roles & permission
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
                  <div className="mt-5 mb-5">
                    <InputField
                      type="text"
                      focusStyle="green"
                      label="User role email"
                      name="email"
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                      placeholder="Enter email address"
                    />
                  </div>
                  <TextAreaField
                    placeholder="Enter role description"
                    label="Role Description"
                    name="role"
                    required={true}
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
                      text="Continue"
                      bg_color="#007A61"
                      text_color="white"
                      active={isValid && dirty}
                      border_color="border-green-500"
                      loading={false}
                      onClick={handleRoleChange}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </CustomModal>

        <CustomModal
          width="45%"
          height="75%"
          isOpen={showModal2}
          onClose={() => setShowModal2(false)}
        >
          <div className="flex flex-col px-12">
            <Typography
              variant={TypographyVariant.TITLE}
              className="text-dark_gray font-semibold"
            >
              Add roles & permission
            </Typography>
            <div className="flex flex-col gap-4 my-8">
              {rolesData[0]?.permissions.map(
                (permission: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span>{permission.name}</span>
                    <StatusToggle
                      isActive={permission.allowed}
                      onToggle={() => {
                        permission.allowed = !permission.allowed;
                        setStatus(permission.allowed);
                      }}
                    />
                  </div>
                )
              )}
            </div>
            <div className="flex items-center justify-center my-8 gap-4 mx-24">
              <Button
                text="Cancel"
                bg_color="white"
                text_color="black"
                border_color="border-green-500"
                active={true}
                loading={false}
                onClick={() => setShowModal2(false)}
              />
              <Button
                text="Save"
                bg_color="#007A61"
                text_color="white"
                border_color="border-green-500"
                active={true}
                loading={false}
                // onClick={getToggledPermissions}
              />
            </div>
          </div>
        </CustomModal>
      </div>
    </div>
  );
};

export default RolesAndPermissions;
