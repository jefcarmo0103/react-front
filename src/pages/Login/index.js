import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import StoreContext from '../../hooks/Context';
import { FiArrowRight } from 'react-icons/fi';
import './styles.scss';

import api from '../../services/api';

import loaderImg from '../../assets/loader.svg';
import logoBranco from '../../assets/logoComunaBranco.png';

function initialValues() {
    return { email: '', password: '' }
}

const Login = () => {
    const [values, setValues] = useState(initialValues);
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false);
    const history = useHistory();
    const { setToken } = useContext(StoreContext);

    useState(() => {
        if (localStorage.getItem('@ComunaSBC:accessToken')) {
            return history.push('/areas');
        }
    }, [])

    function handleOnChange(e) {
        const { value, name } = e.target;

        setValues({
            ...values,
            [name]: value
        })
    };

    function handleOnSubmit(e) {
        e.preventDefault();
        setLoader(true);
        api.post('login', {email: values.email, senha: values.password}).then((res) => {
            localStorage.setItem('@ComunaSBC:user', res.data.user);
            setToken(res.data.token.accessToken);
            setLoader(false);
            return history.push('/areas');
        }).catch((err) => {
            setLoader(false);
            setError('Email e/ou senha inválidos');
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
                <form onSubmit={handleOnSubmit}>
                    <p>Login</p>
                    <div className="row">
                        <div className="input-field col s12">
                            <input type="email" className="validate" id="emailInput" value={values.email} name="email" onChange={handleOnChange} autoFocus />
                            <label htmlFor="emailInput">E-mail</label>
                        </div>
                        <div className="input-field col s12">
                            <input type="password" className="validate" id="senhaInput" value={values.password} name="password" onChange={handleOnChange} />
                            <label htmlFor="senhaInput">Senha</label>
                        </div>
                    </div>
                    <div className="row">
                        {error && (
                            <div className="user-login__error">{error}</div>
                        )}
                        <button type="submit" className="col s12 buttonSubmit" disabled={values.email === '' || values.password === ''}>
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

export default Login;