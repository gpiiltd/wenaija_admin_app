import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import { TypographyVariant } from "../types";
import Typography from "../Typography";
import Button from "../Button";
import CustomModal from "../Modal";

const adminAccounts = [
  {
    id: 1,
    name: "Ekene Dullie",
    email: "Ekenedulle@gmail.com",
    role: "Super Admin",
    permission: 5,
    status: "Active",
  },
  {
    id: 2,
    name: "Chidera Indgiwe",
    email: "Chidera Indgiwe",
    role: "Admin",
    permission: 2,
    status: "Inactive",
  },
  {
    id: 3,
    name: "Derrick Maxwell",
    email: "Derrick Maxwell",
    role: "Admin",
    permission: 3,
    status: "Active",
  },
  {
    id: 4,
    name: "Femi Pitter",
    email: "Femi Pitter",
    role: "Admin",
    permission: 1,
    status: "Active",
  },
  {
    id: 5,
    name: "Grace Femi",
    email: "Grace Femi",
    role: "Admin",
    permission: 4,
    status: "Active",
  },
  {
    id: 6,
    name: "Theresa Callum",
    email: "Theresa Callum",
    role: "Admin",
    permission: 3,
    status: "Active",
  },
];

const AccessManagement: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    role: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="">
      <div className="flex justify-end gap-4">
        <button className="flex items-center gap-2 px-6 py-4  rounded-lg hover:bg-gray-50 text-[#007A61]">
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
          <div className="flex flex-col w-full mt-8">
            <div className="">
              <label
                className="block text-dark_gray text-sm  mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email Address"
                className=" appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight"
                required
              />
            </div>
            <div className="mt-8">
              <label
                className="block text-dark_gray text-sm  mb-2"
                htmlFor="role"
              >
                Select Admin type
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className=" appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight"
                required
              >
                <option value="">Select Admin type</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
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
            />

            <Button
              text="Save"
              bg_color="#007A61"
              text_color="white"
              border_color="border-green-500"
              active={true}
              loading={false}
            />
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default AccessManagement;
