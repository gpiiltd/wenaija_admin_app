import React, { FC } from "react";
import { Svgprops } from "../../Components/types";
import logo from "../svgImages/wenaijalogo.svg";
import dashboard from "../svgImages/dashboard.svg";
import institution from "../svgImages/layers.svg";
import reports from "../svgImages/stickynote.svg";
import leaderboard from "../svgImages/award.svg";
import error from "../svgImages/warning.svg";
import success from "../svgImages/success.svg";
import lgs from "../svgImages/lgs.svg";
import states from "../svgImages/states.svg";
import ward from "../svgImages/ward.svg";
import total from "../svgImages/total.svg";
import upload from "../svgImages/upload.svg";
import plus from "../svgImages/plus.svg";
import quotient from "../svgImages/quotient.svg";
import clock from "../svgImages/clock.svg";
import defaultUpload from "../svgImages/defaultUpload.svg";
import adminBig from "../svgImages/Admin.svg";
import adminDailogCheck from "../svgImages/icon-check.svg";
import forgotPassword from "../svgImages/forgotPassword.svg";
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
      case "lgs":
        return <img src={lgs} alt="lgs" className={className} />;
      case "states":
        return <img src={states} alt="states" className={className} />;
      case "ward":
        return <img src={ward} alt="ward" className={className} />;
      case "total":
        return <img src={total} alt="total" className={className} />;
      case "upload":
        return <img src={upload} alt="upload" className={className} />;
      case "plus":
        return <img src={plus} alt="plus" className={className} />;
      case "quotient":
        return <img src={quotient} alt="quotient" className={className} />;
      case "clock":
        return <img src={clock} alt="clock" className={className} />;
      case "forgotPassword":
        return <img src={forgotPassword} alt="clock" className={className} />;
      case "defaultUpload":
        return <img src={defaultUpload} alt="defaultUpload" className={className} />;
   
      default:
        return null;
    }
  };
  return <div onClick={click}>{renderIcon()}</div>;
};

export default Icon;
