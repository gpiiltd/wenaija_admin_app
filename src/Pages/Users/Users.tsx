import React, { useEffect } from 'react'
import { HiOutlineDocumentReport } from 'react-icons/hi'
import { LuUsers } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../../Components/Card'
import FloatingBarChart from '../../Components/Graph'
import { TypographyVariant } from '../../Components/types'
import Typography from '../../Components/Typography'
import { resetUserMgtMetricsState } from '../../features/usersManagement/userManagementSlice'
import { triggerGetUserManagementMetrics } from '../../features/usersManagement/userManagementThunk'
import { AppDispatch, RootState } from '../../state'
import { StatCard } from './Helpers'
import UsersCategory from './UsersCategory'

const Users = () => {
  const dispatch: AppDispatch = useDispatch()
  const { userManagementMetrics } = useSelector(
    (state: RootState) => state.userManagement
  )
  //get user metrics
  useEffect(() => {
    dispatch(triggerGetUserManagementMetrics({}))
  }, [dispatch])

  useEffect(() => {
    if (
      userManagementMetrics.statusCode === 200 ||
      userManagementMetrics.data
    ) {
      console.log('List users***', userManagementMetrics.data)
    }
    if (userManagementMetrics.error && userManagementMetrics.message) {
      console.log('Error fetching user')
    }
    dispatch(resetUserMgtMetricsState())
  }, [
    dispatch,
    userManagementMetrics.data,
    userManagementMetrics.error,
    userManagementMetrics.message,
    userManagementMetrics.statusCode,
  ])

  return (
    <div className="pb-24">
      <Typography variant={TypographyVariant.TITLE}>Users</Typography>
      <Typography variant={TypographyVariant.NORMAL} className="text-l_gray">
        Manage user registration
      </Typography>

      <section className="flex w-full gap-3">
        <div className="mt-11 flex flex-col gap-7 h-fit">
          <StatCard
            title="Total Users Registered"
            value={userManagementMetrics?.data?.total_users || 0}
            icon={<LuUsers />}
            color="#ED7D31"
          />

          <Card titleLeft={undefined} titleRight={undefined} className="p-4">
            <div className="flex flex-col gap-5">
              <Typography
                variant={TypographyVariant.SUBTITLE}
                className="text-l_gray"
              >
                STATUS
              </Typography>
              <section className="flex items-center gap-4">
                <div className="flex flex-col  gap-1">
                  <div className="flex  items-center gap-2">
                    <LuUsers color="#007A61" />
                    <Typography
                      variant={TypographyVariant.SMALL}
                      className="text-l_gray font-semibold"
                    >
                      Enable
                    </Typography>
                  </div>
                  <Typography
                    variant={TypographyVariant.BODY_SMALL_MEDIUM}
                    className="text-[#2D3648] font-semibold"
                  >
                    {userManagementMetrics?.data?.status?.enabled || 0}
                  </Typography>
                </div>

                <div className="flex flex-col  gap-1">
                  <div className="flex  items-center gap-2">
                    <LuUsers color="#D41A1A" />
                    <Typography
                      variant={TypographyVariant.SMALL}
                      className="text-l_gray font-semibold"
                    >
                      Disabled{' '}
                    </Typography>
                  </div>
                  <Typography
                    variant={TypographyVariant.BODY_SMALL_MEDIUM}
                    className="text-[#2D3648] font-semibold"
                  >
                    {userManagementMetrics?.data?.status?.disabled || 0}
                  </Typography>
                </div>

                <div className="flex flex-col  gap-1">
                  <div className="flex  items-center gap-2">
                    <LuUsers color="#BF56D9" />
                    <Typography
                      variant={TypographyVariant.SMALL}
                      className="text-l_gray font-semibold"
                    >
                      Pending
                    </Typography>
                  </div>
                  <Typography
                    variant={TypographyVariant.BODY_SMALL_MEDIUM}
                    className="text-[#2D3648] font-semibold"
                  >
                    {userManagementMetrics?.data?.status?.pending || 0}
                  </Typography>
                </div>
              </section>
            </div>
          </Card>
        </div>

        <div className="p-6 border rounded-md mt-11  flex-1 ">
          <FloatingBarChart
            tabs={[
              {
                key: 'Users',
                label: 'Users',
                icon: <HiOutlineDocumentReport />,
              },
            ]}
          />{' '}
        </div>
      </section>
      <section className="pt-6">
        <div className="flex gap-2 items-center">
          <Typography variant={TypographyVariant.TITLE}>All users</Typography>
          <div className="bg-highlight_green p-2 w-10 h-5 rounded-full flex items-center justify-center">
            <Typography
              variant={TypographyVariant.SMALL}
              className="text-primary_green font-semibold "
            >
              {userManagementMetrics?.data?.total_users || 0}
            </Typography>
          </div>
        </div>
        <Typography variant={TypographyVariant.NORMAL} className="text-l_gray ">
          See the list and information of all users on the platform
        </Typography>
      </section>
      <UsersCategory />
    </div>
  )
}

export default Users
