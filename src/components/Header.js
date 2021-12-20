import React from "react"
import ThingsLogo from "../things-logo.svg"
//import AddList from "./AddList"

const Header = (props) => {
  const { setDialog, setDialogType, setSubmitted, setLaneDialog } = props
  const openDialog = (param) => {
    if (param === 'addTicket') {
      setDialog(true)
      setDialogType('addTicket')
      setSubmitted(false)
    } else if (param === 'addLane') {
      setLaneDialog(true)
    }
  }

  return (
    <div className="header" id="header">
      <header className="flex align-items-center space-between">
        <img className="logo" src={ThingsLogo} alt="Logo" />
        <div>
          <a onClick={() => openDialog('addTicket')} className="button">Add Ticket</a>
          <a onClick={() => openDialog('addLane')} className="button button-grey">Add Lane</a>
        </div>
      </header>
    </div>
  );
}

export default Header