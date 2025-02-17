import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import { TypographyVariant } from "../types";
import Typography from "../Typography";

const adminAccounts = [
  {
    id: 1,
    email: "Ekenedulle@gmail.com",
    role: "Super Admin",
    permission: 5,
    status: "Active",
  },
  {
    id: 2,
    email: "Chidera Indgiwe",
    role: "Admin",
    permission: 2,
    status: "Inactive",
  },
  {
    id: 3,
    email: "Derrick Maxwell",
    role: "Admin",
    permission: 3,
    status: "Active",
  },
  {
    id: 4,
    email: "Femi Pitter",
    role: "Admin",
    permission: 1,
    status: "Active",
  },
  {
    id: 5,
    email: "Grace Femi",
    role: "Admin",
    permission: 4,
    status: "Active",
  },
  {
    id: 6,
    email: "Theresa Callum",
    role: "Admin",
    permission: 3,
    status: "Active",
  },
];

const AccessManagement: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="flex justify-end gap-4">
        <button className="flex items-center gap-2 px-6 py-4  rounded-lg hover:bg-gray-50 text-[#007A61]">
          <Icon type="lock" className="w-6 h-6" />
          Manage Roles And Permissions
        </button>
        <button
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
                <td className={`px-4 py-4`}> <span className={` py-2 px-4 rounded-2xl ${admin.status === "Active" ? "text-[#007A61] bg-[#f1fffc]" : "text-[#B42319] bg-[#FDF3F3]"}`}>{admin.status}</span></td>
                <td className=" px-4 py-4 ">
                  <button
                    onClick={() => navigate("/app/instutitions/view-institute")}
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
    </div>
  );
};

export default AccessManagement;
