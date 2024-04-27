import React, { useState, useEffect } from "react";
import "./Settings.css";
import { FaPen } from "react-icons/fa";
import password from "../../img/banner.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BsCheckCircle } from "react-icons/bs";
import { url } from "../../api";
import axios from "axios";
import Loading from "../../components/IU/loading/loading";
import turn from "../../img/turn.svg";
import { Alert } from "../../components/IU/alert/alert";
import Authenticator from "../Authenticator/Authenticator";

const Settings = ({
  datas_personal,
  personalChange,
  is2faEnabled,
  setAccount,
  account,
  setProfile,
  profile,
}) => {
  const [countryApp, setCountryApp] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [visible2, setVisible2] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [local, setLocal] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible1, setVisible1] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [safety, setSafety] = useState(false);
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("");
  const [modal2fa, setModal2fa] = useState(false);
  const [modal2f, setModal2f] = useState(false);
  const [data2fa, setData2fa] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLocal(token);
    }
  }, []);
  const headers = {
    Authorization: `Bearer ${local}`,
  };
  const handleImageChange = (event) => {
    const imageFile = event.target.files && event.target.files[0];
    if (imageFile) {
      setSelectedImage(imageFile);
      const formData = new FormData();
      formData.append("photo", imageFile);
      axios
        .post(url + "/profile/personal/edit", formData, { headers })
        .then((response) => {
          Alert("success", response.data.messages);
          personalChange();
        })
        .catch((error) => {
          alert.error("Ошибка загрузки изображения:", error);
        });
    }
  };
  const renderImagePreview = () => {
    if (selectedImage) {
      return <img src={URL.createObjectURL(selectedImage)} alt="Preview" />;
    } else {
      return (
        <img src={datas_personal ? datas_personal[0].avatar : ""} alt="" />
      );
    }
  };
  const updateData = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      Alert("error", "Введенные пароли не совпадают");
      return;
    }
    try {
      const newData = {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      };
      const response = await axios.post(url + `/profile/password`, newData, {
        headers,
      });
      Alert("success", response.data.messages);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setVisible1(false);
      setVisible2(false);
    } catch (error) {
      Alert("error", error.response.data.messages);
    }
  };
  const NameChange = async (e) => {
    e.preventDefault();
    try {
      const newDataName = {
        firstname,
        lastname,
      };
      const response = await axios.post(
        url + `/profile/personal/edit-profile`,
        newDataName,
        {
          headers,
        }
      );
      if (response.data.response == true) {
        Alert("success", response.data.messages);
        personalChange();
      }
    } catch (error) {
      Alert("error", error.response.data.messages);
    }
  };
  useEffect(() => {
    if (local) {
      axios
        .get(url + "/countries/", { headers })
        .then((response) => {
          setCountryData(response.data);
        })
        .catch();
    }
  }, [local]);
  useEffect(() => {
    setLoading(true);
  }, []);
  function countryFunc(count) {
    setCountry(count.name);
    setCountryApp(count.code);
  }
  const handle2faGenerate = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        url + "/profile/security/2fa/generate/",
        null,
        { headers }
      );
      setLoading(false);
      if (response.status === 200) {
        setData2fa(response.data.security);
      }
    } catch (error) {
      setLoading(false);
      setData2fa("Ошибка при выполнении запроса");
    }
  };

  useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    if (params.get("tab") === "KYC") {
      setProfile(false);
      setAccount(true);
      setSafety(false);
    }
    if (params.get("tab") === "security") {
      setProfile(false);
      setAccount(false);
      setSafety(true);
    }
  }, []);

  return (
    <div className="settings">
      {datas_personal[0] ? (
        <div>
          <div className="header_set">
            <h1>Настройки аккаунта</h1>
            <div className="menu_set">
              <button
                style={{
                  borderBottom: profile
                    ? "1px solid var(--green)"
                    : "#00000000",
                }}
                onClick={() =>
                  setProfile(true) || setAccount(false) || setSafety(false)
                }
                className="nav"
              >
                Настройки профиля
              </button>
              <button
                style={{
                  borderBottom: account
                    ? "1px solid var(--green)"
                    : "#00000000",
                }}
                onClick={() =>
                  setProfile(false) || setAccount(true) || setSafety(false)
                }
                className="nav"
              >
                Верификация акаунта
              </button>
              <button
                style={{
                  borderBottom: safety ? "1px solid var(--green)" : "#00000000",
                }}
                onClick={() =>
                  setProfile(false) || setAccount(false) || setSafety(true)
                }
                className="nav"
              >
                Безопасность
              </button>
            </div>
          </div>
          {profile && (
            <div className="wrapper_data">
              <p className="modify_data">Изменить данные</p>
              <div className="wrapper">
                <div className="wrapper_set">
                  <div className="not_arrowed">
                    <div className="user">
                      <form onSubmit={handleImageChange}>
                        <label>
                          {renderImagePreview()}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                          />
                        </label>
                      </form>
                      <div className="user_data">
                        <p>Обновить фото профиля</p>
                      </div>
                      <FaPen className="icon" size={20} />
                    </div>
                    <form onSubmit={NameChange} className="not_input">
                      <input
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        type="text"
                        placeholder="Имя"
                      />
                      <input
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        type="text"
                        placeholder="Фамилия"
                      />
                      <input
                        className="disabled"
                        disabled={true}
                        type="text"
                        placeholder="Номер Телефона"
                      />
                      <input
                        className="disabled"
                        disabled={true}
                        value={
                          datas_personal[0].email ? datas_personal[0].email : ""
                        }
                        type="text"
                        placeholder="Электронная почта"
                      />
                      <button onSubmit={NameChange} className="save">
                        Сохранить
                      </button>
                    </form>
                  </div>
                </div>
                <form onSubmit={updateData}>
                  <div className="wrapper_set">
                    <img className="pass" src={password} alt="" />
                    <input
                      required
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      type="text"
                      placeholder="Старый пароль"
                    />
                    <div className="relative">
                      <input
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="password"
                        type={visible1 ? "text" : "password"}
                        placeholder="Придумайте пароль"
                      />
                      <div
                        className="span-icon"
                        onClick={() => setVisible1(!visible1)}
                      >
                        {" "}
                        {visible1 ? <FaEye /> : <FaEyeSlash />}
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="password"
                        type={visible2 ? "text" : "password"}
                        placeholder="Повторите новый пароль"
                      />
                      <div
                        className="span-icon"
                        onClick={() => setVisible2(!visible2)}
                      >
                        {" "}
                        {visible2 ? <FaEye /> : <FaEyeSlash />}{" "}
                      </div>
                    </div>
                    <button type="submit" className="save">
                      Сохранить
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {account && (
            <div>
              {datas_personal[0].verification.value != 2 && loading ? (
                <div className="loading_div">
                  <Loading />
                </div>
              ) : (
                ""
              )}
              {datas_personal[0].verification.value == 2 ? (
                <p className="activeited_true">
                  {datas_personal[0].verification.name}
                  <BsCheckCircle
                    className="icon_ver"
                    color="var(--green)"
                    size={100}
                  />
                </p>
              ) : datas_personal[0].verification.value == 1 ||
                datas_personal[0].verification.value == 3 ||
                datas_personal[0].verification.value == 4 ? (
                <div>
                  <iframe
                    src={"https://api.xbt.kg/ru/sumsub/widget?token=" + local}
                    allow="camera; microphone; geolocation"
                    className="iframe-verification"
                    style={{ display: !loading && "block" }}
                    onLoad={() => {
                      setLoading(false);
                    }}
                  ></iframe>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
          {safety && (
            <div className="capsula">
              <img src={turn} alt="" />
              <div>
                <p>
                  Используется для ввода кода подтверждения Google при снятии и
                  изменении настроек безопасности
                </p>
                {is2faEnabled === false && (
                  <button
                    style={{ background: " rgba(37, 31, 51, 1)" }}
                    className="turn"
                    onClick={() => {
                      handle2faGenerate();
                      setModal2fa(!modal2fa);
                    }}
                  >
                    Включить
                  </button>
                )}
                {is2faEnabled === true && (
                  <button
                    style={{ background: "var(--orange)" }}
                    className="turn"
                    onClick={() => {
                      setModal2f(!modal2f);
                    }}
                  >
                    Отключить
                  </button>
                )}
              </div>
            </div>
          )}
          <Authenticator
            is2faEnabled={is2faEnabled}
            data2fa={data2fa}
            setModal2fa={setModal2fa}
            modal2fa={modal2fa}
            setModal2f={setModal2f}
            modal2f={modal2f}
          />
        </div>
      ) : (
        <div className="loading_div">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Settings;
