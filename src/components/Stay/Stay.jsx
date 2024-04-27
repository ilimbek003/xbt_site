import React, { useEffect, useState } from "react";
import "./Stay.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../../api";

const Stay = ({ color }) => {
  const navigate = useNavigate();
  const [stay, setStay] = useState([]);
  const stayData = stay ? stay : [];
  const stays = Object.values(stayData).map((data) => data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url + "/index");
        setStay(response.data.news);
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <div id="stay">
      <div className="container">
        <div className="news-all">
          <div className="news_foto" style={{ width: "42%" }}>
            <h2>Последние новости</h2>
            <p>
              Наше видение заключается в продвижении <br /> свободы денег. Мы
              верим, что, продвигая эту <br /> свободу, мы можем повлиять на
              качество <br /> жизни по всему миру.
            </p>
            <button onClick={() => navigate("/News")} className="btn">
              Смотреть все
            </button>
          </div>
          {stay ? (
            <div className="scroll">
              {" "}
              {stays.map((el, id) => (
                <div
                  key={id}
                  className="width"
                  onClick={() => navigate("/news/" + el.id)}
                >
                  <div key={id} className="skey_block">
                    <div className="news-photo">
                      <img className="photo" src={el.photo} alt="" />
                    </div>
                    <div style={{ padding: "0 20px 15px 20px" }}>
                      <h4 color="#fff">{el.name} </h4>
                      <p className="date">{el.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="not_data">
              <h1 style={{ color: color ? "var(--green)" : "var(--orange)" }}>
                Новостей нет
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stay;
