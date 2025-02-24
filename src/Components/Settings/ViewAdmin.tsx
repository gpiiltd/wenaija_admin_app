import React, { useState } from "react";
import Typography from "../Typography";
import { TypographyVariant } from "../types";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import Button from "../Button";
import CustomModal from "../Modal";
import ButtonComponent from "../Button";
import StatusToggle from "../Toggle";
import SelectOption from "../Input/SelectOptions";
import showCustomToast from "../CustomToast";
import { FiEdit } from "react-icons/fi";
import { rejectOptions, viewAdminData } from "./SettingsData";
import GoBack from "../GoBack";
import Breadcrumb from "../Breadcrumb";

const ViewAdmin: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenWarning, setIsModalOpenWarning] = useState(false);
  const [adminRole, setAdminRole] = useState(viewAdminData.role);
  const [selectedRole, setSelectedRole] = useState(adminRole);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(true);
  const [selectedValue, setSelectedValue] = useState("");

  const approveStatus = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenStatusModal(false);
    }, 2000);
    setTimeout(() => {
      showCustomToast(
        "Account Disabled",
        "Ekene Dulle account is now inactive"
      );
    }, 2000);
  };

  const handleRoleChange = () => {
    setIsModalOpen(false);
    setIsModalOpenWarning(true);
  };

  const handleRoleChange2 = () => {
    setIsModalOpenWarning(false);
    setAdminRole(selectedRole);
  };

  return (
    <div className="">
      <GoBack label={`View Admin - ${viewAdminData.name}`} />
      <Breadcrumb />

      <div className="flex  justify-between border rounded-lg p-6 mt-8">
        <div className="flex items-center ">
          <div className="w-16 h-16 bg-[#f1fffc] text-[#007A61] rounded-full flex items-center justify-center">
            <span className="text-xl font-bold ">
              {viewAdminData.name.charAt(0).toUpperCase()}A
            </span>
          </div>

          <div className="ml-4">
            <Typography
              variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
              className="font-semibold text-dark_gray"
            >
              {viewAdminData.email}
            </Typography>

            <section className="flex items-center gap-2 mt-1">
              <div
                className={`w-fit h-fit rounded-xl p-1 ${
                  status ? " bg-[#F0FEFB]" : "text-[#DB1B24] bg-[#FFFAEB] "
                }`}
              >
                <Typography
                  variant={TypographyVariant.BODY_SMALL_MEDIUM}
                  className={`text-center ${
                    status ? "text-primary_green" : "text-[#DB1B24] "
                  }`}
                >
                  {status ? "Active" : "Inactive"}
                </Typography>
              </div>
              <FiEdit
                color="#007A61"
                cursor="pointer"
                onClick={() => setOpenStatusModal(true)}
              />
            </section>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          Date created:{" "}
          <span className="text-[#FF725E]">{viewAdminData.dateCreated}</span>
        </p>
      </div>

      <Typography
        variant={TypographyVariant.TITLE}
        className="text-dark_gray font-semibold mt-8 mb-2"
      >
        User roles
      </Typography>

      <div className="flex items-start justify-between gap-6 w-full">
        <div className="flex items-start justify-between border rounded-lg shadow-md w-[65%] p-6">
          <div className="">
            <span className="font-semibold">{viewAdminData.role}</span>
            <p className="text-gray-700 text-sm mt-2">
              {viewAdminData.roleDescription}
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-[#007A61] font-bold"
          >
            Change Role
          </button>
        </div>

        <div className="border rounded-lg shadow-md p-6 w-[35%]">
          <h2 className="text-lg font-semibold mb-4">Permissions</h2>
          <p className="text-gray-700 text-sm border-b pb-2">
            This account will be able to do the following:
          </p>
          <ul className="list-disc list-inside mt-2">
            {viewAdminData.permissions.map((permission, index) => (
              <p key={index} className="text-gray-700 py-3">
                {permission}
              </p>
            ))}
          </ul>
        </div>
      </div>

      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        width="35%"
        height="45%"
      >
        <div className="px-8">
          <h2 className="text-lg font-bold mb-4">Change Admin Role</h2>
          <div className="flex flex-col">
            {["Super Admin", "Admin", "Regulator"].map((role) => (
              <label
                key={role}
                className="flex justify-between mb-2 text-gray-600"
              >
                {role}
                <input
                  type="radio"
                  value={role}
                  checked={selectedRole === role}
                  onChange={() => setSelectedRole(role)}
                  style={{ accentColor: "#007A61" }}
                />
              </label>
            ))}
          </div>

          <div className="flex items-center justify-center my-8 gap-4 mx-auto">
            <Button
              text="Cancel"
              bg_color="white"
              text_color="black"
              border_color="border-green-500"
              active={true}
              loading={false}
              onClick={() => setIsModalOpen(false)}
            />

            <Button
              text="Save"
              bg_color="#007A61"
              text_color="white"
              border_color="border-green-500"
              active={true}
              loading={false}
              onClick={handleRoleChange}
            />
          </div>
        </div>
      </CustomModal>

      {/* Warning modal for role change */}
      <CustomModal
        isOpen={isModalOpenWarning}
        onClose={() => setIsModalOpenWarning(false)}
        width="45%"
        height="55%"
      >
        <div className="px-8">
          <div className="flex flex-col items-center justify-center">
            <Icon type="alert" className="w-24 h-24" />
            <Typography
              variant={TypographyVariant.TITLE}
              className="text-dark_gray font-semibold mt-8 mb-2"
            >
              Change admin role
            </Typography>
            <Typography
              variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
              className="text-gray-700 mt-2"
            >
              Are you sure you want to change the role of this admin?
            </Typography>
          </div>
          <div className="flex items-center justify-center my-12 gap-4 mx-auto">
            <Button
              text="Cancel"
              bg_color="white"
              text_color="black"
              border_color="border-green-500"
              active={true}
              loading={false}
              onClick={() => setIsModalOpenWarning(false)}
            />

            <Button
              text="Save"
              bg_color="#007A61"
              text_color="white"
              border_color="border-green-500"
              active={true}
              loading={false}
              onClick={handleRoleChange2}
            />
          </div>
        </div>
      </CustomModal>

      {/* STATUS modal */}
      <CustomModal
        isOpen={openStatusModal}
        onClose={() => setOpenStatusModal(!openStatusModal)}
        width="40%"
        height="fit"
      >
        <div className="flex gap-4 flex-col pb-16 px-24">
          <Typography variant={TypographyVariant.TITLE} className="text-center">
            Profile status
          </Typography>

          <Typography
            variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
            className="text-[#5E5959] font-bold"
          >
            Status:
          </Typography>

          <div className="flex justify-between">
            <div>
              <Typography
                variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                className={`font-bold ${
                  status ? "text-primary_green" : "text-[#DB1B24] "
                }`}
              >
                {status === true ? "Active" : "Inactive"}
              </Typography>
              <Typography
                variant={TypographyVariant.BODY_SMALL_MEDIUM}
                className="text-[#5E5959] font-bold"
              >
                Ekene Dulle account is {status ? "active" : "inactive"}
              </Typography>
            </div>
            <StatusToggle isActive={status} onToggle={setStatus} />
          </div>

          {!status && (
            <SelectOption
              label="Select reason"
              options={rejectOptions}
              value={selectedValue}
              onChange={setSelectedValue}
              className="pb-3"
            />
          )}

          {!status && (
            <div className="flex gap-2 justify-center items-center px-11">
              <ButtonComponent
                text="Cancel"
                text_color="#344054"
                bg_color="transparent"
                active
                border_color="#D0D5DD"
                loading={false}
                onClick={() => setOpenStatusModal(false)}
              />
              <ButtonComponent
                text="Approve"
                text_color="#FFFFFF"
                bg_color="#007A61"
                active={true}
                loading={loading}
                onClick={approveStatus}
              />
            </div>
          )}
        </div>
      </CustomModal>
    </div>
  );
};

export default ViewAdmin;
