import React, { useState, useEffect } from 'react'
//import DataTickets from './DataTickets'
import Input from './Input'
import { setLocalStorage } from '../utils/storage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Dialog = (props) => {
  const { dataTickets, setDataTickets, dataLanes, dialog, setDialog, formState, setFormState, dialogType, submitted, setSubmitted, dialogTicketId, setDialogTicketId, setShowSnackbar } = props
  const [isValidForm, setIsValidForm] = useState(true)

  const handleChange = (event) => {
    const value = event.target.value;
    setFormState({
      ...formState,
      [event.target.name]: value
    });
  }

  const handleClose = () => {
    setDialog(false)
  }

  useEffect(() => {
    fullFormValidation()
  }, [formState])

  useEffect(() => {
    setIsValidForm(false)
  }, [dialog == false])

  //let validForm = true
  // @GARETH: Kan ik hier ook een stateless component van maken door let validForm te gebruiken? Dit lukt mij niet.

  const fullFormValidation = () => {
    for (const [key, value] of Object.entries(formState)) {
      if (value.isValid === false) {
        setIsValidForm(false)
        return
      } else {
        setIsValidForm(true)
      }
    }
  }

  const handleSubmit = (event, dialogType) => {
    event.preventDefault()
    if (dialogType === "addTicket") {
      setDataTickets([...dataTickets, { id: dataTickets.length + 1, title: formState.title.value, subtitle: formState.subtitle.value, description: formState.description, lane: formState.lane }])
      setLocalStorage("tickets", [...dataTickets, { id: dataTickets.length + 1, title: formState.title.value, subtitle: formState.subtitle.value, description: formState.description, lane: formState.lane }])
      setFormState({ title: '', subtitle: '', description: '', lane: '' })
      setSubmitted(true)
      setShowSnackbar(true)
    } else if (dialogType === "editTicket") {
      const selectedTicket = dataTickets.find(ticket => ticket.id === parseInt(formState.id));
      selectedTicket.title = formState.title.value
      selectedTicket.subtitle = formState.subtitle.value
      selectedTicket.description = formState.description
      selectedTicket.lane = formState.lane
      setLocalStorage("tickets", dataTickets)
      setShowSnackbar(true)
    } else {
      return
    }
    setDialog(false)
  }

  const lanes = dataLanes.sort((laneA, laneB) => laneA.position > laneB.position ? 1 : -1).map((lane, index) =>
    <option key={index} selected={formState.lane === lane.name && 'selected'} value={lane.name}>{lane.name}</option>
  );

  return (
    <div className="dialog">
      <div id="openModal" className={dialog ? 'dialogOpen addDialog' : 'addDialog'}>
        <div>
          <div className="flex space-between align-items-center">
            <h2>{dialogType === 'addTicket' ? 'Add ticket' : dialogType === 'editTicket' ? 'Edit ticket' : null}</h2>
            <a onClick={handleClose} title="Close" className="close"><FontAwesomeIcon icon={faTimes} /></a>
          </div>
          <form onSubmit={(event) => handleSubmit(event, dialogType)}>
            <div className="formField">
              <div><label for="title">Title</label></div>
              <Input dataTickets={dataTickets} dialogTicketId={dialogTicketId} setDialogTicketId={setDialogTicketId} dialogType={dialogType} submitted={submitted} id="title" type="text" name="title" required="true" minLength="4" onChange={handleChange} formState={formState} setFormState={setFormState} />
            </div>
            <div className="formField">
              <div><label for="title">Subtitle</label></div>
              <Input dataTickets={dataTickets} dialogTicketId={dialogTicketId} dialogType={dialogType} submitted={submitted} id="subtitle" type="text" name="subtitle" required="true" minLength="4" onChange={handleChange} formState={formState} setFormState={setFormState} />
            </div>
            <div>
              <div><label for="description">Description</label></div>
              <textarea id="description" className="input" type="text" value={formState.description} name="description" onChange={handleChange}></textarea>
            </div>
            <div>
              <select name="lane" onChange={handleChange} required='true'>
                <option value="Select lane">-- Select lane --</option>
                {lanes}
              </select>
            </div>
            <div className="flex submit">
              <a onClick={handleClose} title="Close" className="close button button-cancel">Cancel</a>
              <input class={isValidForm ? "button" : "button disabled"} type="submit" value="Submit" disabled={!isValidForm} />
            </div>
          </form>
        </div>
      </div>
    </div >
  );
}

export default Dialog