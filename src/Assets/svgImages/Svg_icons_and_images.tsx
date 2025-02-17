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
import edit from "../svgImages/edit.svg";
import arrowBack from "../svgImages/arrowBack.svg";
import plusCircle from "../svgImages/plusCircle.svg";
import minusCircle from "../svgImages/minusCircle.svg";
import individual from "../svgImages/individual.svg";
import summary from "../svgImages/summary.svg";
import chat from "../svgImages/chat.svg";
import imageup from "../svgImages/imageup.svg";
import morevertical from "../svgImages/morevertical.svg";
import user from "../svgImages/user.svg";

import toastCheck from "../svgImages/toast-check.svg";
import cancel from "../svgImages/cancel.svg";

import forgotPassword from "../svgImages/forgotPassword.svg";
import bookStack from "../svgImages/book_stack.svg"
import stickyNote from "../svgImages/stickynote.svg"
import champion from "../svgImages/champion.svg"
import badge from "../svgImages/badge.svg"
import greensort from "../svgImages/greensort.svg"
import purplesort from "../svgImages/purplesort.svg"
import yellowsort from "../svgImages/yellowsort.svg"
import filterlines from "../svgImages/filterlines.svg"
import exportIcon from "../svgImages/export.svg"
import lock from "../svgImages/lock.svg"
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
        return (
          <img src={defaultUpload} alt="defaultUpload" className={className} />
        );
      case "edit":
        return <img src={edit} alt="edit" className={className} />;
      case "arrowBack":
        return <img src={arrowBack} alt="arrowBack" className={className} />;
      case "plusCircle":
        return <img src={plusCircle} alt="plusCircle" className={className} />;
      case "minusCircle":
        return (
          <img src={minusCircle} alt="minusCircle" className={className} />
        );
      case "individual":
        return <img src={individual} alt="individual" className={className} />;
      case "summary":
        return <img src={summary} alt="summary" className={className} />;
      case "chat":
        return <img src={chat} alt="chat" className={className} />;
      case "imageup":
        return <img src={imageup} alt="imageup" className={className} />;
      case "morevertical":
        return (
          <img src={morevertical} alt="morevertical" className={className} />
        );
      case "user":
        return <img src={user} alt="user" className={className} />;
      case "toastCheck":
        return (
          <img src={toastCheck} alt="start point icon" className={className} />
        );
      case "cancel":
        return (
          <img src={cancel} alt="start point icon" className={className} />
        );
      case "greensort":
        return <img src={greensort} alt="greensort" className={className} />;
      case "purplesort":
        return <img src={purplesort} alt="purplesort" className={className} />;
      case "yellowsort":
        return <img src={yellowsort} alt="yellowsort" className={className} />;
      case "filterlines":
        return <img src={filterlines} alt="filterlines" className={className} />;
      case "export":
        return <img src={exportIcon} alt="export" className={className} />;
      case "lock":
        return <img src={lock} alt="lock" className={className} />;
      default:
        return null;
    }
  };
  return <div onClick={click}>{renderIcon()}</div>;
};

export default Icon;
