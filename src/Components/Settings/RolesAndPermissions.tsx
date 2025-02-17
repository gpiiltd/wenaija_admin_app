import React, { useState } from "react";
import { TypographyVariant } from "../types";
import Typography from "../Typography";
import CustomModal from "../Modal";
import Button from "../Button";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import { Link } from "react-router-dom";

const rolesData = [
  {
    role: "Super Admin",
    description: "This account can create and manage Merchants",
    permissions: [
      { name: "Add users", allowed: true },
      { name: "Deactivate user", allowed: true },
      { name: "Suspend user", allowed: true },
      { name: "Assign roles", allowed: true },
      { name: "Deactivate customer account", allowed: true },
      { name: "Access all reports", allowed: true },
      { name: "Manage system settings", allowed: true },
    ],
  },
  {
    role: "Admin",
    description:
      "This account can view and generate detailed transaction reports",
    permissions: [
      { name: "Add users", allowed: true },
      { name: "Deactivate user", allowed: true },
      { name: "Suspend user", allowed: false },
      { name: "Assign roles", allowed: false },
      { name: "Deactivate customer account", allowed: false },
      { name: "Access financial reports", allowed: true },
      { name: "Manage user feedback", allowed: false },
    ],
  },
  {
    role: "User",
    description: "This account can view personal transaction history",
    permissions: [
      { name: "Add users", allowed: false },
      { name: "Deactivate user", allowed: false },
      { name: "Suspend user", allowed: false },
      { name: "Assign roles", allowed: false },
      { name: "Deactivate customer account", allowed: false },
      { name: "View personal reports", allowed: true },
      { name: "Submit feedback", allowed: true },
    ],
  },
  {
    role: "Guest",
    description: "This account has limited access to view public information",
    permissions: [
      { name: "Add users", allowed: false },
      { name: "Deactivate user", allowed: false },
      { name: "Suspend user", allowed: false },
      { name: "Assign roles", allowed: false },
      { name: "Deactivate customer account", allowed: false },
      { name: "View public reports", allowed: true },
      { name: "Submit feedback", allowed: false },
    ],
  },
];

const RolesAndPermissions: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [expandedRole, setExpandedRole] = useState(rolesData[0].role);

  const togglePermissions = (role: string) => {
    setExpandedRole(role);
  };

  const handleRoleChange = () => {
    setShowModal(false);
    setShowModal2(true);
  };

  const handleRoleChange2 = () => {
    setShowModal2(false);
  };
  
  const getToggledPermissions = () => {
    const toggledPermissions = rolesData
      .filter((roleData) => roleData.role === expandedRole)
      .flatMap((roleData) =>
        roleData.permissions.filter((permission) => permission.allowed)
      );
    console.log(toggledPermissions);
  };

  return (
    <div className="">
      <div className="flex items-center justify-start gap-6 ">
        <Link to="/app/settings">
          <Icon type="arrowBack" className="w-10 h-10" />
        </Link>
        <Typography variant={TypographyVariant.TITLE} className="font-semibold">
          Roles and permissions
        </Typography>{" "}
      </div>
      <div className="flex justify-end gap-4">
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
            {rolesData.map((roleData, index) => (
              <div
                key={index}
                className={` shadow rounded-lg p-4 cursor-pointer ${
                  expandedRole === roleData.role
                    ? "border-[#007A61] border"
                    : "border-gray-300"
                }`}
                onClick={() => togglePermissions(roleData.role)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <Typography
                      variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                      className="font-semibold"
                    >
                      {roleData.role}
                    </Typography>
                    <Typography
                      variant={TypographyVariant.BODY_SMALL_MEDIUM}
                      className="text-gray-700"
                    >
                      {roleData.description}
                    </Typography>
                  </div>
                  <button onClick={() => setShowModal2(true)} className="px-4 py-2 text-[#007A61] bg-white rounded-lg font-semibold">
                  Edit Role
                  </button>
                </div>
              </div>
            ))}
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
          {rolesData
            .filter((roleData) => roleData.role === expandedRole)
            .map((roleData, index) => (
              <div key={index} className="">
                <ul className="list-disc list-inside ">
                  {roleData.permissions.map((permission, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between text-gray-700 py-3"
                    >
                      <span>{permission.name}</span>
                      <span
                        className={`font-semibold ${
                          permission.allowed
                            ? "text-[#007A61]"
                            : "text-gray-500"
                        }`}
                      >
                        {permission.allowed ? "YES" : "NO"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>

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

            <div className="flex flex-col gap-4 my-8">
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-gray-700 font-semibold mb-2"
                >
                  User role email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  className="border rounded-lg px-4 py-2"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="role"
                  className="text-gray-700 font-semibold mb-2"
                >
                  User role description
                </label>
                <textarea
                  id="role"
                  name="role"
                  placeholder="Enter role description"
                  style={{ height: "150px" }}
                  className="border rounded-lg px-4 py-2"
                />
              </div>
              <div className="flex items-center justify-center gap-4 mx-auto mt-6">
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
                  border_color="border-green-500"
                  active={true}
                  loading={false}
                  onClick={handleRoleChange}
                />
              </div>
            </div>
          </div>
        </CustomModal>

        <CustomModal
          width="45%"
          height="65%"
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
              {rolesData[0].permissions.map((permission, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{permission.name}</span>
                  <label className="inline-flex items-center">
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                    <style>
                      {`
                    .switch {
                      position: relative;
                      display: inline-block;
                      width: 34px;
                      height: 20px;
                    }
                    .switch input {
                      opacity: 0;
                      width: 0;
                      height: 0;
                    }
                    .slider {
                      position: absolute;
                      cursor: pointer;
                      top: 0;
                      left: 0;
                      right: 0;
                      bottom: 0;
                      background-color: #ccc;
                      transition: 0.4s;
                      border-radius: 34px;
                    }
                    .slider:before {
                      position: absolute;
                      content: "";
                      height: 14px;
                      width: 14px;
                      left: 3px;
                      bottom: 3px;
                      background-color: white;
                      transition: 0.4s;
                      border-radius: 50%;
                    }
                    input:checked + .slider {
                      background-color: #007A61;
                    }
                    input:checked + .slider:before {
                      transform: translateX(14px);
                    }
                    `}
                    </style>
                  </label>
                </div>
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
                onClick={() => setShowModal2(false)}
              />
              <Button
                text="Save"
                bg_color="#007A61"
                text_color="white"
                border_color="border-green-500"
                active={true}
                loading={false}
                onClick={getToggledPermissions}
              />

              
            </div>
          </div>
        </CustomModal>
      </div>
    </div>
  );
};

export default RolesAndPermissions;
