import React, { useEffect, useState } from "react";
import "./Login.css";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import Loading from "../../components/IU/loading/loading";
import unsplash from "../../img/Group 48095513.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Alert } from "../../components/IU/alert/alert";
import axios from "axios";
import { url } from "../../api";

const Login = ({ color, setIsAuthenticated }) => {
  const [local, setLocal] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);
  const [notActivated, setNotActivated] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [code, setCode] = useState("");
  useEffect(() => {
    document.title = "Логин";
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLocal(token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsNavigating(true);
    try {
      const response = await axios.post(url + "/auth/login", {
        "2fa_otp": code,
        email: email,
        password: password,
      });
      if (response.data.response === true) {
        setIsAuthenticated(true);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("expires", JSON.stringify(response.data.expires));
        navigate("/dashboard/home");
      }
    } catch (error) {
      if (error.response.data.security === "2fa") {
        setModalShow(true);
      }
      if (error.response.data.not_activated === true) {
        navigate("/account-activation/" + email);
      }
      Alert("error", error.response.data.messages);
      setIsNavigating(false);
    }
  };

  return !local ? (
    <div id="login">
      <div className="container">
        <div className="login__flex">
          <div className="login_all">
            <h1>Добро пожаловать!</h1>
            <p>
              Вход в личный кабинет
              {/* <span className="login_span">
                <NavLink
                  style={{ color: color ? "var(--green)" : "var(--orange)" }}
                  to="/register-personal"
                >
                  Зарегистрироваться
                </NavLink>
              </span> */}
            </p>
            <form onSubmit={handleLogin} className="login_from">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type={email}
                placeholder="Ваш Email"
                required
              />
              <div className="input_box">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={visible ? "text" : "password"}
                  placeholder="Ваш пароль"
                  required
                />
                <span
                  className="span-icon"
                  onClick={() => setVisible(!visible)}
                >
                  {" "}
                  {visible ? <FaEye /> : <FaEyeSlash />}{" "}
                </span>
              </div>
              <button
                disabled={isNavigating ? true : false}
                onSubmit={handleLogin}
              >
                {isNavigating ? <Loading /> : "Войти"}
              </button>
              {error && (
                <p style={{ color: "red", fontSize: "16px" }}>{error}</p>
              )}
              <NavLink
                to="/forgot-password"
                style={{ color: color ? "var(--green)" : "var(--orange)" }}
                className="forgot_your_password"
              >
                Забыли пароль?
              </NavLink>
            </form>
          </div>
          <div>
            <div className="block_login_blur_filter"></div>
            <img className="bg_login_imagess" src={unsplash} alt="" />
          </div>
        </div>
      </div>
      {modalShow === true && (
        <div className="modal-window-v2" onClick={() => setModalShow(false)}>
          <div
            className="modal-window-v2-wrap"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Двухфакторная аутентификация</h2>
            <p>Зайдите в свой аунтефикатор и введите полученный код</p>
            <form onSubmit={handleLogin} className="form">
              <input
                type="number"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Введите защитный код *"
                autoFocus
                required
              />
              <button type="submit">
                {isNavigating ? <Loading /> : "Отправить"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  ) : (
    <Navigate to="/" replace state={{ from: window.location.pathname }} />
  );
};

export default Login;
