import React from "react";
import "./Amazing.css";
import FeatureImage1 from "../../img/one.svg";
import FeatureImage2 from "../../img/two.svg";
import FeatureImage3 from "../../img/three.svg";
import FeatureImage4 from "../../img/four.svg";
import { NavLink } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Amazing = () => {
  return (
    <div className="amazing">
      <div className="container">
        <h1 className="title">Популярные криптовалюты</h1>
        <p className="title_text">
          Изучите сенсационные функции, чтобы подготовить свои лучшие инвестиции
          в криптовалюту
        </p>
        <div className="wrapper">
          <div className="box">
            <img src={FeatureImage1} alt="" className="box_img" />
            <p className="box_title">Простота</p>
            <p className="box_descripiton">
              Вы сможете начать операции всего в несколько кликов без лишней
              сложности.
            </p>
            <NavLink className="link" to="">
              Подробнее <FaArrowRight color="#4ac49e" size={15} />
            </NavLink>
          </div>
          <div className="box">
            <img src={FeatureImage2} alt="" className="box_img" />
            <p className="box_title">Безопасность</p>
            <p className="box_descripiton">
              Ваша защита и безопасность наш главный приоритет.
            </p>
            <NavLink className="link" to="">
              Подробнее <FaArrowRight color="#4ac49e" size={15} />
            </NavLink>
          </div>
          <div className="box">
            <img src={FeatureImage3} alt="" className="box_img" />
            <p className="box_title">Разнообразие</p>
            <p className="box_descripiton">
              Мы предлагаем широкий выбор криптовалютных активов и гибкие
              способы оплаты.
            </p>
            <NavLink className="link" to="">
              Подробнее <FaArrowRight color="#4ac49e" size={15} />
            </NavLink>
          </div>
          <div className="box">
            <img src={FeatureImage4} alt="" className="box_img" />
            <p className="box_title">Поддержка</p>
            <p className="box_descripiton">
              Наша служба поддержки всегда рядом, готова помочь с вопросом и
              проблемой моментально.
            </p>
            <NavLink className="link" to="">
              Подробнее <FaArrowRight color="#4ac49e" size={15} />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Amazing;
