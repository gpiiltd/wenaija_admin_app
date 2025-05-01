import React from 'react'
import { FiArrowUpRight, FiUserPlus } from 'react-icons/fi'
import { HiOutlineDocumentReport } from 'react-icons/hi'
import { LuUsers } from 'react-icons/lu'
import { TbReportMedical } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { ClipLoader } from 'react-spinners'
import Icon from '../../Assets/svgImages/Svg_icons_and_images'
import Card from '../../Components/Card'
import FloatingBarChart from '../../Components/Graph'
import LocationDistribution from '../../Components/LocationDistribution'
import RecentlyAddedInstitutes from '../../Components/RecentlyAddedInstitutes'
import TopContributors from '../../Components/TopContributors'
import TopRankingInstitute from '../../Components/TopRankingInstitute'
import { TypographyVariant } from '../../Components/types'
import Typography from '../../Components/Typography'
import { triggerGetDashboardData } from '../../features/dashboard/dashboardThunk'
import { AppDispatch, RootState } from '../../state'

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const { data, loading } = useSelector(
    (state: RootState) => state.dashboard.dashboardData
  )

  React.useEffect(() => {
    dispatch(triggerGetDashboardData({}))
  }, [dispatch])

  if (loading || !data) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <ClipLoader color="#007a61" size={50} />
      </div>
    )
  }

  return (
    <div className="pb-12">
      <Typography variant={TypographyVariant.TITLE}>Dashboard</Typography>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {/* Card 1 */}
        <Card titleLeft={undefined} titleRight={undefined} className="p-4 ">
          <div className="flex flex-col gap-5">
            <Typography
              variant={TypographyVariant.SUBTITLE}
              className="text-l_gray"
            >
              PENDING ITEMS
            </Typography>
            <section className="flex items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <FiUserPlus color="#ED7D31" />
                  <Typography
                    variant={TypographyVariant.SMALL}
                    className="text-l_gray font-semibold"
                  >
                    New Users
                  </Typography>
                </div>
                <div className="flex items-center justify-between">
                  <Typography
                    variant={TypographyVariant.BODY_SMALL_MEDIUM}
                    className="text-['#2D3648'] font-semibold"
                  >
                    {data.metrics.new_users}
                  </Typography>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => navigate('/app/users')}
                  >
                    <Typography
                      variant={TypographyVariant.SMALL}
                      className="text-primary_green font-semibold"
                    >
                      View
                    </Typography>
                    <FiArrowUpRight color="#007A61" />
                  </div>
                </div>
              </div>

              <div className="h-6 border-l border-gray-300"></div>
              <div>
                <div className="flex items-center gap-2">
                  <TbReportMedical color="#007A61" />
                  <Typography
                    variant={TypographyVariant.SMALL}
                    className="text-l_gray font-semibold"
                  >
                    New Reports
                  </Typography>
                </div>
                <div className="flex items-center justify-between">
                  <Typography
                    variant={TypographyVariant.BODY_SMALL_MEDIUM}
                    className="text-['#2D3648'] font-semibold"
                  >
                    {data.metrics.new_reports}
                  </Typography>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => navigate('/app/reports')}
                  >
                    <Typography
                      variant={TypographyVariant.SMALL}
                      className="text-primary_green font-semibold"
                    >
                      View
                    </Typography>
                    <FiArrowUpRight color="#007A61" />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Card>
        {/* Card 2 */}
        <Card titleLeft={undefined} titleRight={undefined} className="p-3">
          <div className="flex flex-col gap-5">
            <section className="flex justify-between items-center">
              <Typography
                variant={TypographyVariant.SUBTITLE}
                className="text-l_gray w-2/3"
              >
                Total Reports Submitted
              </Typography>
              <Icon
                type="sticky_note"
                className="outline-blue-500 fill-current"
              />
            </section>

            <section>
              <Typography
                variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                className="text-['#2D3648'] font-semibold"
              >
                {data.metrics.total_reports_submitted}
              </Typography>
            </section>
          </div>
        </Card>
        {/* Card 3 */}
        <Card titleLeft={undefined} titleRight={undefined} className="p-3">
          <div className="flex flex-col gap-5">
            <section className="flex justify-between items-center">
              <Typography
                variant={TypographyVariant.SUBTITLE}
                className="text-l_gray w-2/3"
              >
                Total Users Registered
              </Typography>
              <LuUsers color="#ED7D31" />
            </section>
            <section>
              <Typography
                variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                className="text-['#2D3648'] font-semibold"
              >
                {data.metrics.total_registered_users}
              </Typography>
            </section>
          </div>
        </Card>
        {/* Card 4 */}
        <Card titleLeft={undefined} titleRight={undefined} className="p-3">
          <div className="flex flex-col gap-5">
            <section className="flex justify-between items-center">
              <Typography
                variant={TypographyVariant.SUBTITLE}
                className="text-l_gray w-2/3"
              >
                Total Listed Institutions
              </Typography>
              <Icon type="book_stack" />
            </section>

            <section>
              <Typography
                variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                className="text-['#2D3648'] font-semibold"
              >
                {data.metrics.total_listed_institutions}
              </Typography>
            </section>
          </div>
        </Card>
      </section>
      <section className="flex w-full gap-3 mt-11">
        <div className="p-6 border rounded-md w-3/5">
          <FloatingBarChart
            tabs={[
              {
                key: 'reports',
                label: 'Reports',
                icon: <HiOutlineDocumentReport />,
              },
              { key: 'users', label: 'Users', icon: <LuUsers /> },
            ]}
          />{' '}
        </div>
        <div className="p-6 border rounded-md w-2/5">
          <TopContributors
            top_contributors={data.top_contributors.top_contributors}
          />
        </div>
      </section>
      <div className="pt-6">
        <TopRankingInstitute
          topRankingInstitutes={data.top_ranking_institutes}
        />
      </div>

      <section className="grid gap-5 grid-cols-2 mt-6">
        <RecentlyAddedInstitutes institutes={data.recently_added_institutes} />
        <LocationDistribution
          distribution={data.institutes_location_distribution}
        />
      </section>
    </div>
  )
}

export default Dashboard
