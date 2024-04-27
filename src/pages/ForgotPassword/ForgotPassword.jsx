import React, { useState } from "react";
import "./ForgotPassword.css";
import unsplash from "../../img/Group 48095513.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgot, postResponse } from "../../store/actions/forgotAction";
import Loading from "../../components/IU/loading/loading";
import { Alert } from "../../components/IU/alert/alert";

const ForgotPassword = ({ color }) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const responseForgot = useSelector((state) => state.forgot);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsNavigating(true);
    try {
      const codeData = {
        email,
      };
      await dispatch(forgot(codeData));
    } catch (error) {
      if (error.response.data.messages) {
        setIsNavigating(false);
        Alert("error", error.response.data.messages);
      }
      setIsNavigating(false);
    }
    localStorage.setItem("data_register", email);
  };

  if (
    responseForgot &&
    responseForgot.responseForgot &&
    responseForgot.responseForgot.response === true
  ) {
    navigate("/login");
    setIsNavigating(false);
    Alert("success", responseForgot.responseForgot.messages);
    dispatch(postResponse(false));
  }

  return (
    <div className="forgot_password">
      <div className="container">
        <div className="wrapper">
          <div className="wrapper_login">
            <h1>Сбросить пароль</h1>
            <p> Укажите ваш Email, который использовался при регистрации</p>
            <form onSubmit={handleSubmit}>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                value={email}
                placeholder="E-mail"
              />
              <div className="forgot-btn">
                <button
                  disabled={isNavigating ? true : false}
                  onSubmit={handleSubmit}
                  className="btn"
                >
                  {isNavigating ? <Loading /> : "Отправить"}
                </button>
              </div>
            </form>
          </div>
          <div>
            <div className="block_login_blur_filter"></div>
            <img className="bg_login_imagess" src={unsplash} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
