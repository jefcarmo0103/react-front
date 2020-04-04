import React, { useState, useEffect } from 'react';
import './styles.scss';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

export default function Area() {
//teste
    const [areas, setAreas] = useState([]);

    const history = useHistory();

    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        if (!localStorage.getItem('userId')) {
            history.push('/');
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        api.get('areas')
        .then(response => {
            setAreas(response.data);
        })
    }, [userId]);

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="area-container">
            <header>
                <span>Bem vindo, {userName}</span>

                <button type="button" onClick={() => handleLogout()}>
                    Sair
                </button>
            </header>

            <ul>
                {areas
                .sort(function(a,b) { return a.nomeArea < b.nomeArea ? -1 : a.nomeArea > b.nomeArea ? 1 : 0 })
                .map(area => (
                    <li key={area.idArea} className={area.corArea}>
                        <strong>NOME:</strong>
                        <p>{area.nomeArea}</p>

                        <strong>STATUS:</strong>
                        <p>{area.statusArea}</p>

                        <strong>PERTENCE A IGREJA:</strong>
                        <p>{area.idIgreja}</p>

                        <strong>DATA INÍCIO:</strong>
                        <p>{Intl.DateTimeFormat('pt-BR').format(new Date (area.inicioArea))}</p>
                    </li>
                ))}
            </ul>
        </div>
    )

}