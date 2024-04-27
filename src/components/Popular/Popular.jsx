import React, { useState, useEffect } from "react";
import "./Popular.css";
import { useNavigate } from "react-router-dom";
import { Alert } from "../IU/alert/alert";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

const Popular = ({ color, data, datas }) => {
  const navigate = useNavigate();
  const [dataFromLocalStorage, setDataFromLocalStorage] = useState(false);

  useEffect(() => {
    const emailFromLocalStorage = localStorage.getItem("data_register");
    setDataFromLocalStorage(!!emailFromLocalStorage);
  }, []);

  const handleStartTrading = () => {
    if (!dataFromLocalStorage) {
      navigate("/register-personal");
      Alert("warning", "вы не авторизован");
    } else {
      navigate("/dashboard/buy-cryptocurrency");
    }
  };

  return (
    <div className="popular">
      <div className="container">
        <h1>Популярные криптовалюты</h1>
        <div className="wrapper">
          <table>
            <thead className="border">
              <tr>
                <th>
                  <p>Торговая пара</p>
                </th>
                <th>
                  <p>Цена</p>
                </th>
                <th>
                  <p>Обьем 24ч (USDT)</p>
                </th>
                <th className="market_pas">
                  <p>Рынок</p>
                </th>
                <th>
                  <p>Действие</p>
                </th>
              </tr>
            </thead>
            <thead className="border_block">
              <tr>
                <th>
                  <p>Торговая пара</p>
                </th>
                <th>
                  <p>
                    Цена/Обьем <br /> 24ч (USDT)
                  </p>
                </th>
                <th>
                  <p>Действие</p>
                </th>
              </tr>
            </thead>
            {data.map((el, i, key) => (
              <tbody key={i} className="table_block_one">
                <tr>
                  <td>
                    <div
                      className="flex_tabels"
                      style={{
                        display: "flex",
                      }}
                    >
                      <img src={el.logo} alt="" />
                      <p className="title" style={{ margin: "0 0 0 5px" }}>
                        {el.name}
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>{el.rate}</p>
                  </td>
                  <td>
                    <p
                      style={{
                        color: el.difference.includes("-") ? "red" : "#30E0A1",
                      }}
                    >
                      {el.difference}
                    </p>
                  </td>
                  <td>
                    {el.difference.includes("-") ? (
                      <MdKeyboardArrowDown className="down" />
                    ) : (
                      <MdKeyboardArrowUp className="row_up" />
                    )}
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <button
                        onClick={() =>
                          navigate(
                            `/dashboard/buy-cryptocurrency/${el.currency}`
                          )
                        }
                        className="trade"
                      >
                        Покупка
                      </button>
                      <button
                        onClick={() =>
                          navigate(
                            `/dashboard/buy-cryptocurrency/${el.currency}`
                          )
                        }
                        className="tradee"
                      >
                        Торговля
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
            {data.map((el, i, key) => (
              <tbody key={i} className="table_block_two">
                <tr>
                  <td>
                    <div
                      className="flex_tabels"
                      style={{
                        display: "flex",
                      }}
                    >
                      <img src={el.logo} alt="" />
                      <p className="title" style={{ margin: "0 0 0 5px" }}>
                        {el.name}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p>{el.rate}</p>
                      <div className="difference">
                        <p
                          style={{
                            color: el.difference.includes("-")
                              ? "red"
                              : "#30E0A1",
                          }}
                        >
                          {el.difference}
                        </p>
                        <p>
                          {" "}
                          {el.difference.includes("-") ? (
                            <MdKeyboardArrowDown className="down" />
                          ) : (
                            <MdKeyboardArrowUp className="row_up" />
                          )}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                      }}
                      className="table_block_two_btn"
                    >
                      <button
                        onClick={() =>
                          navigate(
                            `/dashboard/buy-cryptocurrency/${el.currency}`
                          )
                        }
                        className="trade"
                      >
                        Покупка
                      </button>
                      <button
                        onClick={() =>
                          navigate(
                            `/dashboard/buy-cryptocurrency/${el.currency}`
                          )
                        }
                        className="tradee"
                      >
                        Торговля
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Popular;
