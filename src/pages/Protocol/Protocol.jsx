import React, { useEffect, useState } from "react";
import "./Protocol.css";
import frogme from "../../img/Frame.svg";
import { Alert } from "../../components/IU/alert/alert";
import axios from "axios";
import { url } from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import Loading2 from "../../components/IU/loading2/loading2";
import Loading from "../../components/IU/loading/loading";

const Protocol = ({ currencies, balanceTether }) => {
  const { name } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [modal, setModal] = useState(false);
  const [value2, setValue2] = useState("");
  const [local, setLocal] = useState("");
  const [datas, setDatas] = useState([]);
  const navigate = useNavigate();

  const dataCurrancy = currencies
    .filter((obj) => {
      return obj.currency.includes(name);
    })
    .map((el) => el);

  const summa2 = value2 == "" ? "0" : value2 * dataCurrancy[0].rate;
  const sum2 =
    summa2 > 0
      ? summa2.toFixed(
        dataCurrancy[0].decimal == 0 ? 2 : dataCurrancy[0].decimal
      )
      : 0;

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
        .get(url + `/profile/personal`, { headers })
        .then((response) => {
          if (response.data.profile.verification.value !== '2') {
            Alert("error", 'Для осуществления данной операции, необходимо пройти проверку KYC');
            navigate("/dashboard/settings?tab=KYC");
          }
        })
        .catch((error) => {
          Alert("error", error.response.data.messages);
          navigate("/dashboard/sell-cryptocurrency");
        });
    }
  }, [local]);

  useEffect(() => {
    if (local) {
      axios
        .get(url + `/sell/parameters/${name}`, { headers })
        .then((response) => {
          setData(response.data.parameters);
        })
        .catch((error) => {
          // console.error("Error:", error);
        });
    }
  }, [name, local]);

  const balanceFilter = currencies
    .filter((obj) => {
      return obj.currency.includes("USDT");
    })
    .map((el) => el.balance);

  const sellFunc = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newData = {
        sum: value2,
        currency: dataCurrancy[0].currency,
      };
      const response = await axios.post(url + "/sell/create", newData, {
        headers,
      });
      setDatas(response.data);
      if (response.data.response == true) {
        setLoading(true);
        setModal(true);
      }
    } catch (error) {
      Alert("error", error.response.data.messages);
      setLoading(false);
      setLoading2(false);
    }
  };

  function FuncConfirm(nik, id) {
    setLoading2(true);
    if (local) {
      axios
        .get(url + `/${nik}/confirm/${id}`, { headers })
        .then((response) => {
          setLoading2(true);
          setModal(false);
          Alert("success", "Успешно");
          if (response.data.response == true) {
            navigate("/dashboard/operations");
          }
          balanceTether();
        })
        .catch((error) => {
          setLoading2(false);
        });
    }
  }

  return (
    <div id="protocol">
      {dataCurrancy[0] ? (
        <div className="container">
          <h1>Продать {dataCurrancy[0].name} По курсу</h1>
          <h3>
            1.00 {dataCurrancy[0].name} = {dataCurrancy[0].rate} USDT
          </h3>
          <div className="protocol">
            <div className="protocol_ll">
              <div className="big">
                <div className="all_big">
                  <div className="big_ll">
                    <div>
                      <h6>Срок исполнения</h6>
                      <h2>Моментально</h2>
                    </div>
                  </div>
                  <div className="big_ll">
                    <div>
                      <h6>Максимальная сумма</h6>
                      <h2>{data.max_qty}</h2>
                    </div>
                  </div>
                </div>
                <div className="all_big mar">
                  <div className="big_ll">
                    <div>
                      <h6>Минимальная сумма</h6>
                      <h2>{data.min_qty}</h2>
                    </div>
                  </div>
                  <div className="big_ll d_flex">
                    <div>
                      <h6>Комиссия</h6>
                      <h2>{data.commission}%</h2>
                    </div>
                  </div>
                </div>
              </div>
              <form onSubmit={sellFunc}>
                <label>
                  Баланс: {dataCurrancy[0].balance} {dataCurrancy[0].currency}
                </label>
                <div className="position-lation">
                  <input
                    defaultValue={value2}
                    onChange={(e) => setValue2(e.target.value)}
                    type="number"
                    placeholder={data.name}
                  />
                  <div className="max-balanse" onClick={() => setValue2(dataCurrancy[0].balance)}>
                    <p className="balans-crypty">MAX</p>
                  </div>
                </div>
                <label>
                  Баланс: {balanceFilter ? balanceFilter : <Loading2 />} USDT
                </label>
                <input type="text" value={sum2} placeholder="USDT" />
                <button disabled={loading} onClick={sellFunc}>
                  {" "}
                  {loading ? <Loading2 /> : "Продолжить"}
                </button>
              </form>
              {modal &&
                (datas.response == true ? (
                  <div className="modal">
                    <div
                      onClick={() =>
                        setModal(false) ||
                        setLoading(false) ||
                        setLoading2(false)
                      }
                      className="not_confirm"
                    ></div>
                    <div className="save_form">
                      <h1>Подтвердите действия</h1>
                      <div className="box_form">
                        <p>Сумма к списанию</p>
                        <p className="form">
                          <p className="form">{datas.confirm.amount}</p>
                        </p>
                      </div>
                      <div className="box_form">
                        <p>Сумма к зачислению</p>
                        <p>{sum2}</p>
                      </div>
                      <div className="box_form">
                        <p>Комиссия</p>
                        <p className="form">{datas.confirm.commission}</p>
                      </div>
                      <div className="box_form">
                        <p>Валюта</p>
                        <p className="form">{datas.confirm.currency}</p>
                      </div>
                      <button
                        disabled={loading2}
                        onClick={() => FuncConfirm("sell", datas.confirm.id)}
                        className="btn_confirm"
                      >
                        {loading2 ? <Loading2 /> : "Подтвердить"}
                      </button>
                    </div>
                  </div>
                ) : (
                  setModal(false) || setLoading(false) || setLoading2(false)
                ))}
            </div>
            <div className="zero">
              <div className="zero_box">
                <h1>Уведомление об выводе</h1>
                <p className="speed ">
                  Наслаждайтесь нулевой комиссией и быстрой скоростью вывода
                  средств на кастодиальный кошелек.
                </p>
                <p className="speed ">
                  В настоящее время обрабатывает все связанные с этим деловые
                  вопросы в соответствии с последними правилами соответствия,
                  запущенными корейскими платформами. Пожалуйста, не выводите
                  средства на платформы Upbit или Coinone до завершения
                  процесса, иначе вы можете потерять свои активы.
                </p>
                <p className="wallet">
                  Пожалуйста, не отправляйте средства на адрес ICO или для
                  краудфандинга. Мы не несем ответственности за распространение
                  любых будущих токенов, которые вы можете получить.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="loading_div"
        >
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Protocol;
