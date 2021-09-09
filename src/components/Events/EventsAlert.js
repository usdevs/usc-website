import React, { useState } from 'react'
import { Alert } from 'reactstrap'

const EventsAlert = props => {
  const [visible, setVisible] = useState(true)

  const onDismiss = () => setVisible(false)

  return (
    <Alert color="primary" isOpen={visible} toggle={onDismiss}>
      <div>
        Visit our <a href="https://t.me/cinnaspaces">Cinnaspaces Channel</a> for assistance regarding the common spaces, 
        or <a href="https://t.me/cinnabot">Cinnabot</a> to check the latest Spaces bookings on Telegram.
      </div>
    </Alert>
  )
}

export default EventsAlert
