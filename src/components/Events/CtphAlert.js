import React, { useState } from 'react';
import { Alert } from 'reactstrap';

const CtphAlert = (props) => {
    const [visible, setVisible] = useState(true);

    const onDismiss = () => setVisible(false);

    return (
        <Alert color="primary" isOpen={visible} toggle={onDismiss}>
            <div className="text-center">
                Looking for CTPH bookings? They have been temporarily moved. <a href="https://bit.ly/ctphbookings" className="alert-link">Click here for the latest CTPH bookings!</a>!
            </div>
        </Alert>
    )
}

export default CtphAlert