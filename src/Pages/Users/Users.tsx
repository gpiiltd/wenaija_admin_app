import React from "react";
import FloatingBarChart from "../../Components/Graph";
import Typography from "../../Components/Typography";
import { TypographyVariant } from "../../Components/types";
import Card from "../../Components/Card";
import { LuUsers } from "react-icons/lu";
import { HiOutlineDocumentReport } from "react-icons/hi";
import UsersCategory from "./UsersCategory";
import { StatCard, StatusItem} from "./Helpers";

const Users = () => {
  const statusList = [
    { label: "Enable", value: "1,234", color: "#007A61" },
    { label: "Disabled", value: "1,234", color: "#ED7D31" },
    { label: "Pending", value: "1,234", color: "#BF56D9" },
  ];
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
            value="1,234"
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
                {statusList.map((status, index) => (
                  <React.Fragment key={status.label}>
                    <StatusItem {...status} />
                    {index < statusList.length - 1 && (
                      <div className="h-6 border-l border-gray-300"></div>
                    )}
                  </React.Fragment>
                ))}
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
