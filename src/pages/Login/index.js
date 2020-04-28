import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import './styles.scss';

import api from '../../services/api';

import loaderImg from '../../assets/loader.svg';
import logoBranco from '../../assets/logoComunaBranco.png';

export default function Login() {

    const [email, setEmail] = useState('');
    const [loader, setLoader] = useState(false);
    const [senha, setSenha] = useState('');
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('@ComunaSBC:accessToken')) {
            history.push('/areas');
        }
    }, [history])

    async function handleLogin(e) {
        e.preventDefault();

        if (!email || !senha) {
            return;
        }

        setLoader(true);

        api.post('login', {email, senha}).then((res) => {
            localStorage.setItem('@ComunaSBC:accessToken', res.data.token.accessToken);
            localStorage.setItem('@ComunaSBC:user', res.data.user);
            setLoader(false);
            history.push('/areas');
        }).catch((err) => {
            alert('Email e/ou senha inválidos');
            setLoader(false);
        })
    };

    return (
        <div className="login-container row">
            <div className="col s12 ladoDireito">
                {loader 
                    ? <div className="loaderDiv">
                        <img src={loaderImg} alt="Loading..." /> 
                    </div>
                    : null
                }
                <img src={logoBranco} alt="Comunidade da Graça" />
                <form onSubmit={handleLogin}>
                    <p>Login</p>
                    <div className="row">
                        <div className="input-field col s12">
                            <input type="email" className="validate" id="emailInput" value={email} onChange={e => setEmail(e.target.value)} autoFocus />
                            <label htmlFor="emailInput">E-mail</label>
                        </div>
                        <div className="input-field col s12">
                            <input type="password" className="validate" id="senhaInput" value={senha} onChange={e => setSenha(e.target.value)} minLength="3" />
                            <label htmlFor="senhaInput">Senha</label>
                        </div>
                    </div>
                    <div className="row">
                        <button type="submit" className="col s12 buttonSubmit" disabled={!email || !senha}>
                            <FiArrowRight size={24} color="#fff" />
                        </button>
                    </div>
                    <div className="linhaLink">
                        <a href="/cadastro">Quero me cadastrar</a>
                    </div>
                </form>
            </div>
        </div>
    )

}