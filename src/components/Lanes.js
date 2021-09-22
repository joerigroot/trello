import React from "react"
import Lane from "./Lane"
//import { setLocalStorage, getLocalStorage } from '../utils/storage'

const Lanes = (props) => {
  const { dataTickets, setDataTickets, dataLanes, formState, setFormState, dialog, setDialog } = props

  const lanes = dataLanes.sort((laneA, laneB) => laneA.position > laneB.position ? 1 : -1).map((lane) =>
    <Lane dialog={dialog} setDialog={setDialog} key={lane.id} name={lane.name} dataTickets={dataTickets} setDataTickets={setDataTickets} formState={formState} setFormState={setFormState} />
  );

  return (
    <div className="lanes" id="lanes">
      {lanes}
    </div>
  );
}

export default Lanes