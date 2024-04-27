import React, { useEffect, useState } from 'react';
import axios from "axios";
import { url } from "../../api";
import { Alert } from "../../components/IU/alert/alert";
import "./Authenticator.css"
import Loading from "../../components/IU/loading/loading";

const Authenticator = ({ setButton, setState, data2fa, modal2fa, setModal2fa, modal2f, setModal2f, is2faEnabled }) => {
    const [local, setLocal] = useState("");
    const security = data2fa ? Object.values(data2fa).map((el) => el) : [];
    const [num, setNum] = useState("");
    const [disable, setDisable] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setLocal(token);
        }
    }, []);

    const headers = {
        Authorization: `Bearer ${local}`,
    };
    const handleCopyButtonClick = () => {
        const tempTextArea = document.createElement("textarea");
        tempTextArea.value = security && security[1];
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand("copy");
        document.body.removeChild(tempTextArea);
        Alert("success", "успешно скопировано !");
    }
    const securityValue = security && security[1];

    const handleEnable = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const requestData = {
                '2fa_otp': num,
                '2fa_secret': securityValue,
            };
            const response = await axios.post(url + "/profile/security/2fa/enable/", requestData, { headers });
            setLoading(false)
            if (response.data.response === true) {
                setModal2fa(false);
                Alert('success', 'Успешно Включено')
            } else {
                setModal2fa(true)
            }
        } catch (error) {
            alert(error.messages);
        }
    };
    const handleDisable = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const disableNum = {
                "2fa_otp": disable
            }
            const response = await axios.post(url + "/profile/security/2fa/disable/", disableNum, { headers })
            if (response.data.response === true) {
                setModal2f(false)
                Alert('success', 'Успешно Отключено')
            }

            setLoading(false)
        } catch (error) {
            Alert("error", error.messages)
        }
    }
    return (

        <div className="authenticator">
            {
                modal2fa &&
                <div className="modal2fa" onClick={() => setModal2fa(false)}>
                    <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                        <div className="acc">
                            <h1>Двухфакторная авторизация</h1>
                            <p>Это дополнительный уровень защиты для Вашего аккаунта.</p>
                        </div>
                        <div className="market">
                            <img src={security[0]} alt="2FA" />
                            <div>
                                <p>Загрузите приложение Google Authenticator с Play Market или App Store. Далее,
                                    в мобильном приложении отсканируйте этот QR-код. Если Ваше мобильное
                                    приложение не поддерживает QR-коды, введите следующий код:</p>
                                <div className="display_2fa">
                                    <button onClick={handleCopyButtonClick} className="generate">
                                        Скопировать
                                    </button>
                                    <h5>{security[1]}</h5>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={handleEnable}>
                            <input
                                type="number"
                                placeholder="Введите защитный код *"
                                value={num}
                                onChange={(e) => setNum(e.target.value)}
                                required
                            />
                            <button
                                onClick={() =>
                                    is2faEnabled === true
                                }
                                type="submit">
                                {loading ? <Loading /> : "Включить"}
                            </button>

                        </form>
                    </div>
                </div>
            }
            {
                modal2f &&
                <div className="modal-window-v2" onClick={() => setModal2f(false)}>
                    <div className="modal-window-v2-wrap" onClick={(e) => e.stopPropagation()}>
                        <div className="acc">
                            <h1>Двухфакторная аутентификация</h1>
                            <p>Зайдите в свой аунтефикатор и введите полученный код</p>
                        </div>
                        <form onSubmit={handleDisable} className="form">
                            <input
                                type="number"
                                value={disable}
                                onChange={(e) => setDisable(e.target.value)}
                                placeholder="Введите защитный код *"
                                required
                                autoFocus
                            />
                            <button
                                onClick={() =>
                                    is2faEnabled === false
                                }
                                type="submit"
                            >
                                {loading ? <Loading /> : "Продолжить"}
                            </button>
                        </form>
                    </div>
                </div>
            }
        </div>
    );
};

export default Authenticator;