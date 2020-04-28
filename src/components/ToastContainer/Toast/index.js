import React, { useEffect, useState } from 'react';
import { FiAlertCircle, FiXCircle, FiInfo, FiCheckCircle } from 'react-icons/fi';
import { useToast } from '../../../hooks/toast';

import './styles.scss';

const icons = {
    info: <FiInfo size={24} />,
    error: <FiAlertCircle size={24} />,
    success: <FiCheckCircle size={24} />
}

const Toast = ({ message }) => {
    const { removeToast } = useToast();
    const [classeAnimada, setClasseAnimada] = useState('fadeIn');

    function handleChangeClass(id) {
        setClasseAnimada('fadeOut');
        setTimeout(() => { removeToast(id); }, 600);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setClasseAnimada('fadeOut');
            setTimeout(() => { removeToast(message.id); }, 600);
        }, 3000);

        return() => {
            clearTimeout(timer);
        }
    }, [removeToast, message.id]);

    return (
        <div key={message.id} className={`toast-individual ${message.type} animated faster ${classeAnimada}`} >
            {icons[message.type]}

            <div>
                <strong>{message.title}</strong>
                {message.description && <p>{message.description}</p> }
            </div>

            <button type="button" onClick={() => handleChangeClass(message.id)}>
                <FiXCircle size={18} />
            </button>
        </div>
    )
}

export default Toast;