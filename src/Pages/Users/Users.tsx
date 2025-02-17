import React from "react";
import FloatingBarChart from "../../Components/Graph";
import Typography from "../../Components/Typography";
import { TypographyVariant } from "../../Components/types";
import Card from "../../Components/Card";
import { LuUsers } from "react-icons/lu";
import { FiArrowUpRight } from "react-icons/fi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import Nav from "../../Components/Nav";
import UsersCategory from "./UsersCategory";

const Users = () => {
  return (
    <div>
      <Typography variant={TypographyVariant.TITLE}>Users</Typography>
      <Typography variant={TypographyVariant.NORMAL} className="text-l_gray">
        Manage user registration
      </Typography>

      <section className="flex w-full gap-3">
        <div className=" mt-11 flex flex-col gap-7 h-fit">
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
              </section>
            </div>
          </Card>
          <Card titleLeft={undefined} titleRight={undefined} className="p-4 ">
            <div className="flex flex-col gap-5">
              <Typography
                variant={TypographyVariant.SUBTITLE}
                className="text-l_gray"
              >
                STATUS
              </Typography>
              <section className="flex items-center gap-4">
                <div>
                  <div className="flex items-center gap-2">
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
                    className="text-['#2D3648'] font-semibold"
                  >
                    1,234
                  </Typography>
                </div>

                <div className="h-6 border-l border-gray-300"></div>
                <div>
                  <div className="flex items-center gap-2">
                    <LuUsers color="#ED7D31" />
                    <Typography
                      variant={TypographyVariant.SMALL}
                      className="text-l_gray font-semibold"
                    >
                      Disabled
                    </Typography>
                  </div>
                  <Typography
                    variant={TypographyVariant.BODY_SMALL_MEDIUM}
                    className="text-['#2D3648'] font-semibold"
                  >
                    1,234
                  </Typography>
                </div>
                <div className="h-6 border-l border-gray-300"></div>
                <div>
                  <div className="flex items-center gap-2">
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
                    className="text-['#2D3648'] font-semibold"
                  >
                    1,234
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
                key: "Users",
                label: "Users",
                icon: <HiOutlineDocumentReport />,
              },
            ]}
          />{" "}
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
              1240
            </Typography>
          </div>
        </div>
        <Typography variant={TypographyVariant.NORMAL} className="text-l_gray ">
          See the list and information of all users on the platform
        </Typography>
      </section>

      {/* User category */}
     
 
      <UsersCategory />
    </div>
  );
};

export default Users;
