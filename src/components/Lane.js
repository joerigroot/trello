import React from 'react'
import { useEffect } from 'react'
import Ticket from './Ticket'
import { setLocalStorage, getLocalStorage } from '../utils/storage'


const Lane = (props) => {
  const { dataTickets, setDataTickets, formState, setFormState, dialog, setDialog, dialogType, setDialogType, dialogTicketId, setDialogTicketId } = props
  const handleDragOver = (event) => {
    event.preventDefault()
  }

  function handleDrop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const selectedTicket = dataTickets.find(ticket => ticket.id === parseInt(data));
    event.target.className === 'lane' && event.target.querySelector('.tickets-container').appendChild(document.getElementById(data));
    selectedTicket.lane = props.name
    setLocalStorage("tickets", dataTickets)
  }

  return (
    <div
      onDragOver={(event) => handleDragOver(event)}
      onDrop={(event) => handleDrop(event)}
      className="lane"
      id={props.name}
    >
      <h2>{props.name}</h2>
      <div class="tickets-container">
        {dataTickets.filter(ticket => ticket.lane === props.name).map((filteredTicket, index) => (
          props.name === filteredTicket.lane &&
          <Ticket dialogTicketId={dialogTicketId} setDialogTicketId={setDialogTicketId} dialogType={dialogType} setDialogType={setDialogType} dialog={dialog} setDialog={setDialog} key={filteredTicket.id} ticket={filteredTicket} dataTickets={dataTickets} setDataTickets={setDataTickets} formState={formState} setFormState={setFormState} />
        ))}
      </div>
    </div>
  );
}

export default Lane