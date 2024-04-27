import React from "react";
import "./Blocks.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

const Blocks = ({ data, datas }) => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1284,
        settings: {
          slidesToShow: 4,
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
        breakpoint: 824,
        settings: {
          slidesToShow: 2,
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
  return (
    <div className="blocks_comp">
      <p className="course">Курсы криптовалют</p>
      <div className="width">
        <Slider {...settings} className="slider_block">
          {data.map((el, index) => (
            <div key={index} className="home_block">
              <div className="box_block_block">
                <div className="absolune">
                  <p>
                    <img className="logo_img" src={el.logo} alt="" /> {el.name}{" "}
                  </p>
                  <h1>
                    <span className="dollar">$</span> {el.rate}
                  </h1>
                </div>
                <div className="margen">
                  {el.difference.includes("-") ? (
                    <MdKeyboardArrowDown className="down" />
                  ) : (
                    <MdKeyboardArrowUp className="row_up" />
                  )}
                  <p
                    style={{
                      color: el.difference.includes("-")
                        ? "red"
                        : "#30E0A1",
                    }}
                  >
                    {el.difference}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Blocks;
