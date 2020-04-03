import React, { useState } from 'react'
import { Alert } from 'reactstrap'

const EventsAlert = props => {
  const [visible, setVisible] = useState(true)

  const onDismiss = () => setVisible(false)

  return (
    <Alert color="primary" isOpen={visible} toggle={onDismiss}>
      <div className="text-center">
      Due to the COVID-19 outbreak, all IGs, GUIs, Houses and other USP groups will not be able to hold any face-to-face activities, and bookings for such purposes will not be considered valid during this time. Refer {' '}
        <a href="https://emergency.nus.edu.sg/" className="alert-link">
          here
        </a>
      {' '} for more information.
      </div>
    </Alert>
  )
}

export default EventsAlert
