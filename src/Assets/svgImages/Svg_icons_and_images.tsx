import React, { FC } from 'react'
import { Svgprops } from '../../Components/types'
import adminBig from '../svgImages/Admin.svg'
import alert from '../svgImages/alert.svg'
import archive from '../svgImages/archive.svg'
import arrowBack from '../svgImages/arrowBack.svg'
import leaderboard from '../svgImages/award.svg'
import { default as badge, default as userBadge } from '../svgImages/badge.svg'
import bookStack from '../svgImages/book_stack.svg'
import cancel from '../svgImages/cancel.svg'
import champion from '../svgImages/champion.svg'
import championBadge from '../svgImages/championBadge.svg'
import chat from '../svgImages/chat.svg'
import clock from '../svgImages/clock.svg'
import dashboard from '../svgImages/dashboard.svg'
import defaultUpload from '../svgImages/defaultUpload.svg'
import deleteIcon from '../svgImages/delete.svg'
import edit from '../svgImages/edit.svg'
import editdark from '../svgImages/editDark.svg'
import editIcon from '../svgImages/editIcon.svg'
import editIconGreen from '../svgImages/editIconGreen.svg'
import editt from '../svgImages/editt.svg'
import error from '../svgImages/error.svg'
import exportIcon from '../svgImages/export.svg'
import idUpload2 from '../svgImages/file-upload2.svg'
import file from '../svgImages/file.svg'
import idUpload1 from '../svgImages/file_upload1.svg'
import filterlines from '../svgImages/filterlines.svg'
import forgotPassword from '../svgImages/forgotPassword.svg'
import greensort from '../svgImages/greensort.svg'
import guardianBadge from '../svgImages/guardianBadge.svg'
import adminDailogCheck from '../svgImages/icon-check.svg'
import imageopen from '../svgImages/imageopen.svg'
import imageplus from '../svgImages/imageplus.svg'
import imageup from '../svgImages/imageup.svg'
import individual from '../svgImages/individual.svg'
import institution from '../svgImages/layers.svg'
import legendBadge from '../svgImages/legendBadge.svg'
import lgs from '../svgImages/lgs.svg'
import lock from '../svgImages/lock.svg'
import medal1 from '../svgImages/medal1.svg'
import medal2 from '../svgImages/medal2.svg'
import medal3 from '../svgImages/medal3.svg'
import messageText from '../svgImages/message-text.svg'
import minusCircle from '../svgImages/minusCircle.svg'
import morevertical from '../svgImages/morevertical.svg'
import IDCard from '../svgImages/national-id.svg'
import plus from '../svgImages/plus.svg'
import plusCircle from '../svgImages/plusCircle.svg'
import purplesort from '../svgImages/purplesort.svg'
import quotient from '../svgImages/quotient.svg'
import savebutton from '../svgImages/savebutton.svg'
import scoutBadge from '../svgImages/scoutBadge.svg'
import searchZoom from '../svgImages/search-zoom-in.svg'
import starPoints from '../svgImages/star-points.svg'
import states from '../svgImages/states.svg'
import {
  default as reports,
  default as stickyNote,
} from '../svgImages/stickynote.svg'
import stickyNotePurple from '../svgImages/stickynotepurple.svg'
import reportsStickRed from '../svgImages/stickynotered.svg'
import stickyNoteRedish from '../svgImages/stickynoteredish.svg'
import success from '../svgImages/success.svg'
import successIcon from '../svgImages/success_.svg'
import summary from '../svgImages/summary.svg'
import taskSquare from '../svgImages/task-square.svg'
import task from '../svgImages/task.svg'
import toastCheck from '../svgImages/toast-check.svg'
import total from '../svgImages/total.svg'
import upload from '../svgImages/upload.svg'
import user from '../svgImages/user.svg'
import ward from '../svgImages/ward.svg'
import warning from '../svgImages/warning-icon.svg'
import logo from '../svgImages/wenaijalogo.svg'
import yellowsort from '../svgImages/yellowsort.svg'

