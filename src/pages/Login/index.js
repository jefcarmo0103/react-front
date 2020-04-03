import React, { useState } from 'react';
import './styles.scss';

import logoBranco from '../../assets/logoComunaBranco.png';

export default function Login() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    return (
        <div className="login-container row">
            <div className="col m4 hide-on-small-only ladoEsquerdo">
                <img src={logoBranco} alt="Comunidade da Graça" />
                <p>Bem vindo!</p>
                <p>Comunidade da Graça</p>
                <p>SBC</p>
            </div>
            <div className="col s12 m8 ladoDireito">
                <form>
                    <div className="row">
                        <div className="input-field col s12">
                            <i class="material-icons prefix">mail_outline</i>
                            <input type="email" id="emailInput" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} autoFocus />
                        </div>
                        <div className="input-field col s12">
                            <i class="material-icons prefix">lock_outline</i>
                            <input type="password" id="senhaInput" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} minLength="3" />
                        </div>
                    </div>
                    <div className="row">
                        <button className="col s4 offset-s4" disabled={!email || !senha}>
                            LOGIN
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

}