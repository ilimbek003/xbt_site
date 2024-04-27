import React, { useEffect, useState } from "react";
import "./Withdraw.css";
import axios from "axios";
import { url } from "../../api";
import Loading from "../../components/IU/loading/loading";
import { useNavigate } from "react-router-dom";
import cashIcon from "../../img/money.svg";
import bankIcon from "../../img/bank.svg";

const Withdraw = ({ datas }) => {
  const [section, setSection] = useState("crypto");
  const [modal, setModal] = useState(false);
  const [detail, setDetail] = useState([]);
  const [list, setCashList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (list && list.length === 0) {
      axios
        .get(url + "/cashout/cash-list", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((response) => {
          setCashList(response.data.list);
        });
    }
  }, [list]);

  useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    if (params.get("tab") === "cash") {
      setSection("cash");
    }
  });

  function setMethodDetail(item) {
    setModal(true);
    setDetail(item);
  }

  return (
    <div className="withdraw">
      {datas[0] ? (
        <div>
          <div className="holder">
            <h1>Вывести средства</h1>
            <div className="header-nav">
              <button
                className={"nav " + (section === "crypto" ? "active" : "")}
                onClick={() => setSection("crypto")}
              >
                Криптовалюта
              </button>
              <button
                className={"nav " + (section === "cash" ? "active" : "")}
                onClick={() => setSection("cash")}
              >
                Фиат
              </button>
            </div>
          </div>
          <div
            className={"wrapper " + (section === "crypto" ? "active" : "hide")}
          >
            {datas.map((el, index) =>
              el.can_withdraw == true ? (
                <div
                  onClick={() =>
                    navigate(`/dashboard/translation/${el.currency}`) ||
                    localStorage.setItem("balance", el.balance)
                  }
                  key={index}
                  className="box"
                >
                  <img src={el.logo} alt="" />
                  <div>
                    <h1>{el.currency}</h1>
                    <p>{el.name}</p>
                  </div>
                </div>
              ) : (
                ""
              )
            )}
          </div>
          <div
            className={"wrapper " + (section === "cash" ? "active" : "hide")}
          >
            {list.map((el) =>
              el.id ? (
                <div
                  onClick={() => setMethodDetail(el)}
                  className={
                    el.name === "Вывод наличными — бонус при выводе"
                      ? "bonus"
                      : "box_bonus"
                  }
                >
                  <img src={el.logo} alt={el.name} />
                  <div>
                    <h1 className="el_currency">USD/KGS</h1>
                    <p className="el_name">{el.name}</p>
                  </div>
                </div>
              ) : (
                ""
              )
            )}
          </div>
        </div>
      ) : (
        <div className="loading_div">
          <Loading />
        </div>
      )}
      {modal === true && (
        <div className="modal-window">
          <div onClick={() => setModal(false)} className="modal-overlay"></div>
          <div className="modal-text">
            <h1>{detail.name}</h1>
            {React.createElement("p", {
              dangerouslySetInnerHTML: {
                __html: detail.info.description ? detail.info.description : "",
              },
            })}
            <button onClick={() => setModal(false)} className="btn">
              Понятно
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Withdraw;
