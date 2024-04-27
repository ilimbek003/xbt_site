import React, { useEffect, useState } from "react";
import "./Feedback.css";
import Loading from "../../components/IU/loading/loading";
import axios from "axios";
import { url } from "../../api";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../components/IU/alert/alert";
import { FaArrowLeftLong } from "react-icons/fa6";

const Feedback = ({ loading, color, data }) => {
  const [local, setLocal] = useState("");
  const [text, setText] = useState("");
  const [personal, setPersonal] = useState([]);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Отзывы";
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLocal(token);
    }
  }, []);

  const headers = {
    Authorization: `Bearer ${local}`,
  };

  function OpenModal() {
    if (local) {
      setModal(true);
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    if (local) {
      axios
        .get(url + "/profile/personal", { headers })
        .then((response) => {
          setPersonal(response.data);
        })
        .catch((error) => {
          // console.error("Error:", error);
        });
    }
  }, [local]);

  const SendMessages = async (e) => {
    e.preventDefault();
    try {
      const newData = {
        fullname: `${personal.profile.firstname} ${personal.profile.lastname}`,
        email: personal.profile.email,
        message: text,
      };
      const response = await axios.post(url + "/reviews/add", newData, {
        headers,
      });
      if (response.data.response == true) {
        Alert("success", response.data.messages);
        setText("");
        setModal(false);
      }
    } catch (error) {
      Alert("error", error.response.data.messages);
    }
  };

  return (
    <div id="feed_back">
      {loading ? (
        <div className="loading_div">
          <Loading />
        </div>
      ) : (
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "45px 0 25px 0",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            <p className="about">Главная</p>
            <FaArrowLeftLong
              size={24}
              color="rgba(252, 252, 252, 1)"
              style={{ margin: "0 10px 0 10px" }}
            />
            <p className="news">Отзывы</p>
          </div>
          <h1>Отзывы</h1>
          {data ? (
            <div className="all__block">
              {data.map((el, index) => (
                <div key={index} className="users_block">
                  <img src={el.photo} alt="" />
                  <div className="user_all">
                    <div className="all_h5_h6">
                      <h5>{el.fullname}</h5>
                      <p>{el.message}</p>
                      <h6>{el.date}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              Нет отзывов
            </p>
          )}
          <p className="reviews">Оcтавить отзыв </p>
          <div className="flex_reviews">
            <p className="proj">
              Мы работаем для вас каждый день улучшая свой сервис! <br /> Мы
              будем очень рады если вы оставите нам свой честный <br /> отзыв!
              Мы всегда готовы меняться и работать для вашего <br /> удобства
            </p>
            <form onSubmit={SendMessages}>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                placeholder="Добавить отзыв"
              ></textarea>
              <button onClick={SendMessages}>Добавить</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;
