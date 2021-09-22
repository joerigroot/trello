import React, { useState, useRef } from 'react'
import { setLocalStorage } from '../utils/storage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'

const Ticket = (props) => {

  const { dataTickets, setDataTickets, setShow, setFormState, dialog, setDialog } = props

  function handleClickEdit(event) {
    const id = event.target.value
    const title = event.target.closest('.ticket').querySelector('h3').innerHTML
    const description = event.target.closest('.ticket').querySelector('p').innerHTML
    const lane = event.target.closest('.lane').querySelector('h2').innerHTML

    setDialog(true)
    setFormState({
      title: title,
      description: description,
      lane: lane,
      id: id,
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
      <h3>{props.ticket.name}</h3>
      <p>{props.ticket.description}</p>
      <div className="flex flex-end ticketFooter">
        <button className="editButton" onClick={handleClickEdit} value={props.ticket.id}><FontAwesomeIcon icon={faPen} /></button>
        <button className="deleteButton" onClick={handleClickDelete} value={props.ticket.id}><FontAwesomeIcon icon={faTrash} /></button>
      </div>
    </div>
  );
}

export default Ticket