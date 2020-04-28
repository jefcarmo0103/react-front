import React from 'react';
import Toast from './Toast';

import './styles.scss';

const ToastContainer = ({ messages }) => {

    const arrayMessages = messages;

    return (
        <div className="toast-container">
            {arrayMessages.map(message => (
                <Toast key={message.id} message={message} />
            ))}
        </div>
    )
}

export default ToastContainer;