import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Typography from "../Typography";
import { TypographyVariant } from "../types";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import Button from "../Button";
import CustomModal from "../Modal";
import "./SwitchStyles.css";

const ViewAdmin: React.FC = () => {
  const { adminId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenWarning, setIsModalOpenWarning] = useState(false);
  const [isActiveStatusModal, setIsActiveStatusModal] = useState(false);
  const [isInactiveStatusModal, setIsInactiveStatusModal] = useState(false);
  const [adminRole, setAdminRole] = useState("Admin");
  const [selectedRole, setSelectedRole] = useState(adminRole);

  const [formData, setFormData] = useState({
    reason: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const adminData = {
    id: adminId,
    name: "Ekene Dullie",
    email: "ekenedulle@gmail.com",
    status: "Active",
    dateCreated: "22nd Sep 2024",
    role: adminRole,
    roleDescription:
      "This account can view and generate detailed transaction reports.",
    permissions: [
      "Add users",
      "Deactivate user",
      "Suspend user",
      "Assign roles",
      "Deactivate customer account",
    ],
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
      <div className="flex items-center justify-start gap-6 mb-8">
        <Link to="/app/settings">
          <Icon type="arrowBack" className="w-10 h-10" />
        </Link>
        <Typography variant={TypographyVariant.TITLE} className="font-semibold">
          View Admin - {adminData.name}
        </Typography>{" "}
      </div>

      <div className="flex  justify-between border rounded-lg p-6">
        <div className="flex items-center ">
          <div className="w-16 h-16 bg-[#f1fffc] text-[#007A61] rounded-full flex items-center justify-center">
            <span className="text-xl font-bold ">
              {adminData.name.charAt(0).toUpperCase()}A
            </span>
          </div>

          <div className="ml-4">
            <Typography
              variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
              className="font-semibold text-dark_gray"
            >
              {adminData.email}
            </Typography>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[#007A61] bg-[#f1fffc] px-2 py-1 rounded-lg">
                {adminData.status}
              </span>{" "}
              <span
                className="cursor-pointer w-6 h-6 "
                onClick={() => setIsActiveStatusModal(true)}
              >
                <Icon type="editt" className="w-6 h-6 " />
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          Date created:{" "}
          <span className="text-[#FF725E]">{adminData.dateCreated}</span>
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
            <span className="font-semibold">{adminData.role}</span>
            <p className="text-gray-700 text-sm mt-2">
              {adminData.roleDescription}
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
            {adminData.permissions.map((permission, index) => (
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

      {/* Active status modal */}
      <CustomModal
        width="45%"
        height="45%"
        isOpen={isActiveStatusModal}
        onClose={() => setIsActiveStatusModal(false)}
      >
        <div className="flex flex-col px-24">
          <div className="flex items-center justify-center">
            <Typography
              variant={TypographyVariant.TITLE}
              className="text-dark_gray font-semibold"
            >
              Profile status
            </Typography>
          </div>
          <Typography
            variant={TypographyVariant.SUBTITLE}
            className="text-dark_gray font-semibold my-4"
          >
            Status:
          </Typography>
          <div className="flex flex-col gap-4 ">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[#007A61] text-xl">
                  {adminData.status}
                </span>
                <Typography
                  variant={TypographyVariant.NORMAL}
                  className="text-l_gray font-semibold"
                >
                  ekenedulle@gmail.com account is active
                </Typography>
              </div>
              <label className="inline-flex items-center">
                <label className="switch">
                  <input
                    type="checkbox"
                    defaultChecked={adminData.status === "Active"}
                    onChange={(e) => {
                      if (!e.target.checked) {
                        setIsActiveStatusModal(false);
                        setIsInactiveStatusModal(true);
                      }
                    }}
                  />
                  <span className="slider round"></span>
                </label>
              </label>
            </div>
          </div>
        </div>
      </CustomModal>

      {/* Inactive status modal */}
      <CustomModal
        width="45%"
        height="65%"
        isOpen={isInactiveStatusModal}
        onClose={() => setIsInactiveStatusModal(false)}
      >
        <div className="flex flex-col px-24">
          <div className="flex items-center justify-center">
            <Typography
              variant={TypographyVariant.TITLE}
              className="text-dark_gray font-semibold"
            >
              Profile status
            </Typography>
          </div>
          <Typography
            variant={TypographyVariant.SUBTITLE}
            className="text-dark_gray font-semibold my-4"
          >
            Status:
          </Typography>
          <div className="flex flex-col gap-4 ">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[#ee2d2d] text-xl">Inactive</span>
                <Typography
                  variant={TypographyVariant.NORMAL}
                  className="text-l_gray font-semibold"
                >
                  ekenedulle@gmail.com account is active
                </Typography>
              </div>
              <label className="inline-flex items-center">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={adminData.status === "Activevv"}
                    readOnly
                  />
                  <span className="slider round"></span>
                </label>
              </label>
            </div>
            <Typography
              variant={TypographyVariant.SUBTITLE}
              className="text-dark_gray font-semibold my-4"
            >
              Select reason{" "}
            </Typography>
            <div className="">
              <label
                className="block text-gray-600 text-sm  mb-2"
                htmlFor="reason"
              >
                Reason
              </label>
              <select
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className=" appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight"
                required
              >
                <option value="">Select reason</option>
                <option value="Suspicious activity">Suspicious activity</option>
                <option value="Inactivity">Inactivity</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-center my-8 gap-4 mx-auto">
            <Button
              text="Cancel"
              bg_color="white"
              text_color="black"
              border_color="border-green-500"
              active={true}
              loading={false}
              onClick={() => setIsInactiveStatusModal(false)}
            />
            <Button
              text="Save"
              bg_color="#007A61"
              text_color="white"
              border_color="border-green-500"
              active={true}
              loading={false}
              onClick={() => setIsInactiveStatusModal(false)}
            />
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default ViewAdmin;
