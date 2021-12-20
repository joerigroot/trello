import React, { useState, useEffect, useRef } from 'react'
import ThingsLogo from "../things-logo.svg"
import { setLocalStorage, getLocalStorage } from '../utils/storage'
//import AddList from "./AddList"

const Input = (props) => {
  const { formState, setFormState, name, minLength, required, defaultValue = "", submitted, dialogType, dialogTicketId, dataTickets, setDataTickets } = props
  const [inputError, setInputError] = useState(null)
  const [fieldValue, setFieldValue] = useState('')
  const [editFieldValue, setEditFieldValue] = useState('')

  const handleChange = (event) => {
    const value = event.target.value;
    setFieldValue(submitted ? '' : value)
    setEditFieldValue(value)
  }

  let selectedTicket = dataTickets.find(ticket => ticket.id === +dialogTicketId)

  useEffect(() => {
    selectedTicket != null && setEditFieldValue(selectedTicket[name])
  }, [dialogTicketId])


  useEffect(() => {
    setFieldValue('')
  }, [submitted == true])

  const handleBlur = (event) => {
    const value = event.target.value

    let isValid = false
    if (required == 'true') {
      if (value === "") {
        setInputError('This field cant be blank!')
        isValid = false
      } else if (value.length < minLength) {
        setInputError('This value should have at least ' + minLength + ' characters.')
        isValid = false
      } else {
        setInputError(null)
        isValid = true
      }
    }
    setFormState({
      ...formState,
      [event.target.name]: { value: value, isValid: isValid }
    });
  }


  return (
    <div>
      <input id={name} type="text" required={required} name={name} value={dialogType == 'editTicket' ? editFieldValue : fieldValue} onBlur={handleBlur} onChange={handleChange} minLength={minLength} dataTickets={dataTickets} setDataTickets={setDataTickets} />
      {inputError && <p>{inputError}</p>}
    </div>
  );
}

export default Input