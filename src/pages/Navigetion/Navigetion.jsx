import React, { useEffect } from "react"
import { NavLink, useParams } from "react-router-dom"
import axios from "axios"
import { url } from "../../api"
import { Alert } from "../../components/IU/alert/alert"
import "./Navigetion.css"

const Navigetion = () => {
  const { email } = useParams()

  async function resendActivationCode() {
    try {
      const response = await axios.post(url + "/auth/activation/resend", { email: email })
      if (response.data.response === true) {
        Alert("success", response.data.messages)
      }
    } catch (error) {
      Alert("error", error.response.data.messages)
    }
  }

  return (
    <div className="default-wrap">
      <div className="container min-height-80vh align-center justify-center main-padding-top">
        <div className="wrapper_navigetion text-center">
          <h1 className="title pb-1">Подтверждение аккаунта</h1>
          <p className="text">Мы отправили вам на почту ссылку для подтверждения аккаунта.</p>
          <p className="text pb-3">Пожалуйста, перейдите по ссылке чтобы активировать аккаунт</p>
          <NavLink to="/login" className="button block mb-3" style={{ display: "block" }}>Продолжить</NavLink>
          <a style={{ color: "var(--green)" }} onClick={resendActivationCode}>Отправить еще раз</a>
        </div>
      </div>
    </div>
  );
};

export default Navigetion;
