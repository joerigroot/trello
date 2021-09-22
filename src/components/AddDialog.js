import React, { useState } from 'react'
//import DataTickets from './DataTickets'
//import Ticket from './Ticket'
import { setLocalStorage } from '../utils/storage'


const AddDialog = (props) => {
  const { dataTickets, setDataTickets, dataLanes, dialog, formState, setFormState } = props
  // const [formState, setFormState] = useState({
  //   title: '',
  //   description: '',
  //   category: '',
  //   lane: '',
  // })

  function handleChange(event) {
    const value = event.target.value;
    setFormState({
      ...formState,
      [event.target.name]: value
    });
  }

  function handleSubmit(event) {
    event.preventDefault()
    setDataTickets([...dataTickets, { id: dataTickets.length + 1, name: formState.title, description: formState.description, lane: formState.lane }])
    setLocalStorage("tickets", [...dataTickets, { id: dataTickets.length + 1, name: formState.title, description: formState.description, lane: formState.lane }])
    setFormState({ title: '', description: '', lane: '' })
  }

  const lanes = dataLanes.sort((laneA, laneB) => laneA.position > laneB.position ? 1 : -1).map((lane) =>
    <option value={lane.name}>{lane.name}</option>
  );

  return (
    <div className="dialog">
      <div id="openModal" className={dialog ? 'dialogOpen addDialog' : 'addDialog'}>
        <div>
          <div className="flex space-between align-items-center">
            <h2>Add ticket</h2>
            <a href="#close" title="Close" className="close">X</a>
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
                <option value="Select category">-- Select category --</option>
                <option value="In Progress">Category A</option>
                <option value="Review">Category B</option>
                <option value="Completed">Category C</option>
              </select>
            </div>
            <div>
              <select name="lane" onChange={handleChange}>
                <option value="Select lane">-- Select lane --</option>
                {lanes}
              </select>
            </div>
            <div className="flex submit">
              <a onClick={handleClose} title="Close" className="close button button-cancel">Cancel</a>
              <input class="button" type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </div >
  );
}

export default AddDialog