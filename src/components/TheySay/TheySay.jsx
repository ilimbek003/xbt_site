import React from "react";
import "./TheySay.css";
import avatar from "../../img/Аватарка.svg";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

const TheySay = ({ color, reviewData }) => {
  const navigate = useNavigate();

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1284,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return reviewData ? (
    <div className="they_say">
      <div className="container">
        <h1 className="they_say_h1">Что о нас говорят</h1>
        <div className="they_say_flex">
          <Slider {...settings}>
            {reviewData.map((el, i) => (
              <div className="slide_review"  key={i}>
                <div className="they_say_block">
                  <div className="they_say_block_avatar">
                    <img src={el.photo} alt="" />
                    <h3>{el.fullname}</h3>
                  </div>
                  <p>{el.message}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="they_say_btn_flex">
          <button
            onClick={() => navigate("/feedback")}
            style={{ background: color ? "var(--green)" : "var(--orange)" }}
            className="they_say_btn"
          >
            Все отзывы{" "}
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default TheySay;
