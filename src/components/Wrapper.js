import React, { useState, children } from "react"
import { setLocalStorage, getLocalStorage } from '../utils/storage'


export const Wrapper = (props) => {
  const [dataTickets, setDataTickets] = useState(getLocalStorage("tickets"))
  //console.log("DataTickets in wrapper: ", props.children)
  return (
    <div>
      hallooo
      {props.children}
      {/* <Children dataTickets={dataTickets} setDataTickets={setDataTickets} /> */}
    </div>
  );
}
