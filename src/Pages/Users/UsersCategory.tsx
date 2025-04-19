import React, { useEffect, useState } from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { SlMagnifierAdd } from 'react-icons/sl'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { ToastContainer } from 'react-toastify'
import ButtonComponent from '../../Components/Button'
import Nav from '../../Components/Nav'
import Tooltip from '../../Components/Tooltip'
import { TypographyVariant, UserTab } from '../../Components/types'
import Typography from '../../Components/Typography'
import {
  resetKycState,
  resetUserMgtMetricsState,
} from '../../features/usersManagement/userManagementSlice'
import {
  triggerGetUserManagementMetrics,
  triggerListUsersWithPendingKyc,
} from '../../features/usersManagement/userManagementThunk'
import { AppDispatch, RootState } from '../../state'

const UsersCategory = () => {
  const dispatch: AppDispatch = useDispatch()
  const [activeTab, setActiveTab] = useState<UserTab>('Pending')
  const navigate = useNavigate()
  const { kyc, userManagementMetrics } = useSelector(
    (state: RootState) => state.userManagement
  )
  const totalPages = Math.ceil(kyc.data.count / 10) // assuming 10 items per page
  // const currentPage = kyc.data.next ? parseInt(kyc.data.next.split("=")[1]) : 1;
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    dispatch(triggerListUsersWithPendingKyc({ page: 1 }))
  }, [dispatch])

  const handlePageChange = (page: number) => {
    dispatch(triggerListUsersWithPendingKyc({ page }))
    setCurrentPage(page)
  }

  useEffect(() => {
    dispatch(triggerListUsersWithPendingKyc({ page: 1 }))
  }, [dispatch])

  useEffect(() => {
    if (kyc.statusCode === 200 || kyc.data) {
      console.log('List all users', kyc.data)
      console.log('count**', kyc.data.count)
    }
    if (kyc.error && kyc.message) {
      console.log('Error fetching user')
    }
    dispatch(resetKycState())
  }, [kyc.statusCode, kyc.message, kyc.data, kyc.error, dispatch])

  // get user metrics
  useEffect(() => {
    dispatch(triggerGetUserManagementMetrics({}))
  }, [dispatch])

  useEffect(() => {
    if (
      userManagementMetrics.statusCode === 200 ||
      userManagementMetrics.data
    ) {
      console.log('UMM', userManagementMetrics.data)
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
    <div className="mt-6">
      <ToastContainer />
      <div className="bg-[#F2F4F7] py-3 px-5 rounded-lg w-fit mt-3">
        <Nav
          tabs={[
            {
              key: 'Pending',
              label: 'Pending',
              count: userManagementMetrics?.data?.status?.pending || 0,
            },
            {
              key: 'Enabled',
              label: 'Enabled',
              count: userManagementMetrics?.data?.status?.enabled || 0,
            },
            {
              key: 'Disabled',
              label: 'Disabled',
              count: userManagementMetrics?.data?.status?.disabled || 0,
            },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          activeStyle={{
            color: 'black',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '6px 8px',
          }}
          inactiveStyle={{
            color: 'gray',
            padding: '6px 8px',
          }}
          helperStyle={{
            backgroundColor: '#F2F4F7',
            padding: '2px 6px',
            width: 'fit',
            height: 'fit',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
            display: 'flex',
            borderRadius: '25%',
          }}
        />
      </div>
      <div className="mt-4">
        <table className="w-full border-b border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#F9FAFB] text-left text-l_gray text-sm font-title border-b border-gray-300">
              <th className="p-2 border-b border-gray-300">No</th>
              {activeTab === 'Pending' && (
                <th className="p-4 border-b border-gray-300">Name</th>
              )}
              {activeTab === 'Pending' && (
                <th className="p-4 border-b border-gray-300">
                  Identity card submitted
                </th>
              )}
              {activeTab === 'Pending' && (
                <th className="p-4 border-b border-gray-300">Date of Birth</th>
              )}
              {activeTab === 'Pending' && (
                <th className="p-4 border-b border-gray-300">
                  Submission date
                </th>
              )}

              {/* enabled */}
              {activeTab === 'Enabled' && (
                <th className="p-4 border-b border-gray-300">Name and Email</th>
              )}
              {activeTab === 'Enabled' && (
                <th className="p-4 border-b border-gray-300">
                  No of task completed
                </th>
              )}
              {activeTab === 'Enabled' && (
                <th className="p-4 border-b border-gray-300">Star Points</th>
              )}
              {activeTab === 'Enabled' && (
                <th className="p-4 border-b border-gray-300">
                  Registration date
                </th>
              )}

              {/* disabled */}

              {activeTab === 'Disabled' && (
                <th className="p-4 border-b border-gray-300">Name & Email</th>
              )}
              {activeTab === 'Disabled' && (
                <th className="p-4 border-b border-gray-300">
                  No of task completed
                </th>
              )}
              {activeTab === 'Disabled' && (
                <th className="p-4 border-b border-gray-300">Date Disabled</th>
              )}
              {activeTab === 'Disabled' && (
                <th className="p-4 border-b border-gray-300">Reason</th>
              )}
            </tr>
          </thead>
          <tbody className="text-[#101828] text-sm font-title">
            {activeTab === 'Pending' && (
              <>
                {kyc.loading ? (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-gray-500">
                      Loading users...
                    </td>
                  </tr>
                ) : Array.isArray(kyc.data.results) &&
                  kyc.data.results.length > 0 ? (
                  kyc.data.results
                    .filter((user: any) => user.kyc_status === 'pending')
                    .map((user: any, index: number) => (
                      <tr
                        key={user.identifier}
                        className="border-b border-gray-300"
                      >
                        <td className="p-4">{index + 1}</td>
                        <td className="p-4">
                          {user.first_name} {user.last_name}
                        </td>
                        <td className="p-4 capitalize">
                          {user.id_type ? user.id_type : 'ID not provided'}
                        </td>
                        <td className="p-4">
                          {user.date_of_birth
                            ? user.date_of_birth
                            : 'DOB not provided'}
                        </td>
                        <td className="p-4 text-error flex items-center justify-between">
                          {user.kyc_submission_date
                            ? new Date(
                                user.kyc_submission_date
                              ).toLocaleDateString()
                            : 'Not submitted'}
                          <div>
                            <ButtonComponent
                              icon={<SlMagnifierAdd />}
                              text="Review"
                              text_color="#FFFFFF"
                              bg_color="#007A61"
                              active={true}
                              loading={false}
                              onClick={() => {
                                navigate(
                                  `/app/users/validate-kyc/${user.identifier}`
                                )
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-gray-500">
                      No pending users found.
                    </td>
                  </tr>
                )}
              </>
            )}

            {activeTab === 'Enabled' && (
              <>
                {Array.isArray(kyc.data.results) &&
                  kyc.data.results
                    .filter((user: any) => user.kyc_status === 'approved') // Filter for enabled users
                    .map((user: any, index: number) => (
                      <tr
                        key={user.identifier}
                        className="border-b border-gray-300"
                      >
                        <td className="p-4">{index + 1}</td>
                        <td className="p-4 flex flex-col">
                          {user.first_name} {user.last_name}
                          <div className="text-[#667085]">{user.email}</div>
                        </td>
                        <td className="p-4">
                          {user.loading ? 'loading...' : user.tasks_submitted}
                        </td>

                        <td className="p-4 text-orange font-semibold">
                          {user.star_points} SP
                        </td>
                        <td className="p-4">
                          {user.date_of_birth
                            ? new Date(user.date_of_birth).toLocaleDateString()
                            : 'DOB not provided'}
                        </td>
                        <td className="p-4 flex items-center justify-between">
                          <Tooltip
                            tooltip="View Profile"
                            className="max-w-[150px] whitespace-nowrap"
                          >
                            <div className="hover:text-primary_green cursor-pointer">
                              <HiOutlineDotsVertical
                                onClick={() =>
                                  navigate(
                                    `/app/users/profile/${user.identifier}`
                                  )
                                }
                              />
                            </div>
                          </Tooltip>
                        </td>
                      </tr>
                    ))}
              </>
            )}
            {activeTab === 'Disabled' && (
              <>
                {Array.isArray(kyc.data.results) &&
                kyc.data.results.filter(
                  (user: any) => user.kyc_status === 'rejected'
                ).length > 0 ? (
                  kyc.data.results
                    .filter((user: any) => user.kyc_status === 'rejected')
                    .map((user: any, index: number) => (
                      <tr
                        key={user.identifier}
                        className="border-b border-gray-300"
                      >
                        <td className="p-4">{index + 1}</td>
                        <td className="p-4 flex flex-col">
                          {user.first_name} {user.last_name}
                          <div className="text-[#667085]">{user.email}</div>
                        </td>
                        <td className="p-4">
                          {user.loading ? 'loading...' : user.tasks_submitted}
                        </td>
                        <td className="p-4">
                          {user.disabled_date ? user.disabled_date : 'pending'}
                        </td>
                        <td className="p-4 flex items-center justify-between">
                          <p className="text-orange font-title">
                            {user.disable_account_reason
                              ? user.disable_account_reason
                              : 'N/A'}
                          </p>
                          <Tooltip
                            tooltip="View Profile"
                            className="max-w-[150px] whitespace-nowrap"
                          >
                            <div className="hover:text-primary_green cursor-pointer">
                              <HiOutlineDotsVertical
                                onClick={() =>
                                  navigate(
                                    `/app/users/profile/${user.identifier}`
                                  )
                                }
                              />
                            </div>
                          </Tooltip>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center p-4 text-gray-500">
                      No user found
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
        <div className="flex justify-between items-center w-full border-t pt-2">
          <button
            className="border py-2 px-3 rounded"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!kyc.data?.previous}
          >
            Previous
          </button>

          <Typography
            variant={TypographyVariant.NORMAL}
            className="text-[#344054]"
          >
            Page {currentPage} of {totalPages}
          </Typography>

          <button
            className="border py-2 px-3 rounded"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!kyc.data?.next}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default UsersCategory
