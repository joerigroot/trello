import React, { useState } from 'react'
//import DataTickets from './DataTickets'
//import Ticket from './Ticket'
import { setLocalStorage } from '../utils/storage'


const AddDialog = (props) => {
  const { dataLanes, setDataLanes } = props
  const [formState, setFormState] = useState({
    name: '',
    position: null,
  })

  function handleChange(event) {
    const value = event.target.value;
    setFormState({
      ...formState,
      [event.target.name]: value
    });
  }

  const array = (lanes) => {
    lanes.map((lane) => {
      if (+formState.position <= lane.position) {
        lane.position = lane.position + 1
      }
    });
  }


  function handleSubmit(event) {
    event.preventDefault()
    setDataLanes([...dataLanes, { id: dataLanes.length + 1, position: +formState.position, name: formState.name }])
    array(dataLanes)
    setLocalStorage("lanes", [...dataLanes, { id: dataLanes.length + 1, position: +formState.position, name: formState.name }])
    setFormState({ name: '', position: '' })

  }

  return (
    <div className="dialog">
      <div id="openLaneModal" className="addDialog">
        <div>
          <div className="flex space-between align-items-center">
            <h2>Add lane</h2>
            <a href="#close" title="Close" className="close">X</a>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="formField">
              <div><label for="title">Name</label></div>
              <input type="text" value={formState.name} name="name" onChange={handleChange} />
            </div>
            <div className="formField">
              <div><label for="title">Position</label></div>
              <input type="number" value={formState.position} name="position" onChange={handleChange} />
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

export default AddDialog