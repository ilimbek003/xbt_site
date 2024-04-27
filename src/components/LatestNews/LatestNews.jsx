import React from "react";
import "./LatestNews.css";
import search from "../../img/search 1.svg";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const LatestNews = ({ color, value, setValue }) => {
  const navigate = useNavigate()
  return (
    <div id="latest__news">
      <div className="container">
        <div style={{display:'flex', alignItems:'center',margin:'0 0 25px 0', cursor:'pointer'}} onClick={() => navigate("/")}>
          <p className="about">Главная</p>
          <FaArrowLeftLong size={24} color="rgba(252, 252, 252, 1)" style={{margin:'0 10px 0 10px'}}/>
          <p className="news">Новости</p>
        </div>
        <div className="latest__news">
          <h1>Последние новости</h1>
          <form className="input_box">
            <img className="search" src={search} alt="" />
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              placeholder="Поиск"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
