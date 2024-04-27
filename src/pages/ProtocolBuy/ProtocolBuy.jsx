import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { Alert } from "../../components/IU/alert/alert";
import Loading2 from "../../components/IU/loading2/loading2";
import { url } from "../../api";
import Loading from "../../components/IU/loading/loading";

const ProtocolBuy = ({ balanceTether, currencies }) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [modal, setModal] = useState(false);
  const [value1, setValue1] = useState("");
  const [local, setLocal] = useState("");
  const [datas, setDatas] = useState([]);
  const navigate = useNavigate();

  const dataCurrancy = currencies
    .filter((obj) => {
      return obj.currency.includes(id);
    })
    .map((el) => el);

  const summa1 = value1 == "" ? "0" : value1 / dataCurrancy[0].rate;
  const sum1 = summa1 > 0 ? summa1.toFixed(dataCurrancy[0].decimal) : 0;

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
          navigate("/dashboard/buy-cryptocurrency");
        });
    }
  }, [local]);

  useEffect(() => {
    if (local) {
      axios
        .get(url + `/buy/parameters/${id}`, { headers })
        .then((response) => {
          setData(response.data.parameters);
        })
        .catch((error) => {
          // console.error("Error:", error);
        });
    }
  }, [id, local]);

  const balanceFilter = currencies
    .filter((obj) => {
      return obj.currency.includes("USDT");
    })
    .map((el) => el.balance);

  const buyFunc = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newData = {
        sum: value1,
        currency: dataCurrancy[0].currency,
      };
      const response = await axios.post(url + "/buy/create", newData, {
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
          Alert("error", error.response.data.messages);
          setLoading2(false);
        });
    }
  }

  return (
    <div id="protocol">
      {dataCurrancy[0] ? (
        <div className="container">
          <h1>Купить {dataCurrancy[0].name} По курсу</h1>
          <h3>1.00 {dataCurrancy[0].name} = {dataCurrancy[0].rate} USDT</h3>
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
              <form onSubmit={buyFunc}>
                <label>
                  Баланс: {balanceFilter ? balanceFilter : <Loading2 />} USDT
                </label>
                <div className="position-lation">
                  <input
                    defaultValue={value1}
                    onChange={(e) => setValue1(e.target.value)}
                    type="number"
                    placeholder="USDT Tether"
                  />
                  <div className="max-balanse" onClick={() => setValue1(balanceFilter)}>
                    <p className="balans-crypty">MAX</p>
                  </div>
                </div>
                <label>
                  Баланс: {dataCurrancy[0].balance} {dataCurrancy[0].currency}
                </label>
                <input type="text" value={sum1} />
                <button disabled={loading} onClick={buyFunc}>
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
                          {parseFloat(value1).toFixed(currencies.decimal)}
                        </p>
                      </div>
                      <div className="box_form">
                        <p>Сумма к зачислению</p>
                        <p className="form">{datas.confirm.amount}</p>
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
                        onClick={() => FuncConfirm("buy", datas.confirm.id)}
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
            <div className="zero ">
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

export default ProtocolBuy;
