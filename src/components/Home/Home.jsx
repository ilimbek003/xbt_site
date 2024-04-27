import React, { useEffect, useState } from "react";
import "./Home.css";
import Blocks from "../Blocks/Blocks";
import rgoup from "../../img/Group 48095472.png";
import img from "../../img/img.png";

const Home = ({ color, data, datas }) => {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("MobileAppPromo") !== "true") {
      setModal(true);
    }
  });

  function closeModal() {
    setModal(false);
    localStorage.setItem("MobileAppPromo", "true");
  }

  return (
    <div className="home">
      {modal === true && (
        <div className="modal-window">
          <div className="modal-overlay"></div>
          <div className="modal-text">
            <div className="modal-mobile-app"></div>
            <div className="modal-text-wrap">
              <h1>Мобильное приложение XBT</h1>
              <p>
                Мы собрали весь функционал криптообменника XBT в мобильном
                приложении.
              </p>
              <div className="app-links">
                <a
                  href="https://play.google.com/store/apps/details?id=com.navisdevs.xbt"
                  target="_blank"
                  className="android"
                >
                  <div>
                    <span>Download from</span>
                    <b>Google play</b>
                  </div>
                </a>
                <a className="ios">
                  <div>
                    <span>Download from</span>
                    <b>Apple Store</b>
                  </div>
                  <small className="qr-code-soon">Скоро</small>
                </a>
              </div>
              <button
                className="btn"
                onClick={() => {
                  closeModal();
                }}
              >
                Понятно
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container">
        <div className="wrapper">
          <h1>
            <span className="first">XBT.KG</span> <br /> - Покупка и продажа
            криптовалюты  не выходя из дома
          </h1>
          <p>
            Прозрачные комиссии, наличие лицензии, большие <br /> резервы и
            отличная репутация гарантируют успех <br /> ваших обменных операций!
          </p>
          <div>
            <img className="home_imades" src={img} alt="" />
          </div>
          <div className="home_button-wrap">
            <img src={rgoup} alt="" />
            <div>
              <p className="projwct_text">
                Отсканируйте, чтобы загрузить приложение
              </p>
              <p className="projwct_ios">iOS и Android</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container_block">
        <Blocks data={data} datas={datas} />
      </div>
    </div>
  );
};

export default Home;
