import React, { ReactNode } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import Typography from "../../Components/Typography";
import { TypographyVariant } from "../../Components/types";
import Card from "../../Components/Card";

export const UserInfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col ">
    <Typography
      variant={TypographyVariant.SMALL}
      className="text-l_gray font-semibold"
    >
      {label}
    </Typography>
    <Typography
      variant={TypographyVariant.BODY_SMALL_MEDIUM}
      className="text-primary_green font-semibold"
    >
      {value}
    </Typography>
  </div>
);

export const StatCard = ({ title, value, icon, color }: { title: string; value: string; icon: ReactNode; color: string }) => (
  <Card titleLeft={undefined} titleRight={undefined} className="p-3">
    <div className="flex flex-col gap-5">
      <section className="flex justify-between items-center">
        <Typography variant={TypographyVariant.SUBTITLE} className="text-l_gray w-2/3">
          {title}
        </Typography>
        <span style={{ color }}>{icon}</span>
      </section>
      <section className="flex items-center justify-between">
        <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM} className="text-[#2D3648] font-semibold">
          {value}
        </Typography>
        <div className="flex items-center">
          <Typography variant={TypographyVariant.SMALL} className="text-primary_green font-semibold">
            View
          </Typography>
          <FiArrowUpRight color="#007A61" />
        </div>
      </section>
    </div>
  </Card>
);
export const StatusItem = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <div className="flex flex-col  gap-1">
    <div className="flex  items-center gap-2">
      <LuUsers color={color} />
      <Typography variant={TypographyVariant.SMALL} className="text-l_gray font-semibold">
        {label}
      </Typography>
    </div>
    <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM} className="text-[#2D3648] font-semibold">
      {value}
    </Typography>
  </div>
);
