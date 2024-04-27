import React, { useEffect, useState } from "react";
import "./BuyCurrency.css";
import { BsGooglePlay } from "react-icons/bs";
import { AiFillApple } from "react-icons/ai";
import photo1 from "../../img/Frame 18.svg";
import photo2 from "../../img/Frame 19.svg";
import photo3 from "../../img/Frame 20.svg";
import { BiSolidDownArrow } from "react-icons/bi";
import visa from "../../img/visa.svg";
import master from "../../img/master.svg";
import { MdOutlineCompareArrows } from "react-icons/md";
import Loading2 from "../IU/loading2/loading2";
import axios from "axios";
import { url } from "../../api";
import { useNavigate } from "react-router-dom";
import { Alert } from "../IU/alert/alert";

const BuyCurrency = ({ color }) => {
  const navigate = useNavigate();
  const [dataFromLocal, setDataFromLocal] = useState(false);
  const [menu, setMenu] = useState(false);
  const [summa, setSumma] = useState("");
  const [data, setData] = useState([]);
  const [buy, setBuy] = useState([]);
  const items = Object.values(buy).map((item) => item);
  const dataDefault = Object.values(items).map((item) => item);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url + "/currencies");
        setBuy(response.data.currencies);
      } catch (error) {
        // console.log("Ошибка:", error);
      }
    };

    fetchData();
  }, []);

  const sum = dataDefault[0]
    ? data.rate
      ? summa / data.rate
      : summa / dataDefault[0].rate
    : false;

  useEffect(() => {
    const emailFromLocalStorage = localStorage.getItem("data_register");
    setDataFromLocal(!!emailFromLocalStorage);
  }, []);

  const handleStartTrading = () => {
    const currency = dataDefault[0]
      ? data.currency
        ? data.currency
        : dataDefault[0].currency
      : 0;
    if (!dataFromLocal) {
      navigate("/register-personal");
      Alert("error", "вы не авторизован");
    } else if (currency !== 0) {
      navigate(`/dashboard/buy-cryptocurrency/${currency}`);
    }
  };

  return (
    <div className="buy_currency">
      <div className="container_new">
        <div className="container">
          <div className="wrapper">
            <h1>Купить валюту</h1>
            <p>
              Все легко и просто! Укажите валюту, которую вам необходимо
              получить, затем введите сумму для обмена, после нажмите кнопку
              «Купить». Вам будет показан текущий курс и резерв нашего обменного
              пункта, а также появятся поля, которые необходимо будет заполнить:
              номера кошельков, карт и email.
            </p>
            <div className="clients">
              <img src={photo1} />
              <img style={{ marginLeft: "-20px" }} src={photo2} />
              <img style={{ marginLeft: "-20px" }} src={photo3} />
              <p>100+ Довольных клиентов</p>
            </div>
            <div className="hr"></div>
            <h1 className="we">Присоединяйтесь к нам</h1>
            <p>
              Воспользуйтесь нашим удобным приложением, чтобы получить
              мгновенный доступ к захватывающему миру криптовалюты и
              осуществлять операции на ходу
            </p>
            {/* <div className="install">
            <div
              style={{
                border: color
                  ? "1px solid var(--green)"
                  : "1px solid var(--orange)",
              }}
              className="box_app"
            >
              <BsGooglePlay color="#fff" size={35} />
              <div className="center">
                <p>Доступно в</p>
                <h1>Google play</h1>
              </div>
            </div>
            <div
              style={{
                border: color
                  ? "1px solid var(--green)"
                  : "1px solid var(--orange)",
              }}
              className="box_app rigth"
            >
              <AiFillApple color="#fff" size={35} />
              <div className="center">
                <p>Загрузите в</p>
                <h1>App Store</h1>
              </div>
            </div>
          </div> */}
          </div>
          <div className="calculator">
            <h1>Валюта</h1>
            <div
              style={{
                border: color
                  ? "1px solid var(--green)"
                  : "1px solid var(--orange)",
              }}
              className="input"
              onClick={() => setMenu(!menu)}
            >
              <div className="flex">
                <img
                  className="circle"
                  src={
                    dataDefault[0] ? (
                      data.logo ? (
                        data.logo
                      ) : (
                        dataDefault[0].logo
                      )
                    ) : (
                      <Loading2 />
                    )
                  }
                  alt=""
                />
                <h1 className="title">
                  {dataDefault[0] ? (
                    data.name ? (
                      data.name
                    ) : (
                      dataDefault[0].name
                    )
                  ) : (
                    <Loading2 />
                  )}
                </h1>
              </div>
              <BiSolidDownArrow
                className="h1"
                color={color ? "var(--green)" : "var(--orange)"}
                size={20}
              />
              {menu && (
                <>
                  <div
                    onClick={() => setMenu(false)}
                    className="calculator_menu"
                  ></div>
                  <div
                    onClick={() => setMenu(false)}
                    className="menu_container"
                  >
                    {items ? (
                      items.map((el, id) =>
                        el.can_buy ? (
                          <div
                            key={id}
                            onClick={() => setData(el)}
                            className="box"
                          >
                            <img src={el.logo} alt="" />
                            <h2 className="name">{el.name}</h2>
                          </div>
                        ) : (
                          ""
                        )
                      )
                    ) : (
                      <Loading2 />
                    )}
                  </div>
                </>
              )}
            </div>
            <h1>Сумма в USDT</h1>
            <input
              style={{
                border: color
                  ? "1px solid var(--green)"
                  : "1px solid var(--orange)",
              }}
              className="summa"
              value={summa}
              onChange={(e) => setSumma(e.target.value)}
              type="number"
              placeholder="Введите сумму..."
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h1>В итоге </h1>
            </div>
            <div className="display">
              <p> По курсу 1.00</p>
              <p>
                {" "}
                {dataDefault[0] ? (
                  data.currency ? (
                    data.currency
                  ) : (
                    dataDefault[0].currency
                  )
                ) : (
                  <Loading2 />
                )}{" "}
              </p>
              <MdOutlineCompareArrows
                style={{
                  color: color ? "var(--green)" : "var(--orange)",
                  marginLeft: 10,
                  marginRight: 10,
                }}
                size={20}
              />{" "}
              <p>
                ${" "}
                {dataDefault[0] ? (
                  data.rate ? (
                    data.rate
                  ) : (
                    dataDefault[0].rate
                  )
                ) : (
                  <Loading2 />
                )}{" "}
              </p>
              <p className="left">
                ~ {sum ? sum.toFixed(data.decimal) : 0}{" "}
                {dataDefault[0] ? (
                  data.currency ? (
                    data.currency
                  ) : (
                    dataDefault[0].currency
                  )
                ) : (
                  <Loading2 />
                )}
              </p>
            </div>
            <button
              onClick={handleStartTrading}
              style={{
                background: color ? "var(--green)" : "var(--orange)",
              }}
              className="buy"
            >
              Купить
            </button>
            <button className="bank"> Купить валюту банковской картой</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCurrency;
