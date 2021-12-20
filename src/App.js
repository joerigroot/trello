import './App.css';
import Header from './components/Header'
import Lanes from './components/Lanes'
import Dialog from './components/Dialog'
import AddLaneDialog from './components/AddLaneDialog'
import Snackbar from './components/Snackbar'
import Categories from './components/Categories'
//import DataTickets from './components/DataTickets'
//import DataLanes from './components/DataLanes'
import { setLocalStorage, getLocalStorage } from './utils/storage'
import React, { useState } from "react"



const App = () => {
  const lanes = getLocalStorage("lanes")
  const tickets = getLocalStorage("tickets")
  tickets == null && setLocalStorage("tickets", [])
  lanes == null && setLocalStorage("lanes", [])

  const [dataTickets, setDataTickets] = useState(getLocalStorage("tickets"))
  const [dataLanes, setDataLanes] = useState(getLocalStorage("lanes"))
  const [show, setShow] = useState(false)
  const [dialog, setDialog] = useState(false)
  const [laneDialog, setLaneDialog] = useState(false)
  const [dialogTicketId, setDialogTicketId] = useState(0)
  const [dialogType, setDialogType] = useState()
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formState, setFormState] = useState({
    title: { value: '', isValid: false },
    subtitle: { value: '', isValid: false },
    description: '',
    lane: '',
    id: '',
  })

  console.log("formState", formState)

  return (
    <div>
      <Header setLaneDialog={setLaneDialog} submitted={submitted} setSubmitted={setSubmitted} dialog={dialog} setDialog={setDialog} dialogType={dialogType} setDialogType={setDialogType} setFormState={setFormState} />
      <Categories />
      <Lanes dialogTicketId={dialogTicketId} setDialogTicketId={setDialogTicketId} dialog={dialog} setDialog={setDialog} show={show} setShow={setShow} dataTickets={dataTickets} setDataTickets={setDataTickets} dataLanes={dataLanes} setDataLanes={setDataLanes} formState={formState} setFormState={setFormState} dialogType={dialogType} setDialogType={setDialogType} />
      <Dialog setShowSnackbar={setShowSnackbar} dialogTicketId={dialogTicketId} setDialogTicketId={setDialogTicketId} submitted={submitted} setSubmitted={setSubmitted} dialogType={dialogType} setDialogType={setDialogType} dialog={dialog} setDialog={setDialog} dataTickets={dataTickets} setDataTickets={setDataTickets} dataLanes={dataLanes} formState={formState} setFormState={setFormState} />
      <AddLaneDialog laneDialog={laneDialog} setLaneDialog={setLaneDialog} show={show} setShow={setShow} dataLanes={dataLanes} setDataLanes={setDataLanes} formState={formState} setFormState={setFormState} />
      <Snackbar showSnackbar={showSnackbar} setShowSnackbar={setShowSnackbar} />
    </div>
  );
}

export default App;
