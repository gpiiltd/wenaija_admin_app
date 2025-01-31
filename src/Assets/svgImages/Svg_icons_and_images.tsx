import React, { FC } from "react";
import { Svgprops } from "../../Components/types";
import logo from "../svgImages/wenaijalogo.svg";
import dashboard from "../svgImages/dashboard.svg";
import institution from "../svgImages/layers.svg";
import reports from "../svgImages/stickynote.svg";
import leaderboard from "../svgImages/award.svg";
import error from "../svgImages/warning.svg";
import success from "../svgImages/success.svg";
import adminBig from "../svgImages/Admin.svg";
import adminDailogCheck from "../svgImages/icon-check.svg";
import bookStack from "../svgImages/book_stack.svg"
import stickyNote from "../svgImages/stickynote.svg"
import champion from "../svgImages/champion.svg"
import badge from "../svgImages/badge.svg"





const Icon: FC<Svgprops> = ({ type, className, click }) => {
  const renderIcon = () => {
    switch (type) {
      case "logo":
        return <img src={logo} alt="logo" className={className} />;
      case "dashboard":
        return <img src={dashboard} alt="icon" className={className} />;
      case "institutions":
        return <img src={institution} alt="icon" className={className} />;
      case "reports":
        return <img src={reports} alt="icon" className={className} />;

      case "leaderboard":
        return <img src={leaderboard} alt="icon" className={className} />;
      case "success":
        return <img src={success} alt="icon" className={className} />;
      case "adminBig":
        return <img src={adminBig} alt="icon" className={className} />;
      case "adminDailogCheck":
        return <img src={adminDailogCheck} alt="icon" className={className} />;
      case "error":
        return <img src={error} alt="icon" className={className} />;
      case "book_stack":
        return <img src={bookStack} alt="icon" className={className} />;
        case "sticky_note":
        return <img src={stickyNote} alt="icon" className={className} />;
        case "champion":
        return <img src={champion} alt="icon" className={className} />;
        case "badge":
        return <img src={badge} alt="icon" className={className} />;
      default:
        return null;
    }
  };
  return <div onClick={click}>{renderIcon()}</div>;
};

export default Icon;