const Icon: FC<Svgprops> = ({ type, className, click }) => {
  const renderIcon = () => {
    switch (type) {
      case 'logo':
        return <img src={logo} alt="logo" className={className} />
      case 'dashboard':
        return <img src={dashboard} alt="icon" className={className} />
      case 'institutions':
        return <img src={institution} alt="icon" className={className} />
      case 'reports':
        return <img src={reports} alt="icon" className={className} />
      case 'leaderboard':
        return <img src={leaderboard} alt="icon" className={className} />
      case 'success':
        return <img src={success} alt="icon" className={className} />
      case 'adminBig':
        return <img src={adminBig} alt="icon" className={className} />
      case 'adminDailogCheck':
        return <img src={adminDailogCheck} alt="icon" className={className} />
      case 'error':
        return <img src={error} alt="icon" className={className} />
      case 'book_stack':
        return <img src={bookStack} alt="icon" className={className} />
      case 'sticky_note':
        return <img src={stickyNote} alt="icon" className={className} />
      case 'sticky_notePurple':
        return <img src={stickyNotePurple} alt="icon" className={className} />

      case 'sticky_noteRedish':
        return <img src={stickyNoteRedish} alt="icon" className={className} />
      case 'champion':
        return <img src={champion} alt="icon" className={className} />
      case 'badge':
        return <img src={badge} alt="icon" className={className} />
      case 'lgs':
        return <img src={lgs} alt="lgs" className={className} />
      case 'states':
        return <img src={states} alt="states" className={className} />
      case 'ward':
        return <img src={ward} alt="ward" className={className} />
      case 'total':
        return <img src={total} alt="total" className={className} />
      case 'upload':
        return <img src={upload} alt="upload" className={className} />
      case 'plus':
        return <img src={plus} alt="plus" className={className} />
      case 'quotient':
        return <img src={quotient} alt="quotient" className={className} />
      case 'clock':
        return <img src={clock} alt="clock" className={className} />
      case 'forgotPassword':
        return <img src={forgotPassword} alt="clock" className={className} />
      case 'defaultUpload':
        return (
          <img src={defaultUpload} alt="defaultUpload" className={className} />
        )
      case 'edit':
        return <img src={edit} alt="edit" className={className} />
      case 'arrowBack':
        return <img src={arrowBack} alt="arrowBack" className={className} />
      case 'plusCircle':
        return <img src={plusCircle} alt="plusCircle" className={className} />
      case 'minusCircle':
        return <img src={minusCircle} alt="minusCircle" className={className} />
      case 'individual':
        return <img src={individual} alt="individual" className={className} />
      case 'summary':
        return <img src={summary} alt="summary" className={className} />
      case 'chat':
        return <img src={chat} alt="chat" className={className} />
      case 'imageup':
        return <img src={imageup} alt="imageup" className={className} />
      case 'morevertical':
        return (
          <img src={morevertical} alt="morevertical" className={className} />
        )
      case 'user':
        return <img src={user} alt="user" className={className} />
      case 'toastCheck':
        return (
          <img src={toastCheck} alt="start point icon" className={className} />
        )
      case 'cancel':
        return <img src={cancel} alt="start point icon" className={className} />
      case 'greensort':
        return <img src={greensort} alt="greensort" className={className} />
      case 'purplesort':
        return <img src={purplesort} alt="purplesort" className={className} />
      case 'yellowsort':
        return <img src={yellowsort} alt="yellowsort" className={className} />
      case 'filterlines':
        return <img src={filterlines} alt="filterlines" className={className} />
      case 'export':
        return <img src={exportIcon} alt="export" className={className} />
      case 'archive':
        return <img src={archive} alt="export" className={className} />
      case 'star':
        return <img src={starPoints} alt="export" className={className} />
      case 'file':
        return <img src={file} alt="export" className={className} />
      case 'deleteIcon':
        return <img src={deleteIcon} alt="export" className={className} />
      case 'editIcon':
        return <img src={editIcon} alt="export" className={className} />
      case 'editIconGreen':
        return <img src={editIconGreen} alt="export" className={className} />
      case 'editdark':
        return <img src={editdark} alt="export" className={className} />

      case 'searchZoom':
        return <img src={searchZoom} alt="export" className={className} />

      case 'task':
        return <img src={task} alt="export" className={className} />

      case 'taskSquare':
        return <img src={taskSquare} alt="export" className={className} />

      case 'messageText':
        return <img src={messageText} alt="export" className={className} />
      case 'reportsStickRed':
        return <img src={reportsStickRed} alt="export" className={className} />

      case 'imageopen':
        return <img src={imageopen} alt="imageopen" className={className} />
      case 'imageplus':
        return <img src={imageplus} alt="imageplus" className={className} />
      case 'savebutton':
        return <img src={savebutton} alt="savebutton" className={className} />
      case 'lock':
        return <img src={lock} alt="lock" className={className} />
      case 'editt':
        return <img src={editt} alt="editt" className={className} />
      case 'alert':
        return <img src={alert} alt="alert" className={className} />
      case 'idCard':
        return <img src={IDCard} alt="export" className={className} />
      case 'warning':
        return <img src={warning} alt="export" className={className} />
      case 'userBadge':
        return <img src={userBadge} alt="export" className={className} />
      case 'starPoint':
        return <img src={starPoints} alt="export" className={className} />
      case 'idUpload1':
        return <img src={idUpload1} alt="export" className={className} />
      case 'idUpload2':
        return <img src={idUpload2} alt="export" className={className} />
      case 'successIcon':
        return <img src={successIcon} alt="export" className={className} />
      case 'scoutBadge':
        return <img src={scoutBadge} alt="export" className={className} />
      case 'guardianBadge':
        return <img src={guardianBadge} alt="export" className={className} />
      case 'championBadge':
        return <img src={championBadge} alt="export" className={className} />
      case 'legendBadge':
        return <img src={legendBadge} alt="export" className={className} />
      case 'medal1':
        return <img src={medal1} alt="export" className={className} />
      case 'medal2':
        return <img src={medal2} alt="export" className={className} />
      case 'medal3':
        return <img src={medal3} alt="export" className={className} />
      default:
        return null
    }
  }
  return <div onClick={click}>{renderIcon()}</div>
}

export default Icon
