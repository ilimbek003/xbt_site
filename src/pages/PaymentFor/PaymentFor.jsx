import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import "./PaymentFor.css";
import img from "../../img/IMAGE.svg";
import axios from "axios";
import { url } from "../../api";
import Loading from "../../components/IU/loading/loading";

const data = [
  {
    id: 1,
    img: img,
    text: "Пополнение депозитных счетов",
  },
  {
    id: 2,
    img: img,
    text: "Мобильная связь",
  },
  {
    id: 3,
    img: img,
    text: "Интернет магазины",
  },
  {
    id: 4,
    img: img,
    text: "Баткенская область",
  },
  {
    id: 5,
    img: img,
    text: "Архив",
  },

  {
    id: 6,
    img: img,
    text: "Баткенская область",
  },

  {
    id: 7,
    img: img,
    text: "Пополнение расчетных счетов",
  },

  {
    id: 8,
    img: img,
    text: "Архив",
  },
  {
    id: 9,
    img: img,
    text: "Интернет магазины",
  },
];
const PaymentFor = () => {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const [local, setLocal] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLocal(token);
    }
  }, []);

  const headers = {
    Authorization: `Bearer ${local}`,
  };

  useEffect(() => {
    if (local) {
      axios
        .get("https://ns1.netex.kg/pay24/category/list/", { headers })
        .then((response) => {
          setList(response.data);
        })
        .catch((error) => {
          // console.error("Error:", error);
        });
    }
  }, [local]);

  return (
    <div id="payment_for">
      {list[0] ? (
        <div className="container">
          <div className="holder">
            <h1>Оплата услуг</h1>
            <div>
              <BiSearch className="search_i" />
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="text"
                placeholder="Поиск"
              />
            </div>
          </div>
          <div className="accounts">
            {list
              .filter((obj) => {
                const fullName = obj.name.toLowerCase();
                return fullName.includes(value.toLowerCase());
              })
              .map((el, id) => (
                <div className="deposit" key={id}>
                  <img src={el.logo_url} alt="" />
                  <h1>{el.name}</h1>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="loading_div">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default PaymentFor;
