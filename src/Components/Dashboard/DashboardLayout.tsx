import React from "react";
import { NavLink, Outlet } from "react-router";
import { FiUsers, FiLogOut } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import Typography from "../Typography";
import { TypographyVariant } from "../types";

const DashboardLayout = () => {
  return (
    <div className="grid grid-cols-[300px_1fr] h-screen">
      <div className="flex flex-col justify-between h-full pb-48 border-r px-5">
        <div>
          <nav className="flex flex-col pt-6">
            <ul className="space-y-6 text-lg">
              <li>
                <NavLink
                  to={"dashboard"}
                  className={({ isActive }) =>
                    isActive
                      ? "px-2 py-2 w-full bg-effect_green font-normal rounded-md flex gap-2 items-center"
                      : "px-2 py-2 w-full font-normal  hover:rounded-md  hover:bg-effect_green  transition duration-200 flex gap-2 items-center"
                  }
                >
                  <FiUsers />
                  Dashboard
                </NavLink>
              </li>
              <li className="flex gap-2">
                <NavLink
                  to={"/app/instutitions"}
                  className={({ isActive }) =>
                    isActive
                      ? "px-2 py-2 w-full bg-effect_green font-normal rounded-md flex gap-2 items-center"
                      : "px-2 py-2 w-full font-normal  hover:rounded-md  hover:bg-effect_green  transition duration-200 flex gap-2 items-center"
                  }
                >
                  <FiUsers />
                  Institutions
                </NavLink>
              </li>
              <li className="flex gap-2">
                <NavLink
                  to={"/app/reports"}
                  className={({ isActive }) =>
                    isActive
                      ? "px-2 py-2 w-full bg-effect_green font-normal rounded-md flex gap-2 items-center"
                      : "px-2 py-2 w-full font-normal  hover:rounded-md  hover:bg-effect_green  transition duration-200 flex gap-2 items-center"
                  }
                >
                  <FiUsers />
                  Reports{" "}
                </NavLink>
              </li>
              <li className="flex gap-2">
                <NavLink
                  to={"/app/users"}
                  className={({ isActive }) =>
                    isActive
                      ? "px-2 py-2 w-full bg-effect_green font-normal rounded-md flex gap-2 items-center"
                      : "px-2 py-2 w-full font-normal  hover:rounded-md  hover:bg-effect_green  transition duration-200 flex gap-2 items-center"
                  }
                >
                  <FiUsers />
                  Users
                </NavLink>
              </li>
              <li className="flex gap-2">
                <NavLink
                  to={"/app/leaderboard"}
                  className={({ isActive }) =>
                    isActive
                      ? "px-2 py-2 w-full bg-effect_green font-normal rounded-md flex gap-2 items-center"
                      : "px-2 py-2 w-full font-normal  hover:rounded-md  hover:bg-effect_green  transition duration-200 flex gap-2 items-center"
                  }
                >
                  <FiUsers />
                  Leaderboard{" "}
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-2">
          <NavLink
            to={"/app/settings"}
            className={({ isActive }) =>
              isActive
                ? "px-2 py-2 pb-3 w-full bg-effect_green font-normal rounded-md flex gap-2 items-center"
                : "px-2 py-2 pb-3 w-full font-normal  hover:rounded-md  hover:bg-effect_green  transition duration-200 flex gap-2 items-center"
            }
          >
            <IoSettingsOutline />
            Settings{" "}
          </NavLink>
          <hr />
          <div className='flex flex-col gap-4 pt-4'>
            <Typography variant={TypographyVariant.BODY_DEFAULT_MEDIUM}>Olivia Rhye <span className='text-gray-500'>(Super Admin)</span></Typography>
            <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "text-error font-bold flex gap-2"
                : "text-error font-bold font-normal hover:text-error transition duration-300 flex gap-3"
            }
          >
            Logout of your account{" "}
            <FiLogOut size={24} className="text-error text-lg" />
          </NavLink>
          </div>
        
        </div>
      </div>

      {/* Main Content Area */}
      <div className=" p-7 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
