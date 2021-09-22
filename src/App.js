import './App.css';
import Header from './components/Header'
import Lanes from './components/Lanes'
import AddDialog from './components/AddDialog'
import AddLaneDialog from './components/AddLaneDialog'
import EditDialog from './components/EditDialog'
//import DataTickets from './components/DataTickets'
//import DataLanes from './components/DataLanes'
import { setLocalStorage, getLocalStorage } from './utils/storage'
import React, { useState, useEffect } from "react"



const App = () => {
  const lanes = getLocalStorage("lanes")
  const tickets = getLocalStorage("tickets")
  tickets == null && setLocalStorage("tickets", [])
  lanes == null && setLocalStorage("lanes", [])

  const [dataTickets, setDataTickets] = useState(getLocalStorage("tickets"))
  const [dataLanes, setDataLanes] = useState(getLocalStorage("lanes"))
  const [show, setShow] = useState(false)
  const [dialog, setDialog] = useState(false)
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    lane: '',
    id: '',
  })

  return (
    <div>
      <Header dialog={dialog} setDialog={setDialog} />
      <Lanes dialog={dialog} setDialog={setDialog} show={show} setShow={setShow} dataTickets={dataTickets} setDataTickets={setDataTickets} dataLanes={dataLanes} setDataLanes={setDataLanes} formState={formState} setFormState={setFormState} />
      <AddDialog dialog={dialog} dataTickets={dataTickets} setDataTickets={setDataTickets} dataLanes={dataLanes} formState={formState} setFormState={setFormState} />
      <EditDialog dataTickets={dataTickets} setDataTickets={setDataTickets} formState={formState} setFormState={setFormState} />
      <AddLaneDialog show={show} setShow={setShow} dataLanes={dataLanes} setDataLanes={setDataLanes} formState={formState} setFormState={setFormState} />
    </div>
  );
}

export default App;
