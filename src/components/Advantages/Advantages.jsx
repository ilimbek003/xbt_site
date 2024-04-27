import React from "react";
import "./Advantages.css";
import Slider from "react-slick";
import bybit from "../../img/whitebit.svg";
import whitebit from "../../img/whitebit.svg";
import pay from "../../img/logo.227fa597.png";
import binance from "../../img/1681906234binance-logo-png.png";
// import bybit from "../../img/Безназвания.svg";
import kraken from "../../img/kraken-4.svg";
import bitfinex from "../../img/bitfinex.png";
import sumsub from "../../img/sumsub.png";
const Advantages = () => {
  const settingsLeft = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 429,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const settingsRight = {
    ...settingsLeft,
    rtl: true,
  };
  return (
    <div id="advantages">
      <div className="slider">
        <Slider {...settingsLeft}>
          <div>
            <img src={pay} alt="" />
          </div>
          <div>
            <img src={binance} alt="" />
          </div>
          <div>
            <img src={bybit} alt="" />
          </div>
          <div>
            <img src={kraken} alt="" />
          </div>
          <div>
            <img src={bitfinex} alt="" />
          </div>
          <div>
            <img src={whitebit} alt="" />
          </div>
          <div>
            <img src={sumsub} alt="" />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Advantages;
