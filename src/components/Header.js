import React from "react"
//import AddList from "./AddList"

const Header = (props) => {
  const { setDialog } = props
  const openDialog = (target) => {
    setDialog(prevState => !prevState)
  }

  return (
    <div className="header" id="header">
      <header className="flex align-items-center">
        <h1>Trello Applicatie!</h1>
        <a onClick={() => openDialog('addTicket')} className="button">Add Ticket</a>
        <a onClick={openDialog} className="button">Add Lane</a>
      </header>
    </div>
  );
}

export default Header