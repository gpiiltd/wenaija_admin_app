import React, { useEffect, useState } from "react";
import { TypographyVariant } from "../types";
import Typography from "../Typography";
import CustomModal from "../Modal";
import Button from "../Button";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import Breadcrumb from "../Breadcrumb";
import GoBack from "../GoBack";
import { Form } from "formik";
import TextAreaField from "../Input/Textarea";
import { Formik } from "formik";
import InputField from "../Input/Input";
import * as Yup from "yup";
import StatusToggle from "../Toggle";
import showCustomToast from "../CustomToast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state";
import {
  triggerAddRole,
  triggerEditRolesAndPermissions,
  triggerGetAllRoles,
  triggerGetPermissions,
} from "../../features/rbac/rbacThunks";
import { toast, ToastContainer } from "react-toastify";
import {
  resetAddRoleDataState,
  resetEditRoleAndPermissionState,
} from "../../features/rbac/rbacSlice";

const RolesAndPermissions: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const {
    rolesData,
    addRoleData,
    editRolesAndPermissionsData,
    statusCode,
    error,
    message,
    userData,
  } = useSelector((state: RootState) => state.rbac);
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [formData, setFormData] = useState({ role: "", description: "" });
  const handleRoleChange = async (submitForm: () => Promise<void>) => {
    await submitForm();
  };
  const [editRoleDetails, setEditRoleDetails] = useState<{
    id: number;
    name: string;
    description: string | null;
    permissions: { id: number; name: string; description?: string | null }[];
  } | null>(null);

  useEffect(() => {
    if (
      Array.isArray(rolesData.data.results) &&
      rolesData.data.results.length > 0
    ) {
      setSelectedRole(rolesData.data.results[0].id);
    }
  }, [rolesData]);

  const handleToggle = (id: number) => {
    setSelectedPermissions((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((permissionId) => permissionId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const validationSchema = Yup.object().shape({
    role: Yup.string().required("role is required").trim(),
    description: Yup.string().required("Add a description to this role").trim(),
  });

  //GET ALL ROLES
  useEffect(() => {
    dispatch(triggerGetAllRoles({}));
  }, []);

  useEffect(() => {
    if (rolesData.statusCode === 200 && rolesData.data) {
    } else if (rolesData.error && rolesData.message) {
    }
  }, [rolesData]);

  //GET ALL permissions
  useEffect(() => {
    dispatch(triggerGetPermissions({}));
  }, []);

  useEffect(() => {
    if (statusCode === 200 && userData) {
    } else if (error && message) {
      toast.error(message);
    }
  }, [userData]);

  //ADD ROLES
  const handleAddRole = () => {
    const payload = {
      name: formData.role,
      description: formData.description,
      permissions: selectedPermissions,
    };
    dispatch(triggerAddRole(payload));
  };

  useEffect(() => {
    if (addRoleData.statusCode === 201 && addRoleData.data) {
      console.log("SUCCESS***");
      setShowModal2(false);
      showCustomToast(
        "Roles & permission successfully created",
        addRoleData.message
      );
      setTimeout(() => {
        dispatch(triggerGetAllRoles({}));
      }, 1000);
      const data = addRoleData.data;
      console.log("role added", data);
    }
    if (addRoleData.error && addRoleData.message) {
      console.log("Error adding:", addRoleData.message);
      toast.error(addRoleData.message);
      setTimeout(() => {
        setShowModal2(false);
      }, 1000);
    }
    dispatch(resetAddRoleDataState());
  }, [
    addRoleData.data,
    addRoleData.error,
    addRoleData.message,
    addRoleData.statusCode,
  ]);

  //edit roles and permissions
  console.log("ID", editRoleDetails);

  const handleEditRoleAndPermission = () => {
    const payload = {
      id: editRoleDetails!.id,
      data: {
        name: formData.role,
        description: formData.description,
        permissions: selectedPermissions,
      },
    };
    dispatch(triggerEditRolesAndPermissions(payload));
  };

  useEffect(() => {
    if (
      editRolesAndPermissionsData.statusCode === 200 &&
      editRolesAndPermissionsData.data
    ) {
      console.log("SUCCESS***");
      setShowModal2(false);
      showCustomToast(
        "Roles & permission successfully created",
        editRolesAndPermissionsData.message
      );
      setTimeout(() => {
        dispatch(triggerGetAllRoles({}));
      }, 1000);
      const data = editRolesAndPermissionsData.data;
      console.log("role added", data);
    }
    if (
      editRolesAndPermissionsData.error &&
      editRolesAndPermissionsData.message
    ) {
      console.log("Error adding:", editRolesAndPermissionsData.message);
      toast.error(editRolesAndPermissionsData.message);
      setTimeout(() => {
        setShowModal2(false);
      }, 1000);
    }
    dispatch(resetEditRoleAndPermissionState());
  }, [
    dispatch,
    editRolesAndPermissionsData.data,
    editRolesAndPermissionsData.error,
    editRolesAndPermissionsData.message,
    editRolesAndPermissionsData.statusCode,
  ]);

  return (
    <div className="">
      <ToastContainer />
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
            {rolesData.loading ? (
              <Typography
                variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                className="text-center"
              >
                Loading...
              </Typography>
            ) : Array.isArray(rolesData.data?.results) &&
              rolesData.data.results.length > 0 ? (
              rolesData.data.results.map(
                (role: {
                  id: number;
                  name: string;
                  description: string | null;
                }) => (
                  <div
                    key={role.id}
                    className={`shadow rounded-lg p-4 cursor-pointer border border-gray-300 
            ${selectedRole === role.id ? "border-primary_green" : ""}`}
                    onClick={() => setSelectedRole(role.id)}
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
                          {role.description
                            ? role.description
                            : "No description available"}
                        </Typography>
                      </div>

                      <button
                        onClick={() => {
                          const selected = rolesData?.data?.results.find(
                            (r: any) => r.id === role.id
                          );

                          if (selected) {
                            setEditRoleDetails({
                              id: selected.id,
                              name: selected.name,
                              description: selected.description,
                              permissions: selected.permissions || [],
                            });
                            setShowModal(true);
                          }
                        }}
                        className="px-4 py-2 text-[#007A61] bg-white rounded-lg font-semibold"
                      >
                        Edit Role
                      </button>
                    </div>
                  </div>
                )
              )
            ) : (
              <Typography
                variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                className="text-center text-gray-500"
              >
                No roles found.
              </Typography>
            )}
          </div>
        </div>

        {/* Permissions Block */}
        <div className="border rounded-lg shadow-md p-6 w-[35%] mt-2 h-[350px] overflow-hidden">
          <Typography
            variant={TypographyVariant.TITLE}
            className="font-bold text-xl mb-4"
          >
            Permissions
          </Typography>
          <p className="text-gray-700 text-sm border-b pb-2 mb-8">
            This account will be able to do the following:
          </p>

          <div className="overflow-y-auto h-[250px]">
            {(() => {
              const selectedRoleData = rolesData?.data?.results?.find(
                (role: any) => role.id === selectedRole
              );
              if (selectedRoleData?.permissions?.length > 0) {
                return selectedRoleData.permissions.map(
                  (permission: {
                    id: number;
                    name: string;
                    description?: string | null;
                  }) => (
                    <div
                      key={permission.id}
                      className="flex justify-between items-center mb-4  pb-2 mt-2"
                    >
                      <div>
                        <Typography
                          variant={TypographyVariant.BODY_SMALL_MEDIUM}
                          className="text-2xl text-[#344054]"
                        >
                          {permission.name.charAt(0) +
                            permission.name.slice(1).toLowerCase()}
                        </Typography>
                      </div>

                      <Typography
                        variant={TypographyVariant.BODY_SMALL_MEDIUM}
                        className="text-primary_green font-extrabold mt-1"
                      >
                        YES
                      </Typography>
                    </div>
                  )
                );
              } else {
                return (
                  <Typography
                    variant={TypographyVariant.BODY_SMALL_MEDIUM}
                    className="text-gray-500"
                  >
                    No permission available for this role
                  </Typography>
                );
              }
            })()}
          </div>
        </div>

        {/* Add New Role Modal */}
        <CustomModal
          width="45%"
          height="65%"
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setEditRoleDetails(null);
          }}
        >
          <div className="flex flex-col px-12">
            <Typography
              variant={TypographyVariant.TITLE}
              className="text-dark_gray font-semibold"
            >
              {editRoleDetails
                ? "Edit roles & permission"
                : "Add roles & permission"}
            </Typography>
            <Formik
              enableReinitialize
              initialValues={{
                role: editRoleDetails?.name || "",
                description: editRoleDetails?.description || "",
              }}
              validateOnChange
              validateOnBlur
              validationSchema={validationSchema}
              onSubmit={(values) => {
                setFormData({
                  role: values.role,
                  description: values.description,
                });
                setShowModal(false);
                setShowModal2(true);
              }}
            >
              {({
                isValid,
                dirty,
                setFieldValue,
                setFieldTouched,
                submitForm,
              }) => (
                <Form>
                  <div className="mt-5 mb-5">
                    <InputField
                      type="text"
                      focusStyle="green"
                      label="User role name"
                      name="role"
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                      placeholder="Enter user role name"
                    />
                  </div>

                  <TextAreaField
                    placeholder="Enter role description"
                    label="Role Description"
                    name="description"
                    required
                  />

                  <div className="flex items-center justify-center gap-4 mx-24 mt-12">
                    <Button
                      text="Cancel"
                      bg_color="white"
                      text_color="black"
                      border_color="border-green-500"
                      active={true}
                      loading={false}
                      onClick={() => {
                        setShowModal(false);
                        setEditRoleDetails(null);
                      }}
                    />
                    <Button
                      text="Continue"
                      bg_color="#007A61"
                      text_color="white"
                      active={isValid && dirty}
                      border_color="border-green-500"
                      loading={false}
                      onClick={() => {
                        handleRoleChange(submitForm);
                      }}
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
              {Array.isArray(userData) ? (
                userData.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-[#5E5959]">
                      {item.name.charAt(0) + item.name.slice(1).toLowerCase()}
                    </span>
                    <label className="flex items-center space-x-2">
                      <StatusToggle
                        isActive={selectedPermissions.includes(item.id)}
                        onToggle={(isActive) => handleToggle(item.id)}
                      />
                    </label>
                  </div>
                ))
              ) : (
                <span>Loading...</span>
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
                onClick={() => {
                  setShowModal2(false);
                  setEditRoleDetails(null);
                }}
              />

              <Button
                text={editRoleDetails ? "Save Changes" : "Add Role"}
                bg_color="#007A61"
                text_color="white"
                border_color="border-green-500"
                active={true}
                loading={
                  editRoleDetails
                    ? editRolesAndPermissionsData.loading
                    : addRoleData.loading
                }
                // onClick={handleEditRoleAndPermission}
                onClick={
                  editRoleDetails ? handleEditRoleAndPermission : handleAddRole
                }
              />
              <button></button>
            </div>
          </div>
        </CustomModal>
      </div>
    </div>
  );
};

export default RolesAndPermissions;
