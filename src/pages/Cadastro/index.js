import React, { useCallback, useState } from "react";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";

import getValidationErrors from "../../utils/getValidationsErrors";

import "./styles.scss";

const letrasMinusculas = /(?=.*[a-z])/;
const letrasMaiusculas = /(?=.*[A-Z])/;
const numeros = /(?=.*[0-9])/;

function initialValues() {
    return {
        nome: "",
        sobrenome: "",
        apelido: "",
        email: "",
        senha: "",
        confirmarSenha: "",
    };
}

function initialErrors() {
    return {
        nome: undefined,
        sobrenome: undefined,
        apelido: undefined,
        email: undefined,
        senha: undefined,
        confirmarSenha: undefined,
    };
}

const Cadastro = () => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState(initialErrors);
    const history = useHistory();

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

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            setErrors(initialErrors);

            try {
                const schema = Yup.object().shape({
                    nome: Yup.string().min(3, "Nome muito curto"),
                    sobrenome: Yup.string().min(3, "Sobrenome muito curto"),
                    apelido: Yup.string().min(2, "Apelido muito curto"),
                    email: Yup.string().lowercase().email("Digite um e-mail válido"),
                    senha: Yup.string()
                        .matches(
                            letrasMinusculas,
                            "Deve ter pelo menos uma letra minúscula"
                        )
                        .matches(
                            letrasMaiusculas,
                            "Deve ter pelo menos uma letra maiúscula"
                        )
                        .matches(numeros, "Deve ter pelo menos um número")
                        .min(8, "Deve ter pelo menos 8 caracteres"),
                    confirmarSenha: Yup.string().oneOf(
                        [Yup.ref("senha")],
                        "Deve ser igual a senha"
                    ),
                });

                await schema.validate(values, {
                    abortEarly: false,
                });
            } catch (e) {
                if (e instanceof Yup.ValidationError) {
                    const error = getValidationErrors(e);

                    setErrors(error);
                    return;
                }
            }
        },
        [values]
    );

    return (
        <form onSubmit={handleSubmit}>
            <div className="divInputComErro">
                <input
                    type="text"
                    name="nome"
                    value={values.nome}
                    placeholder="nome"
                    onChange={handleOnChange}
                />
                {errors.nome !== undefined && (
                    <div>
                        <p>{errors.nome}</p>
                        <FiAlertCircle color="#c53030" size={20} />
                    </div>
                )}
            </div>
            <div className="divInputComErro">
                <input
                    type="text"
                    name="sobrenome"
                    value={values.sobrenome}
                    placeholder="sobrenome"
                    onChange={handleOnChange}
                />
                {errors.sobrenome !== undefined && (
                    <div>
                        <p>{errors.sobrenome}</p>
                        <FiAlertCircle color="#c53030" size={20} />
                    </div>
                )}
            </div>
            <div className="divInputComErro">
                <input
                    type="text"
                    name="apelido"
                    value={values.apelido}
                    placeholder="apelido"
                    onChange={handleOnChange}
                />
                {errors.apelido !== undefined && (
                    <div>
                        <p>{errors.apelido}</p>
                        <FiAlertCircle color="#c53030" size={20} />
                    </div>
                )}
            </div>
            <div className="divInputComErro">
                <input
                    type="email"
                    name="email"
                    value={values.email}
                    placeholder="email"
                    onChange={handleOnChange}
                />
                {errors.email !== undefined && (
                    <div>
                        <p>{errors.email}</p>
                        <FiAlertCircle color="#c53030" size={20} />
                    </div>
                )}
            </div>
            <div className="divInputComErro">
                <input
                    type="password"
                    name="senha"
                    value={values.senha}
                    placeholder="senha"
                    onChange={handleOnChange}
                />
                {errors.senha !== undefined && (
                    <div>
                        <p>{errors.senha}</p>
                        <FiAlertCircle color="#c53030" size={20} />
                    </div>
                )}
            </div>
            <div className="divInputComErro">
                <input
                    type="password"
                    name="confirmarSenha"
                    value={values.confirmarSenha}
                    placeholder="confirmarSenha"
                    onChange={handleOnChange}
                />
                {errors.confirmarSenha !== undefined && (
                    <div>
                        <p>{errors.confirmarSenha}</p>
                        <FiAlertCircle color="#c53030" size={20} />
                    </div>
                )}
            </div>
            <button
                type="submit"
                className="Button vermelho"
                disabled={
                    values.nome === "" ||
                    values.sobrenome === "" ||
                    values.apelido === "" ||
                    values.email === "" ||
                    values.senha === "" ||
                    values.confirmarSenha === ""
                }
            >
                Cadastrar
            </button>
        </form>
    );
};

export default Cadastro;
