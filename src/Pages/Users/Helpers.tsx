import React, { JSX, ReactNode } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import Typography from "../../Components/Typography";
import { TypographyVariant } from "../../Components/types";
import Card from "../../Components/Card";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";

export type TabKey = "Basic information" | "Contact information" | "KYC verification";

export const fields = [
  { label: "Full name", value: "Ekene Dulle" },
  { label: "Username", value: "EKduelle" },
  { label: "Nationality", value: "Nigeria" },
  { label: "Gender", value: "Male" },
  { label: "Date of birth", value: "26-06-1991" },
];
export const contactInfo = [
  { label: "Email", value:"Ekenedulle@gmail.com" },
  { label: "Phone number", value: "08104236489" },
  { label: "Residential address", value: "No 5,  Adebayo street, Lagos, Nigeria" },
 
];
export const kyctInfo = [
  { label: "ID Type", value:"International passport" },
  { label: "ID Number", value: "246796314658363" },
  { label: "Uploaded Id", value: "" },

 
];
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

export const UserInfo = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col pb-8">
    <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM} className="text-l_gray font-bold">
      {label}
    </Typography>
    <Typography variant={TypographyVariant.BODY_DEFAULT_MEDIUM}>{value}</Typography>
  </div>
);

export const tabContent: Record<TabKey, { title: string; data: { label: string; value: string }[]; gridCols: string; extraContent: JSX.Element | null }> = {
  "Basic information": {
    title: "Basic information",
    data: fields,
    gridCols: "grid-cols-3",
    extraContent: null,
  },
  "Contact information": {
    title: "Contact information",
    data: contactInfo,
    gridCols: "grid-cols-3",
    extraContent: null,
  },
  "KYC verification": {
    title: "KYC verification",
    data: kyctInfo,
    gridCols: "grid-cols-2",
    extraContent: (
      <div className="flex gap-3">
        <Icon type="idUpload1" />
        <Icon type="idUpload2" />
      </div>
    ),
  },
};

