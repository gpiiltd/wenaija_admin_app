import React from "react";
import Typography from "../../Components/Typography";
import { TypographyVariant } from "../../Components/types";
import Card from "../../Components/Card";
import { FiUserPlus } from "react-icons/fi";
import { FiArrowUpRight } from "react-icons/fi";
import { TbReportMedical } from "react-icons/tb";
import { LuUsers } from "react-icons/lu";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import FloatingBarChart from "../../Components/Graph";
import TopContributors from "../../Components/TopContributors";
import TopRankingInstitute from "../../Components/TopRankingInstitute";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate()

  return (
    <div className='pb-12'>
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
                    1,234
                  </Typography>
                  <div className="flex items-center cursor-pointer" onClick={()=>navigate('/app/users')}>
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
                    1,234
                  </Typography>
                  <div className="flex items-center">
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
                1,234
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
                1,234
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
                1,234
              </Typography>
            </section>
          </div>
        </Card>
      </section>
      <section className="flex w-full gap-3">
        <div className="p-6 border rounded-md mt-11  flex-1 ">
        <FloatingBarChart
  tabs={[
    { key: "reports", label: "Reports", icon: <HiOutlineDocumentReport /> },
    { key: "users", label: "Users", icon: <LuUsers /> },
  ]}
/>        </div>
        <div className="p-6 border rounded-md mt-11  flex-3">
        <TopContributors />
        </div>
      </section>
      <div className='pt-6'>
      <TopRankingInstitute />
      </div>
      

    </div>
  );
};

export default Dashboard;
