import React, { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { TbReport } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import Icon from '../../Assets/svgImages/Svg_icons_and_images'
import Breadcrumb from '../../Components/Breadcrumb'
import ButtonComponent from '../../Components/Button'
import Card from '../../Components/Card'
import showCustomToast from '../../Components/CustomToast'
import GoBack from '../../Components/GoBack'
import SelectOption from '../../Components/Input/SelectOptions'
import CustomModal from '../../Components/Modal'
import Nav from '../../Components/Nav'
import ProgressBar from '../../Components/ProgressBar'
import StatusToggle from '../../Components/Toggle'
import { TypographyVariant } from '../../Components/types'
import Typography from '../../Components/Typography'
import { resetUpdateUserStatusState } from '../../features/usersManagement/userManagementSlice'
import {
  triggerUpdateUserStatus,
  triggerViewUserProfile,
} from '../../features/usersManagement/userManagementThunk'
import { AppDispatch, RootState } from '../../state'
import { InfoItem, tabContent, TabKey } from './Helpers'

const options = [
  { value: 'Campaign is over', label: 'Campaign is over' },
  { value: 'User violated rules', label: 'User violated rules' },
  { value: 'Campaingn started ', label: 'Campaingn started' },
]

const ViewUserProfile = () => {
  const dispatch: AppDispatch = useDispatch()
  const [activeTab, setActiveTab] = useState<TabKey>('Basic information')
  const [openModal, setOpenModal] = useState(false)
  const { userId } = useParams<{ userId: string }>()
  const [selectedValue, setSelectedValue] = useState('')
  const { kyc, userStatusUpdate } = useSelector(
    (state: RootState) => state.userManagement
  )
  const [toggle, setToggle] = useState(kyc.data?.is_disabled ?? false)
  const [hasInteracted, setHasInteracted] = useState(false)

  const handleToggle = () => {
    setToggle((prev: boolean) => !prev)
    setHasInteracted(true)
  }

  useEffect(() => {
    if (userId) {
      dispatch(triggerViewUserProfile(userId))
    }
  }, [dispatch, userId])

  useEffect(() => {
    if (kyc.statusCode === 200 || kyc.data) {
      console.log('verified user seen', JSON.stringify(kyc.data, null, 2))
    }
    if (kyc.error && kyc.message) {
      console.log('Error fetching user')
    }
  }, [kyc.statusCode, kyc.message, kyc.data, kyc.error])

  const handleRejectKyc = async () => {
    if (!userId) return
    const payload = {
      id: userId,
      reason: selectedValue!,
    }
    await dispatch(triggerUpdateUserStatus(payload))
  }

  useEffect(() => {
    if (userStatusUpdate?.statusCode === 200 && userStatusUpdate?.data) {
      showCustomToast('Success', userStatusUpdate.message)
      setToggle(false)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    }
    if (userStatusUpdate?.error && userStatusUpdate?.message) {
      toast.error(userStatusUpdate.message)
    }
    dispatch(resetUpdateUserStatusState())
  }, [
    dispatch,
    userStatusUpdate?.data,
    userStatusUpdate?.error,
    userStatusUpdate.message,
    userStatusUpdate?.statusCode,
  ])
  return (
    <>
      <ToastContainer />
      <GoBack
        label={`View User - ${
          kyc.loading
            ? 'loading...'
            : `${kyc.data.first_name} ${kyc.data.last_name}`
        }`}
      />{' '}
      <Breadcrumb />
      <div className="flex gap-7 pt-4">
        <Card titleLeft={undefined} titleRight={undefined} className="flex-1">
          <div className="flex gap-4  p-6">
            <div className="w-fit h-fit rounded-full p-4 bg-[#F0FEFB]">
              <Typography
                variant={TypographyVariant.SUBTITLE}
                className="text-primary_green text-center"
              >
                {kyc.loading
                  ? '...'
                  : `${kyc.data.first_name?.[0] ?? ''}${
                      kyc.data.last_name?.[0] ?? ''
                    }`.toUpperCase()}
              </Typography>
            </div>
            <section>
              <div>
                <Typography
                  variant={TypographyVariant.SUBTITLE}
                  className="text-l_gray text-center"
                >
                  {kyc.loading
                    ? 'loading...'
                    : `${kyc.data.first_name} ${kyc.data.last_name}`}
                </Typography>
                <Typography
                  variant={TypographyVariant.BODY_SMALL_MEDIUM}
                  className="text-l_gray "
                >
                  {kyc.loading
                    ? 'loading...'
                    : `${kyc.data.first_name} ${kyc.data.last_name}`}
                </Typography>
              </div>

              <section className="flex items-center gap-2 mt-5">
                <div
                  className={`w-fit h-fit rounded-xl p-1 ${
                    kyc.data.is_disabled
                      ? 'text-[#DB1B24] bg-[#FFFAEB] '
                      : ' bg-[#F0FEFB]'
                  }`}
                >
                  <Typography
                    variant={TypographyVariant.BODY_SMALL_MEDIUM}
                    className={`text-center ${
                      kyc.data.is_disabled
                        ? 'text-[#DB1B24] '
                        : 'text-primary_green'
                    }`}
                  >
                    {kyc.data.is_disabled ? 'Inactive' : 'Active'}
                  </Typography>
                </div>
                <FiEdit
                  color="#007A61"
                  cursor="pointer"
                  onClick={() => setOpenModal(true)}
                />
              </section>
            </section>
          </div>
        </Card>

        {/* second  card */}
        <Card
          titleLeft={undefined}
          titleRight={undefined}
          className="flex-1 bg-[#007A61]"
        >
          <div className="p-6 bg-[#007A61]">
            <section>
              <div>
                <Typography
                  variant={TypographyVariant.SUBTITLE}
                  className="text-[#FFFFFF] "
                >
                  {kyc.loading
                    ? 'loading...'
                    : `Rank ${kyc.data.rank ? kyc.data.rank : 'N/A'}`}
                </Typography>
                <section className="flex justify-between pt-6">
                  <div className="flex items-center gap-2">
                    <Icon type="userBadge" />
                    <Typography
                      variant={TypographyVariant.SUBTITLE}
                      className="text-[#FFFFFF] "
                    >
                      {kyc.loading ? 'loading...' : `${kyc.data.badge_level}`}
                    </Typography>
                  </div>
                  <div className="h-10 border-l border-gray-300"></div>

                  <div className="w-fit h-fit bg-[#FFFFFF] p-1 rounded-3xl flex items-center gap-2">
                    <Icon type="startPoints" />

                    <Typography
                      variant={TypographyVariant.SUBTITLE}
                      className="text-orange "
                    >
                      {kyc.loading
                        ? 'loading...'
                        : `${kyc.data.star_points} star points`}
                    </Typography>
                  </div>
                  <div className="h-10 border-l border-gray-300"></div>

                  <div className="flex items-center gap-2">
                    <TbReport size={26} color="white" />

                    <Typography
                      variant={TypographyVariant.SUBTITLE}
                      className="text-[#FFFFFF] "
                    >
                      {kyc.loading
                        ? 'loading...'
                        : `${kyc.data.reports_completed}  Reports completed`}
                    </Typography>
                  </div>
                </section>
              </div>
            </section>
            <div className="pt-4">
              <ProgressBar
                percentage={kyc.data.star_points}
                bgColor="#ED7D31"
                textColor="white"
                label="Level 1"
              />
            </div>
          </div>
        </Card>
      </div>
      {/* nav */}
      <div>
        <section className="mt-5">
          {/* Navigation Tabs */}
          <div className="border-b">
            <Nav
              tabs={Object.keys(tabContent).map(key => ({ key, label: key }))}
              activeTab={activeTab}
              onTabChange={tab => setActiveTab(tab as TabKey)}
              activeStyle={{
                color: '#007A61',
                padding: '6px 8px',
                borderBottom: '2px solid #007A61',
              }}
              inactiveStyle={{
                color: '#5E5959',
                padding: '6px 8px',
              }}
            />
          </div>
          {/* User Info  */}
          <Card titleLeft={undefined} titleRight={undefined} className="mt-6">
            <div className="p-4">
              <Typography
                variant={TypographyVariant.SUBTITLE}
                className="font-bold"
              >
                {tabContent[activeTab]?.title}
              </Typography>
              <section
                className={`grid ${tabContent[activeTab].gridCols} pt-4`}
              >
                {'data' in tabContent[activeTab]
                  ? tabContent[activeTab].data?.map(
                      (field: any, index: number) => (
                        <InfoItem
                          key={index}
                          label={field.label}
                          value={field.value(kyc.data)}
                        />
                      )
                    )
                  : tabContent[activeTab].fields?.map(
                      (field: any, index: number) => (
                        <InfoItem
                          key={index}
                          label={field.label}
                          value={field.value(kyc.data)}
                        />
                      )
                    )}
              </section>
            </div>
          </Card>
        </section>
        <CustomModal
          isOpen={openModal}
          onClose={() => setOpenModal(!openModal)}
          width="40%"
          height="fit"
        >
          <div className="flex gap-4 flex-col pb-16 px-24">
            <Typography
              variant={TypographyVariant.TITLE}
              className="text-center"
            >
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
                    kyc.data.is_disabled === true
                      ? 'text-[#DB1B24] '
                      : 'text-primary_green'
                  }`}
                >
                  {kyc.data.is_disabled === true ? 'Inactive' : 'Active'}
                </Typography>
                <Typography
                  variant={TypographyVariant.BODY_SMALL_MEDIUM}
                  className="text-[#5E5959] font-bold"
                >
                  {kyc.loading
                    ? 'Loading...'
                    : hasInteracted && toggle !== kyc.data.is_disabled
                      ? `${kyc.data.first_name} ${kyc.data.last_name}  ${toggle ? ' will be inactive' : ' will be active'}`
                      : `${kyc.data.first_name} ${kyc.data.last_name}  ${kyc.data.is_disabled ? 'is inactive' : 'is active'}`}
                </Typography>
              </div>
              <StatusToggle isActive={!toggle} onToggle={handleToggle} />
            </div>

            {toggle && (
              <SelectOption
                label="Select reason"
                options={options}
                value={selectedValue}
                onChange={setSelectedValue}
                className="pb-3"
              />
            )}

            {toggle && (
              <div className="flex gap-2 justify-center items-center px-11">
                <ButtonComponent
                  text="Cancel"
                  text_color="#344054"
                  bg_color="transparent"
                  active
                  border_color="#D0D5DD"
                  loading={false}
                  onClick={() => setOpenModal(false)}
                />
                <ButtonComponent
                  text="Approve"
                  text_color="#FFFFFF"
                  bg_color="#007A61"
                  active={true}
                  loading={userStatusUpdate.loading}
                  onClick={handleRejectKyc}
                />
              </div>
            )}
          </div>
        </CustomModal>
      </div>
    </>
  )
}

export default ViewUserProfile
