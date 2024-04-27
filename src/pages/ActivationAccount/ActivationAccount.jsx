import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { url } from "../../api"
import "../Navigetion/Navigetion.css"
import { GoCheckCircle } from "react-icons/go"
import { GoClock } from "react-icons/go"
import { LiaTimesCircleSolid } from "react-icons/lia"

const ActivationAccount = ({ setIsAuthenticated }) => {
    const [loading, setLoader] = useState(false)
    const [confirmationState, setConfirmatioState] = useState('')
    const [confirmationText, setConfirmatioText] = useState('')
    const navigate = useNavigate()
    const { token } = useParams()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            const confirm = async () => {
                try {
                    setLoader(true)
                    const response = await axios.get(url + '/auth/activation/confirm/' + token)
                    if (response.data.response === true) {
                        setConfirmatioState(true)
                        setLoader(false)
                        if (response.data.token) {
                            setTimeout(() => {
                                setIsAuthenticated(true)
                                localStorage.setItem('token', response.data.token)
                                localStorage.setItem('expires', JSON.stringify(response.data.expires))
                                navigate('/dashboard/home')
                            }, 1500)
                        }
                    }
                } catch (error) {
                    setConfirmatioState(false)
                    setConfirmatioText(error.response.data.messages)
                    setLoader(false)
                }
            }
            confirm()
        }
    }, [token])

    return (
        <div className="default-wrap">
            <div className="container min-height-80vh align-center justify-center main-padding-top">
                <div className="wrapper_navigetion text-center">
                    {confirmationState === true && (
                        <GoCheckCircle className="text-success mb-2" size="84" />
                    )}
                    {confirmationState === false && (
                        <LiaTimesCircleSolid className="text-danger mb-2" size="84" />
                    )}
                    {confirmationState === '' && (
                        <GoClock className="text-warning mb-2" size="84" />
                    )}
                    {confirmationText === '' ? (
                        <h1 className="title">Подтверждение регистрации</h1>
                    ) : (
                        <h1 className="title">{confirmationText}</h1>
                    )}
                    <p className="text pb-3">Вы можете войти в систему, используя свой адрес электронной почты и пароль.</p>
                    <button
                        type="button"
                        className="button button-loader block md"
                        disabled={loading}
                        onClick={() => { navigate('/login') }}
                    >
                        Продолжить
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ActivationAccount
