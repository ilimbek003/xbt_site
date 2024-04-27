import React from "react";
import "./Cabinet.css";
import Slider from "react-slick";
import { MdEmail, MdOutlineDateRange } from "react-icons/md";
import { AiFillSafetyCertificate } from "react-icons/ai";
import Loading from "../../components/IU/loading/loading";
import { NavLink, useNavigate } from "react-router-dom";

const Cabinet = ({ color, datas, loading, datas_personal, datas_log }) => {
  const navigate = useNavigate();
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="cabinet">
      {loading ? (
        <div className="loading_div">
          <Loading />
        </div>
      ) : (
        <div className="">
          <div className="flex_wey">
            <h1 className="h1">Ваши кошельки</h1>
            <h1 className="h1">Ваши данные</h1>
          </div>
          <div className="wrapper_history">
            <div className="wrapper">
              {datas ? (
                datas.map((el,id) => (
                  <div className={`box ${id == 0 && "first"}`} key={el.id}>
                    <div className="save">
                      <div
                        style={{
                          width: "50%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div className="content" style={{ width: "60%" }}>
                          <img src={el.logo} alt="" />
                          <div className="h1">
                            <h1>{el.currency}</h1>
                            <p>{el.name}</p>
                          </div>
                        </div>
                        <div style={{ width: "40%" }}>
                          <h1>{el.balance}</h1>
                          <h1
                            style={{
                              color:
                                el.converted_balance > 0 ? "#0F8F67" : "red",
                            }}
                          >
                            ${el.converted_balance}
                          </h1>
                        </div>
                      </div>
                      <div className="btns" style={{ width: "50%" }}>
                        <button
                          disabled={el.can_deposit ? false : true}
                          onClick={() =>
                            navigate(`/dashboard/top-up/${el.currency}`)
                          }
                          style={{
                            background: el.can_withdraw
                              ? "transparent"
                              : "#262a32",
                            border: el.can_withdraw
                              ? "1px solid rgba(115, 244, 173, 1)"
                              : "1px solid #cdcdcd",
                            color: el.can_deposit ? "#FFF" : "#cdcdcd",
                            cursor: el.can_deposit ? "pointer" : "not-allowed",
                          }}
                          className="commiss"
                        >
                          Ввод
                        </button>
                        <button
                          disabled={el.can_withdraw ? false : true}
                          onClick={() =>
                            navigate(`/dashboard/translation/${el.currency}`)
                          }
                          style={{
                            background: el.can_withdraw
                              ? "transparent"
                              : "#262a32",
                            border: el.can_withdraw
                              ? " 1px solid rgba(141, 106, 226, 1)"
                              : "1px solid #cdcdcd",
                            color: el.can_withdraw ? "#FFF" : "#cdcdcd",
                            cursor: el.can_withdraw ? "pointer" : "not-allowed",
                          }}
                          className="conclusion"
                        >
                          Вывод
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h1>данных нет</h1>
              )}
            </div>
            <div className="wrapper_accaunt">
              {datas_personal[0] ? (
                <div className="save_box two">
                  <h1>Лимиты за текущий день</h1>
                  <div className="replenishment">
                    <p>Пополнение</p>
                    <p>Продажа</p>
                    <p>Покупка</p>
                  </div>
                  <div className="replenishment info">
                    <p>
                      {datas_personal[0].limits.refill} <small>USDT</small>
                    </p>
                    <p>
                      {datas_personal[0].limits.sell} <small>USDT</small>
                    </p>
                    <p>
                      {datas_personal[0].limits.buy} <small>USDT</small>
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="save_box three">
                <h1 className="title-v1">Персональные данные</h1>
                {loading
                  ? ""
                  : datas_personal.map((el, id) => (
                      <div key={id} className="content_three">
                        <div className="content_box">
                          <MdEmail
                            size={20}
                            color={color ? "var(--green)" : "var(--orange)"}
                          />{" "}
                          <div>
                            <p className="text">Дата регистрации</p>
                            <p>{el.date_register}</p>
                          </div>
                        </div>
                        <div className="content_box">
                          <MdOutlineDateRange
                            size={20}
                            color={color ? "var(--green)" : "var(--orange)"}
                          />
                          <div>
                            <p className="text">Последний вход</p>
                            <p>{el.last_access}</p>
                          </div>
                        </div>
                        <div className="content_box">
                          <AiFillSafetyCertificate
                            size={22}
                            color={color ? "var(--green)" : "var(--orange)"}
                          />{" "}
                          <div>
                            <p className="text">Электронная почта</p>
                            <p>{el.email}</p>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cabinet;
