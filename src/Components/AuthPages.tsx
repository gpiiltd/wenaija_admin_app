import { FC, ReactNode } from "react";
import Icon from "../Assets/svgImages/Svg_icons_and_images";
import { TypographyVariant } from "./types";
import Typography from "./Typography";
import React from "react";

interface AuthProps {
  children: ReactNode;
}
const AuthPages: FC<AuthProps> = ({ children }) => {
  return (
    <div className="w-full flex flex-col h-screen lg:flex-row">
      <div className="pt-12 w-full flex flex-col gap-8 md:pb-8 md:bg-teal_green md:h-screen md:gap-12 lg:pt-18 lg:gap-2 lg:pb-0">
        <div className="md:m-4 flex items-center justify-center">
          <Icon type="logo" />
          <h2 className="absolute flex top-[7rem] text-lg font-semibold text-[#10B492]">ADMIN PORTAL</h2>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-6">
          <div className="flex flex-col justify-center items-center">
            <Icon type="adminBig" />
            
          </div>
        </div>
      </div>
      <div className="flex w-full px-4 pt-5 justify-center items-center md:px-32 lg:px-56">
        {children}
      </div>
    </div>
  );
  
};

export default AuthPages;
