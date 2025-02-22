import React, { useState } from "react";
import Nav from "../../Components/Nav";
import { UserTab } from "../../Components/types";
import { usersData } from "../../Components/data";
import ButtonComponent from "../../Components/Button";
import { SlMagnifierAdd } from "react-icons/sl";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Tooltip from "../../Components/Tooltip";
import { useNavigate } from "react-router";

const UsersCategory = () => {
  const [activeTab, setActiveTab] = useState<UserTab>("Pending");
  const navigate = useNavigate();

  return (
    <div className="mt-6">
      <div className="bg-[#F2F4F7] py-3 px-5 rounded-lg w-fit mt-3">
        <Nav
          tabs={[
            { key: "Pending", label: "Pending", count: 32 },
            { key: "Enabled", label: "Enabled", count: 1100 },
            { key: "Disabled", label: "Disabled", count: 95 },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          activeStyle={{
            color: "black",
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "6px 8px",
          }}
          inactiveStyle={{
            color: "gray",
            padding: "6px 8px",
          }}
          helperStyle={{
            backgroundColor: "#F2F4F7",
            padding: "2px 6px",
            width: "fit",
            height: "fit",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
            display: "flex",
            borderRadius: "25%",
          }}
        />
      </div>
      <div className="mt-4">
        <table className="w-full border-b border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#F9FAFB] text-left text-l_gray text-sm font-title border-b border-gray-300">
              <th className="p-2 border-b border-gray-300">No</th>
              {activeTab === "Pending" && (
                <th className="p-4 border-b border-gray-300">Name</th>
              )}
              {activeTab === "Pending" && (
                <th className="p-4 border-b border-gray-300">
                  Identity card submitted
                </th>
              )}
              {activeTab === "Pending" && (
                <th className="p-4 border-b border-gray-300">Date of Birth</th>
              )}
              {activeTab === "Pending" && (
                <th className="p-4 border-b border-gray-300">
                  Submission date
                </th>
              )}

              {/* enabled */}
              {activeTab === "Enabled" && (
                <th className="p-4 border-b border-gray-300">Name and Email</th>
              )}
              {activeTab === "Enabled" && (
                <th className="p-4 border-b border-gray-300">
                  No of task completed
                </th>
              )}
              {activeTab === "Enabled" && (
                <th className="p-4 border-b border-gray-300">Star Points</th>
              )}
              {activeTab === "Enabled" && (
                <th className="p-4 border-b border-gray-300">
                  Registration date
                </th>
              )}

              {/* disabled */}

              {activeTab === "Disabled" && (
                <th className="p-4 border-b border-gray-300">Name & Email</th>
              )}
              {activeTab === "Disabled" && (
                <th className="p-4 border-b border-gray-300">
                  No of task completed
                </th>
              )}
              {activeTab === "Disabled" && (
                <th className="p-4 border-b border-gray-300">Date Disabled</th>
              )}
              {activeTab === "Disabled" && (
                <th className="p-4 border-b border-gray-300">Reason</th>
              )}
            </tr>
          </thead>
          <tbody className="text-[#101828] text-sm font-title">
            {usersData[activeTab].map((user, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="p-4 ">{user.id}</td>
                {activeTab === "Pending" && (
                  <td className="p-4 ">{user.name}</td>
                )}
                {activeTab === "Pending" && (
                  <td className="p-4 ">{user.identityCard}</td>
                )}
                {activeTab === "Pending" && (
                  <td className="p-4 ">{user.DOB}</td>
                )}
                {activeTab === "Pending" && (
                  <td className="p-4  text-error flex items-center justify-between">
                    {user.subDate}
                    <div>
                      <ButtonComponent
                        icon={<SlMagnifierAdd />}
                        text="Review"
                        text_color="#FFFFFF"
                        bg_color="#007A61"
                        active={true}
                        loading={false}
                        onClick={() => navigate("/app/users/validate-kyc")}
                      />
                    </div>
                  </td>
                )}
                {/* enabled */}
                {activeTab === "Enabled" && (
                  <td className="p-4  flex flex-col">
                    {user.name}
                    <div className="text-[#667085]"> {user.email}</div>
                  </td>
                )}

                {activeTab === "Enabled" && (
                  <td className="p-4 ">{user.noOfTasksCompleted}</td>
                )}
                {activeTab === "Enabled" && (
                  <td className="p-4 text-orange font-semibold">
                    {user.starPoints} SP
                  </td>
                )}
                {activeTab === "Enabled" && (
                  <td className="p-4 flex items-center justify-between">
                    {user.registrationDate}
                    <Tooltip tooltip="View profile">
                      <div className="hover:text-primary_green cursor-pointer" >
                        <HiOutlineDotsVertical onClick={()=>navigate('/app/users/profile')}/>
                      </div>
                    </Tooltip>
                  </td>
                )}
                {/* disabled */}
                {activeTab === "Disabled" && (
                  <td className="p-4  flex flex-col">
                    {user.name}
                    <div className="text-[#667085]"> {user.email}</div>
                  </td>
                )}
                {activeTab === "Disabled" && (
                  <td className="p-4">{user.noOfTasksCompleted}</td>
                )}
                {activeTab === "Disabled" && (
                  <td className="p-4">{user.dateDisabled}</td>
                )}
                {activeTab === "Disabled" && (
                  <td className="p-4 flex items-center justify-between">
                    <p className="text-orange font-title">{user.reason}</p>

                    <Tooltip tooltip="View profile">
                      <div className="hover:text-primary_green cursor-pointer">
                        <HiOutlineDotsVertical />
                      </div>
                    </Tooltip>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersCategory;
