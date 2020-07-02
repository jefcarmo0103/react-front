import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import StoreContext from "../../hooks/Context";
import { useToast } from "../../hooks/toast";
import "./styles.scss";

import api from "../../services/api";

import waveImg from "../../assets/wave.png";
import bgLoginImg from "../../assets/bg.svg";

import Button from "../../components/Button";

function initialValues() {
    return { email: "", password: "" };
}

const Login = () => {
    const [values, setValues] = useState(initialValues);
    const [loader, setLoader] = useState(false);
    const history = useHistory();
    const { setToken } = useContext(StoreContext);
    const { addToast } = useToast();

    useState(() => {
        if (localStorage.getItem("@ComunaSBC:accessToken")) {
            return history.push("/areas");
        }
    }, []);

    function handleOnChange(e) {
        const { value, name } = e.target;

        setValues({
            ...values,
            [name]: value,
        });
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        setLoader(true);
        api.post("login", { email: values.email, senha: values.password })
            .then((res) => {
                localStorage.setItem("@ComunaSBC:user", res.data.user);
                setToken(res.data.token.accessToken);
                setLoader(false);
                return history.push("/areas");
            })
            .catch((err) => {
                setLoader(false);
                addToast({
                    type: "error",
                    title: "Erro na autenticação",
                    description:
                        "Ocorreu um erro ao fazer login, cheque as credenciais.",
                });
            });
    }
    
    return (
        <div>
            <img className="wave" src={waveImg} />
            <div className="container">
                <div className="img">
                    <img src={bgLoginImg}/>
                </div>
                <div className="login-content"> 
                    <form onSubmit={handleOnSubmit}>
                    <p>Login</p>
                        <div className="row">
                            <div className="divInputComErro">
                                <input
                                    type="text"
                                    className="validate"
                                    placeholder="Usuário"
                                    id="userlInput"
                                    value={values.email}
                                    name="user"
                                    onChange={handleOnChange}
                                    autoFocus
                                />
                            </div>
                            <div className="divInputComErro">
                                <input
                                    type="password"
                                    className="validate"
                                    placeholder="Senha"
                                    id="senhaInput"
                                    value={values.password}
                                    name="password"
                                    onChange={handleOnChange}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
