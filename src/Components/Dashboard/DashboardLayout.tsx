// import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { FiLogOut, FiUsers } from 'react-icons/fi'
import { IoSettingsOutline } from 'react-icons/io5'
import { NavLink, Outlet } from 'react-router'
import Icon from '../../Assets/svgImages/Svg_icons_and_images'
import { OTPService } from '../../features/auth/authService'
import Button from '../Button'
import CustomModal from '../Modal'
import { TypographyVariant } from '../types'
import Typography from '../Typography'

const DashboardLayout = () => {
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userType, setUserType] = useState(null)

  const handleLogout = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      localStorage.removeItem('nssf_user_token')
      localStorage.removeItem('nssf_refresh_token')
      window.location.href = '/'
    }, 2000)
  }

  useEffect(() => {
    const token = OTPService._getAccessToken()
    if (token) {
      const base64Payload = token.split('.')[1]
      const payload = atob(base64Payload)
      const decodedToken = JSON.parse(payload)
      setUserType(decodedToken.metadata.role)
    }
  }, [])
  return (
    <div className="grid grid-cols-[300px_1fr] h-screen">
      <div className="flex flex-col justify-between h-full pb-48 border-r px-5">
        <div className="flex flex-col pt-6">
          <Icon
            type="logo"
            className="w-fit cursor-pointer "
            click={() => window.location.reload()}
          />
          <nav className="pt-8 text-dark_gray">
            <ul className="space-y-3 text-lg">
              <li>
                <NavLink
                  to={'dashboard'}
                  className={({ isActive }) =>
                    isActive
                      ? 'px-2 py-2 w-full bg-effect_green font-normal rounded-md flex gap-2 items-center'
                      : 'px-2 py-2 w-full font-normal  hover:rounded-md  hover:bg-effect_green  transition duration-200 flex gap-2 items-center'
                  }
                >
                  <Icon
                    type="dashboard"
                    className="w-fit cursor-pointer "
                    click={() => window.location.reload()}
                  />{' '}
                  Dashboard
                </NavLink>
              </li>
              <li className="flex gap-2">
                <NavLink
                  to={'/app/instutitions'}
                  className={({ isActive }) =>
                    isActive
                      ? 'px-2 py-2 w-full bg-effect_green font-normal rounded-md flex gap-2 items-center'
                      : 'px-2 py-2 w-full font-normal  hover:rounded-md  hover:bg-effect_green  transition duration-200 flex gap-2 items-center'
                  }
                >
                  <Icon
                    type="institutions"
                    className="w-fit cursor-pointer "
                    click={() => window.location.reload()}
                  />
                  Institutions
                </NavLink>
              </li>
              <li className="flex gap-2">
                <NavLink
                  to={'/app/reports'}
                  className={({ isActive }) =>
                    isActive
                      ? 'px-2 py-2 w-full bg-effect_green font-normal rounded-md flex gap-2 items-center'
                      : 'px-2 py-2 w-full font-normal  hover:rounded-md  hover:bg-effect_green  transition duration-200 flex gap-2 items-center'
                  }
                >
                  <Icon
                    type="reports"
                    className="w-fit cursor-pointer "
                    click={() => window.location.reload()}
                  />{' '}
                  Reports{' '}
                </NavLink>
              </li>
              <li className="flex gap-2">
                <NavLink
                  to={'/app/users'}
                  className={({ isActive }) =>
                    isActive
                      ? 'px-2 py-2 w-full bg-effect_green font-normal rounded-md flex gap-2 items-center'
                      : 'px-2 py-2 w-full font-normal  hover:rounded-md  hover:bg-effect_green  transition duration-200 flex gap-2 items-center'
                  }
                >
                  <FiUsers />
                  Users
                </NavLink>
              </li>
              <li className="flex gap-2">
                <NavLink
                  to={'/app/leaderboard'}
                  className={({ isActive }) =>
                    isActive
                      ? 'px-2 py-2 w-full bg-effect_green font-normal rounded-md flex gap-2 items-center'
                      : 'px-2 py-2 w-full font-normal  hover:rounded-md  hover:bg-effect_green  transition duration-200 flex gap-2 items-center'
                  }
                >
                  <Icon
                    type="leaderboard"
                    className="w-fit cursor-pointer "
                    click={() => window.location.reload()}
                  />{' '}
                  Leaderboard{' '}
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-2">
          <NavLink
            to={'/app/settings'}
            className={({ isActive }) =>
              isActive
                ? ' text-dark_gray px-2 py-2 pb-3 w-full bg-effect_green font-normal rounded-md flex gap-2 items-center'
                : 'text-dark_gray px-2 py-2 pb-3 w-full font-normal  hover:rounded-md  hover:bg-effect_green  transition duration-200 flex gap-2 items-center'
            }
          >
            <IoSettingsOutline />
            Settings{' '}
          </NavLink>
          <hr />
          <div className="flex flex-col gap-4 pt-4">
            <Typography variant={TypographyVariant.BODY_DEFAULT_MEDIUM}>
              <span className="text-gray-500">({userType})</span>
            </Typography>
            <div
              className="text-error font-bold transition duration-300 flex gap-3 cursor-pointer"
              onClick={() => setOpenModal(true)}
            >
              Logout of your account{' '}
              <FiLogOut size={24} className="text-error text-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className=" p-5 overflow-y-auto">
        <Outlet />
      </div>

      <CustomModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        width="200"
        height="fit"
      >
        <div className="px-5 py-3 pb-5">
          <Typography
            variant={TypographyVariant.SUBTITLE}
            className="text-[#5E5959] text-center"
          >
            Are you sure you want to LOGOUT?
          </Typography>

          <div className="flex justify-center mt-4 gap-2">
            <div className="w-[7rem] mr-2">
              <Button
                text="Cancel"
                active={true}
                border_color="#D0D5DD"
                bg_color="#FFFFFF"
                text_color="#344054"
                loading={false}
                onClick={() => {
                  setOpenModal(false)
                }}
              />
            </div>

            <div className="w-[7rem]">
              <Button
                text="Yes"
                active={true}
                bg_color="#007A61"
                text_color="white"
                loading={loading}
                onClick={handleLogout}
              />
            </div>
          </div>
        </div>
      </CustomModal>
    </div>
  )
}

export default DashboardLayout
