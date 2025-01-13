import React, { FC } from "react";
import { Svgprops } from "../../Components/types";
// import logo from "../svgImages/wenaijalogo.svg";

const Icon: FC<Svgprops> = ({ type, className, click }) => {
  const renderIcon = () => {
    switch (type) {
      case "logo":
        return (
          // <img src={logo} alt="logo" className={className} />
          <div>

          </div>
        );
      default:
        return null;
    }
  };
  return <div onClick={click}>{renderIcon()}</div>;
};

export default Icon;
