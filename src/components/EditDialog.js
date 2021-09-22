import React from 'react'
//import DataTickets from './DataTickets'
//import Ticket from './Ticket'
import { setLocalStorage } from '../utils/storage'

const EditDialog = (props) => {
  //console.log("Props in add dialog: ", props)
  const { dataTickets, show, setShow, formState, setFormState } = props

  function handleChange(event) {
    const value = event.target.value;
    setFormState({
      ...formState,
      [event.target.name]: value
    });
  }

  function handleSubmit(event) {
    event.preventDefault()
    const selectedTicket = dataTickets.find(ticket => ticket.id === parseInt(formState.id));
    selectedTicket.name = formState.title
    selectedTicket.description = formState.description
    selectedTicket.lane = formState.lane
    setLocalStorage("tickets", dataTickets)
  }

  if (!show) return null

  return (
    <div className="dialog" >
      <div id="openDialogModal" className="editDialog">
        <div>
          <div className="flex space-between align-items-center">
            <h2>Edit ticket</h2>
            <a href="#close" title="Close" className="close" onClick={() => setShow(false)}>X</a>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="formField">
              <div><label for="title">Title</label></div>
              <input type="text" value={formState.title} name="title" onChange={handleChange} />
            </div>
            <div>
              <div><label for="description">Description</label></div>
              <textarea type="text" value={formState.description} name="description" onChange={handleChange}></textarea>
            </div>
            <div>
              <select name="lane" onChange={handleChange}>
                <option value="Select lane">-- Select lane --</option>
                <option selected={formState.lane === "To Do" && 'selected'} value="To Do">To Do</option>
                <option selected={formState.lane === "In Progress" && 'selected'} value="In Progress">In Progress</option>
                <option selected={formState.lane === "Review" && 'selected'} value="Review">Review</option>
                <option selected={formState.lane === "Completed" && 'selected'} value="Completed">Completed</option>
              </select>
            </div>
            <div className="flex submit">
              <a href="#close" title="Close" className="close button button-cancel">Cancel</a>
              <input class="button" type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </div >
  );
}

export default EditDialog