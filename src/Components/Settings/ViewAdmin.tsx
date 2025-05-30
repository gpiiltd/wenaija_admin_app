import React, { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import Icon from '../../Assets/svgImages/Svg_icons_and_images'
import {
  resetDeactivateUserDataState,
  resetState,
} from '../../features/rbac/rbacSlice'
import {
  triggerDeactivateUser,
  triggerListASingleUser,
  triggerreactivateUser,
} from '../../features/rbac/rbacThunks'
import { AppDispatch, RootState } from '../../state'
import Breadcrumb from '../Breadcrumb'
import { default as Button, default as ButtonComponent } from '../Button'
import showCustomToast from '../CustomToast'
import GoBack from '../GoBack'
import SelectOption from '../Input/SelectOptions'
import CustomModal from '../Modal'
import StatusToggle from '../Toggle'
import { TypographyVariant } from '../types'
import Typography from '../Typography'
import { rejectOptions, viewAdminData } from './SettingsData'

const ViewAdmin: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenWarning, setIsModalOpenWarning] = useState(false)
  const [adminRole, setAdminRole] = useState(viewAdminData.role)
  const [selectedRole, setSelectedRole] = useState(adminRole)
  const [openStatusModal, setOpenStatusModal] = useState(false)
  const [loadingRole, setLoadingRole] = useState(false)
  const [status, setStatus] = useState<null | boolean>(null)
  const [selectedValue, setSelectedValue] = useState('')
  const [userDetails, setUserDetails] = useState<any>(null)
  const { userId } = useParams<{ userId: string }>()
  const {
    userData,
    error: rbacError,
    message: rbacMessage,
    statusCode: rbacStatusCode,
    deactivateUserData,
  } = useSelector((state: RootState) => state.rbac)

  const handleRoleChange = () => {
    setIsModalOpen(false)
    setIsModalOpenWarning(true)
  }

  const handleRoleChange2 = () => {
    setLoadingRole(true)
    setTimeout(() => {
      setLoadingRole(false)
      setIsModalOpenWarning(false)
    }, 2000)
    setTimeout(() => {
      showCustomToast(
        'Admin role successfully changed',
        `Ekenedulle@gail.com role as been changed to ${selectedRole}`
      )
    }, 2000)
  }
  const getInitials = (email: string): string => {
    if (!email) return ''
    const [firstLetter, secondLetter] = email.slice(0, 2).toUpperCase()
    return `${firstLetter}${secondLetter}`
  }
  const formatDate = (dateString: string): string => {
    if (!dateString) return ''
    return new Date(dateString).toISOString().split('T')[0]
  }
  console.log('USER ID', userId)

  //Deactivate user
  const handleDeactivateUser = async () => {
    if (!userId) return
    console.log('USER ID', userId)
    const payload = {
      id: userId,
      reason: selectedValue,
    }
    await dispatch(triggerDeactivateUser(payload))
  }

  //Handle reactivate user
  const handlereactivateUser = async () => {
    if (!userId) return
    console.log('USER ID', userId)
    const payload = {
      id: userId,
      reason: selectedValue,
    }
    await dispatch(triggerreactivateUser(payload))
  }

  useEffect(() => {
    if (deactivateUserData?.statusCode === 200 && deactivateUserData?.data) {
      console.log('user details', deactivateUserData.data)
      dispatch(triggerListASingleUser(userId!))
      showCustomToast(undefined, `${deactivateUserData.message}`)
      setOpenStatusModal(false)
    }

    if (deactivateUserData?.error && deactivateUserData?.message) {
      console.log('deactivated')
      toast.error(`${deactivateUserData.message}`)
      setOpenStatusModal(false)
    }
    dispatch(resetDeactivateUserDataState())
  }, [deactivateUserData, dispatch, userId])

  //get user by id
  useEffect(() => {
    if (userId) {
      dispatch(triggerListASingleUser(userId))
    }
  }, [dispatch, userId])

  useEffect(() => {
    if (rbacStatusCode === 200 || userData) {
      setUserDetails(userData)
    }
    if (rbacError && rbacMessage) {
      console.log('Error fetching user')
    }
    dispatch(resetState())
  }, [rbacError, rbacMessage, userData, rbacStatusCode, dispatch])

  return (
    <div className="">
      <ToastContainer />
      <GoBack label={`View Admin - ${getInitials(userDetails?.email)}`} />
      <Breadcrumb />

      <div className="flex  justify-between border rounded-lg p-6 mt-8">
        <div className="flex items-center ">
          <div className="w-16 h-16 bg-[#f1fffc] text-[#007A61] rounded-full flex items-center justify-center">
            <span className="text-xl font-bold ">
              {getInitials(userDetails?.email)}
            </span>
          </div>

          <div className="ml-4">
            <Typography
              variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
              className="font-semibold text-dark_gray"
            >
              {userDetails?.email}
            </Typography>

            <section className="flex items-center gap-2 mt-1">
              <div
                className={`w-fit h-fit rounded-xl p-1 ${
                  userDetails?.active
                    ? ' bg-[#F0FEFB]'
                    : 'text-[#DB1B24] bg-[#FFFAEB] '
                }`}
              >
                <Typography
                  variant={TypographyVariant.BODY_SMALL_MEDIUM}
                  className={`text-center ${
                    userDetails?.active
                      ? 'text-primary_green'
                      : 'text-[#DB1B24] '
                  }`}
                >
                  {userDetails?.active ? 'Active' : 'Inactive'}
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
          Date created:
          <span className="text-[#FF725E]">
            {' '}
            {userDetails?.created_at
              ? formatDate(userDetails.created_at)
              : 'Loading...'}
          </span>
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
            <span className="font-semibold">
              {userDetails ? userDetails?.role : 'loading...'}
            </span>
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
          <div className="mt-2 h-[300px] overflow-y-auto">
            <ul className="list-disc list-inside">
              {userDetails?.permissions?.length > 0 ? (
                userDetails.permissions.map(
                  (permission: string, index: number) => (
                    <p key={index} className="text-gray-700 py-3">
                      {permission}
                    </p>
                  )
                )
              ) : (
                <p className="text-gray-500 py-3">
                  No roles assigned to this admin.
                </p>
              )}
            </ul>
          </div>
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
            {['Super Admin', 'Admin', 'Regulator'].map(role => (
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
                  style={{ accentColor: '#007A61' }}
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
              loading={loadingRole}
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
                  userDetails?.active ? 'text-primary_green' : 'text-[#DB1B24] '
                }`}
              >
                {userDetails?.active === true ? 'Active' : 'Inactive'}
              </Typography>
              <Typography
                variant={TypographyVariant.BODY_SMALL_MEDIUM}
                className="text-[#5E5959] font-bold"
              >
                {userDetails?.email} account{' '}
                {status === null
                  ? userDetails?.active
                    ? 'is active'
                    : 'is inactive'
                  : userDetails?.active
                    ? 'would be active'
                    : 'would be inactive'}
              </Typography>
            </div>
            <StatusToggle
              isActive={userDetails?.active === true}
              onToggle={() => {
                setUserDetails((prev: any) => ({
                  ...prev,
                  active: !prev.active,
                }))
                setStatus(prev =>
                  prev === null ? !userDetails?.active : !prev
                )
              }}
            />
          </div>

          {status === userDetails?.active && (
            <div>
              <SelectOption
                label="Select reason"
                options={rejectOptions}
                value={selectedValue}
                onChange={setSelectedValue}
                className="pb-3"
              />

              <div className="flex gap-2 justify-center items-center px-11">
                <ButtonComponent
                  text="Cancel"
                  text_color="#344054"
                  bg_color="transparent"
                  active={true}
                  border_color="#D0D5DD"
                  loading={false}
                  onClick={() => {
                    window.location.reload() // This reloads the entire page
                  }}
                />
                <ButtonComponent
                  text={userDetails?.active ? 'Reactivate' : 'Deactivate'}
                  text_color="#FFFFFF"
                  bg_color="#007A61"
                  active={selectedValue !== ''}
                  loading={deactivateUserData.loading}
                  onClick={
                    userDetails?.active
                      ? handlereactivateUser
                      : handleDeactivateUser
                  }
                />
              </div>
            </div>
          )}
        </div>
      </CustomModal>
    </div>
  )
}

export default ViewAdmin
