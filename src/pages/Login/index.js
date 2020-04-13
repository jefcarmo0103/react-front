import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.scss';

import api from '../../services/api';

import loaderImg from '../../assets/loader.svg';
import logoBranco from '../../assets/logoComunaBranco.png';
import logo from '../../assets/logoComuna.png';

export default function Login() {

    const [email, setEmail] = useState('');
    const [loader, setLoader] = useState(false);
    const [senha, setSenha] = useState('');
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            history.push('/areas');
        }
        // eslint-disable-next-line
    }, [])

    async function handleLogin(e) {
        e.preventDefault();

        if (!email || !senha) {
            return;
        }

        setLoader(true);

        try {
            const response = await api.post('login', {email, senha});
            localStorage.setItem('userId', response.data.pessoa.id);
            localStorage.setItem('userName', response.data.pessoa.nome);
            localStorage.setItem('userLastname', response.data.pessoa.sobrenome);
            localStorage.setItem('userNick', response.data.pessoa.apelido);
            localStorage.setItem('funcao', response.data.funcao.nivelAcesso);
            setLoader(false);
            history.push('/areas');
        } catch (e) {
            alert('Email e/ou senha inválidos');
            setLoader(false);
        }
    };

    return (
        <div className="login-container row">
            <div className="col m4 hide-on-small-only ladoEsquerdo">
                <img src={logoBranco} alt="Comunidade da Graça" />
                <p>Bem vindo!</p>
                <p>Comunidade da Graça</p>
                <p>SBC</p>
            </div>
            <div className="col s12 m8 ladoDireito">
                {loader 
                    ? <div className="loaderDiv">
                        <img src={loaderImg} alt="Loading..." /> 
                    </div>
                    : null
                }
                <form onSubmit={handleLogin}>
                    <div className="row">
                        <div className="col s12 titulo">
                            <h1>FAÇA SEU LOGIN</h1>
                            <img src={logo} alt="Comunidade da Graça" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">mail_outline</i>
                            <input type="email" id="emailInput" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} autoFocus />
                        </div>
                        <div className="input-field col s12">
                            <i className="material-icons prefix">lock_outline</i>
                            <input type="password" id="senhaInput" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} minLength="3" />
                        </div>
                    </div>
                    <div className="row">
                        <button type="submit" className="col s4 offset-s4 buttonSubmit" disabled={!email || !senha}>
                            ENTRAR
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

}