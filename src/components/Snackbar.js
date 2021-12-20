import React from 'react'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Ticket from './Ticket'
import { setLocalStorage, getLocalStorage } from '../utils/storage'


const Snackbar = (props) => {
  const { showSnackbar, setShowSnackbar } = props

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSnackbar(false)
    }, 6000);
    return () => clearTimeout(timer);
  }, [showSnackbar]);

  return (
    <div className={showSnackbar ? 'snackbar' : 'snackbar hidden'}>
      <div className="flex align-items-center">
        <FontAwesomeIcon icon={faCheckCircle} />
        <span>Your ticket is successfully added!</span>
      </div>
    </div>
  );
}

export default Snackbar