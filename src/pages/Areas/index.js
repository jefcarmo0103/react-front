import React, { useState, useEffect, useContext } from "react";
import "./styles.scss";
import StoreContext from "../../hooks/Context";
import { useHistory } from "react-router-dom";

import api from "../../services/api";

export default function Area() {
    const [areas, setAreas] = useState([]);

    const history = useHistory();

    const { token } = useContext(StoreContext);
    const userSalvo = localStorage.getItem("@ComunaSBC:user");

    useEffect(() => {
        api.get("/menu", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setAreas(res.data);
            })
            .catch((err) => {
                alert("Necessário fazer login novamente");
                return history.push("/");
            });
    }, [token, history]);

    function handleLogout() {
        localStorage.clear();
        history.push("/");
    }

    return (
        <div className="area-container">
            <header>
                <span>Bem vindo, {userSalvo}</span>

                <button type="button" onClick={() => handleLogout()}>
                    Sair
                </button>
            </header>

            <ul>
                {areas
                    .sort(function (a, b) {
                        return a.nomeArea < b.nomeArea
                            ? -1
                            : a.nomeArea > b.nomeArea
                            ? 1
                            : 0;
                    })
                    .map((area) => (
                        <li key={area.idArea} className={area.corArea}>
                            <strong>{area.nomeArea}</strong>
                            <div>.</div>
                        </li>
                    ))}
            </ul>
        </div>
    );
};
