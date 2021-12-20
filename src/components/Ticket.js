import React, { useState, useRef } from 'react'
import { setLocalStorage } from '../utils/storage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import Joeri from "../joeri.jpg"

const Ticket = (props) => {

  const { dataTickets, setDataTickets, setShow, setFormState, dialog, setDialog, dialogType, setDialogType, dialogTicketId, setDialogTicketId } = props

  function handleClickEdit(event) {
    const id = event.target.value
    let selectedTicket = dataTickets.find(ticket => ticket.id === +id)

    setDialogTicketId(id)
    setDialog(true)
    setDialogType('editTicket')
    setFormState({
      title: { value: selectedTicket.title },
      subtitle: { value: selectedTicket.subtitle },
      description: selectedTicket.description,
      lane: selectedTicket.lane,
      id: selectedTicket.id,
    })
  }

  function handleClickDelete(event) {
    const id = event.target.value
    const updatedDataTickets = dataTickets.filter(ticket => ticket.id !== parseInt(id))
    setDataTickets(updatedDataTickets)
    setLocalStorage("tickets", updatedDataTickets)
  }

  const [dragging, setDragging] = useState(false)
  const dragItem = useRef()
  const dragNode = useRef()

  const handleDragStart = (event, params) => {
    dragItem.current = params
    dragNode.current = event.target
    dragNode.current.addEventListener('dragend', handleDragEnd)
    event.dataTransfer.setData("text", event.target.id);
    setTimeout(() => {
      setDragging(true)
    }, 0)
  }

  const handleDragEnd = () => {
    setDragging(false)
    dragNode.current.removeEventListener('dragend', handleDragEnd)
    dragItem.current = null
    dragNode.current = null
  }

  const ticketId = props.ticket.id
  const ticketLane = props.ticket.lane

  const getStyles = (params) => {
    const currentItem = dragItem.current
    if (currentItem.ticketLane === params.ticketLane && currentItem.ticketId === params.ticketId) {
      return 'current ticket'
    }
    return 'ticket'
  }

  return (
    <div
      className={dragging ? getStyles({ ticketLane, ticketId }) : "ticket"}
      draggable
      onDragStart={(event) => handleDragStart(event, { ticketLane, ticketId })}
      id={ticketId}
    >
      <h3>{props.ticket.title}</h3>
      <h3>{props.ticket.subtitle}</h3>
      <p>{props.ticket.description}</p>
      <div className="flex space-between align-items-center ticketFooter">
        <div className="flex align-items-center">
          <img className="profile-image" src={Joeri} alt="Joeri" />
          <span className="category">Huishuidelijk</span>
        </div>
        <div>
          <button className="editButton" onClick={handleClickEdit} value={props.ticket.id}><FontAwesomeIcon icon={faPen} /></button>
          <button className="deleteButton" onClick={handleClickDelete} value={props.ticket.id}><FontAwesomeIcon icon={faTrash} /></button>
        </div>
      </div>
    </div >
  );
}

export default Ticket