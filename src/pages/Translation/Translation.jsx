import React, { useEffect, useState } from "react";
import "./Translation.css";
import { Alert } from "../../components/IU/alert/alert";
import axios from "axios";
import { url } from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/IU/loading/loading";
import Loading2 from "../../components/IU/loading2/loading2";
import { FiCopy } from "react-icons/fi";

const data = [
  {
    id: 1,
    one: 1,
    text: "Выберите токен и адрес для вывода",
    project:
      "Выберите токен и сеть для вывода средств, вставьте адрес вывода на этой странице.",
  },
  {
    id: 2,
    one: 2,
    text: "Подтверждение перевода",
    project: "Пожалуйста, подождите подтверждения перевода в блокчейн-сети.",
  },
  {
    id: 3,
    one: 3,
    text: "Вывод средств успешно выполнен.",
    project:
      "Блокчейн-сеть подтвердила перевод.  переведет актив на ваш адрес для вывода.",
  },
];

const Translation = ({ currencies, color, mainBalance }) => {

  const navigate = useNavigate();
  const { currency } = useParams();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [modal, setModal] = useState(true);
  const [local, setLocal] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [withdrawalQuantity, setWithdrawalQuantity] = useState('');
  const [withdrawalAddress, setWithdrawalAddress] = useState('');
  const [withdrawalNetwork, setWithdrawalNetwork] = useState('');
  const [withdrawalCommission, setCommission] = useState('');
  const [detail, setWithdrawData] = useState([]);
  const [networkCommission, setNetworkCommission] = useState('');
  const [getNetworks, setNetworks] = useState([]);
  const [getCurrencyDetail, setCurrencyDetail] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [code, setCode] = useState();
  const method = currencies.filter((obj) => { return obj.currency.includes(currency) }).map((el) => el)
  const networks = Object.values(getNetworks).map((data) => data);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLocal(token);
    }
  }, []);

  const headers = {
    Authorization: `Bearer ${local}`,
  }

  function numberFormat(number, float) {
    var string, result
    if (String(number).includes('.')) {
      string = String(number).split('.')
      result = (float > 0) ? string[0] + '.' + string[1].substring(0, float) : string[0]
    } else {
      result = number
    }
    return result
  }

  function getCommission(network) {
    const result = networks.filter((obj) => { return obj.network.includes(network) }).map((el) => el)
    return result[0].commission
  }

  function setNetwork(network) {
    setWithdrawalNetwork(network)
    setNetworkCommission(getCommission(network))
  }

  function setQuantity() {
    let amount = document.getElementById('amount')
    if (amount && amount.value > 0) {
      let commission = (amount.value * withdrawalCommission) / 100
      let quantity = (amount.value - networkCommission) - commission
      let result = numberFormat(quantity, (getCurrencyDetail[0]) ? getCurrencyDetail[0].decimal : 0)
      setWithdrawalQuantity((result > 0) ? result : 0)
    }
  }

  useEffect(setQuantity, [withdrawalAmount, withdrawalNetwork])

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
          navigate("/dashboard/translation");
        });
    }
  }, [local]);

  useEffect(() => {
    if (local) {
      axios
        .get(url + `/cashout/parameters/${currency}`, { headers })
        .then((response) => {
          setNetworks(response.data.parameters.networks)
          setCommission(response.data.parameters.commission)
          const networks = Object.values(response.data.parameters.networks).map((data) => data);
          const defaultNetwork = networks.filter((obj) => { return obj.network.includes('TRC20') }).map((el) => el)
          if (defaultNetwork[0]) {
            setWithdrawalNetwork(defaultNetwork[0].network)
            setNetworkCommission(defaultNetwork[0].commission)
          } else {
            setWithdrawalNetwork(networks[0].network)
            setNetworkCommission(networks[0].commission)
          }
        })
        .catch((error) => {
          Alert("error", error.response.data.messages);
          navigate('/dashboard/translation');
        });
    }
  }, [local]);

  const createWithdraw = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = {
        sum: withdrawalAmount,
        currency: method[0].currency,
        wallet: withdrawalAddress,
        network: withdrawalNetwork
      };
      const response = await axios.post(url + '/cashout/create', formData, {
        headers,
      })
      if (response.data.response === true) {
        setWithdrawData(response.data)
        setModal(true)
      } else {
        Alert("error", response.data.messages)
      }
      setLoading(false)
    } catch (error) {
      Alert("error", error.response.data.messages)
      setLoading(false)
    }
  };

  const confirmWithdraw = async () => {
    setLoading(true);
    await axios
      .post(url + `/cashout/confirm/${detail.confirm.id}`, { '2fa_otp': code }, { headers })
      .then((response) => {
        setModal(false);
        if (response && response.data.response === true) {
          Alert("success", (response.data.messages ? response.data.messages : "Успешно"));
          mainBalance()
          navigate("/dashboard/operations")
          setModalShow(false)
        }
      })
      .catch((error) => {
        if (error.response.data.security === "2fa") {
          setModal(false)
          setModalShow(true)
        }
        Alert("error", error.response.data.messages)
        setLoading(false)
      })
  }

  useEffect(() => {
    if (local) {
      axios
        .get(url + `/currencies`, { headers })
        .then((response) => {
          setCurrencyDetail(response.data.currencies.filter((obj) => {
            return obj.currency.includes(currency)
          })
            .map((el) => el))
        })
        .catch((error) => {
          Alert("error", error.response.data.messages)
          navigate("/dashboard/conclusion")
        })
    }
  }, [local, currency])

  // const { currancy } = useParams();
  // const [loading, setLoading] = useState(false);
  // const [loading2, setLoading2] = useState(false);
  // const [modal, setModal] = useState(true);
  // const [local, setLocal] = useState("");
  // const [dataCar, setDataCar] = useState([]);
  // const [value1, setValue1] = useState("");
  // const [value2, setValue2] = useState("");
  // const [networkUse, setNetworkUse] = useState("");
  // const [select, setSelect] = useState(false);
  // const [datas, setDatas] = useState([]);
  // const [commiss, setCommiss] = useState([]);
  // const navigate = useNavigate();
  // const [commissions, setCommissions] = useState([]);
  // const [datasCurApp, setDatasCurApp] = useState([]);
  // const [getCurrencyDetail, setCurrencyDetail] = useState([]);
  // const [modalShow, setModalShow] = useState(false);
  // const [code, setCode] = useState("");
  // const tran = datas_tran
  //   .filter((obj) => {
  //     return obj.currency.includes(currancy);
  //   })
  //   .map((el) => el);
  // const datasCur = Object.values(datasCurApp).map((data) => data);
  // const getDefaultNetwork = datasCur.filter((obj) => {
  //   return obj.network.includes('TRC20');
  // })
  //   .map((el) => el)

  // function withdraw(cur) {
  //   setDataCar(cur);
  // }

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setLocal(token);
  //   }
  // }, []);

  // const headers = {
  //   Authorization: `Bearer ${local}`,
  // };

  // useEffect(() => {
  //   if (local) {
  //     axios
  //       .get(url + `/cashout/parameters/${currancy}`, { headers })
  //       .then((response) => {
  //         setDatasCurApp(response.data.parameters.networks);
  //         setCommissions(response.data.parameters.commission);
  //       })
  //       .catch((error) => {
  //         Alert("error", error.response.data.messages);
  //         navigate("/dashboard/translation");
  //       });
  //   }
  // }, [local]);

  // useEffect(() => {
  //   if (local) {
  //     axios
  //       .get(url + `/profile/personal`, { headers })
  //       .then((response) => {
  //         if (response.data.profile.verification.value !== '2') {
  //           Alert("error", 'Для осуществления данной операции, необходимо пройти проверку KYC');
  //           navigate("/dashboard/settings?tab=KYC");
  //         }
  //       })
  //       .catch((error) => {
  //         Alert("error", error.response.data.messages);
  //         navigate("/dashboard/translation");
  //       });
  //   }
  // }, [local]);

  // useEffect(() => {
  //   if (local) {
  //     axios
  //       .get(url + `/currencies`, { headers })
  //       .then((response) => {
  //         setCurrencyDetail(response.data.currencies.filter((obj) => {
  //           return obj.currency.includes(currancy);
  //         })
  //           .map((el) => el));
  //       })
  //       .catch((error) => {
  //         Alert("error", error.response.data.messages);
  //         navigate("/dashboard/translation");
  //       });
  //   }
  // }, [local, currancy]);

  // const withdrawFunc = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     const newData = {
  //       sum: value2,
  //       currency: tran[0].currency,
  //       wallet: networkUse,
  //       network: dataCar.network ? dataCar.network : (getDefaultNetwork[0]) ? getDefaultNetwork[0].network : datasCur[0].network
  //     };
  //     const response = await axios.post(url + "/cashout/create", newData, {
  //       headers,
  //     });
  //     setDatas(response.data);
  //     setModal(true);
  //   } catch (error) {
  //     Alert("error", error.response.data.messages);
  //     setLoading(false);
  //   }
  // };

  // function FuncConfirm(id) {
  //   setLoading2(true);
  //   if (local) {
  //     axios
  //       .post(
  //         url + `/cashout/confirm/${id}`,
  //         {
  //           "2fa_otp": code,
  //         },
  //         { headers: headers }
  //       )
  //       .then((response) => {
  //         setModal(false);
  //         Alert("success", "Успешно");
  //         if (response.data.response === true) {
  //           navigate("/dashboard/operations");
  //           setModalShow(false);
  //         }
  //         balanceTether();
  //       })
  //       .catch((error) => {
  //         if (error.response.data.security === "2fa") {
  //           setModalShow(true);
  //         }
  //         Alert("error", error.response.data.messages);
  //         setLoading2(false);
  //       });
  //   }
  // }

  // useEffect(() => {
  //   if (datasCur[0]) {
  //     const comm = dataCar.commission
  //       ? dataCar.commission
  //       : datasCur[0].commission
  //         ? datasCur[0].commission
  //         : "";
  //     setCommiss(comm);
  //   }
  // });
  // const summa = value2 === "" ? "0" : value2 - commiss;
  // const balanse = () => {
  //   setValue2((getCurrencyDetail[0].balance) ? getCurrencyDetail[0].balance : 0);
  // };

  return (
    <div id="translation">
      {method[0] ? (
        <div className="container">
          <div className="translation_all_block">
            {data.map((el, id) => (
              <div className="display_flex_ll" key={id}>
                <div className="div">
                  <h2 color={color ? "var(--green)" : "var(--orange)"}>
                    {el.one}
                  </h2>
                </div>
                <div className="content">
                  <h1>{el.text}</h1>
                  <p>{el.project}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="tether">
            <div className="user_usdt">
              <div className="create">
                <div className="create_capital">
                  <h3>Минимальная сумма</h3>
                  <h2>{method[0]?.min_qty}</h2>
                </div>
                <div className="create_capital mat">
                  <h3>Наша комиссия</h3>
                  <h2>{method[0]?.commission ? method[0]?.commission : "-"}</h2>
                </div>
              </div>
              <div className="create one_cre">
                <div className="create_capital">
                  <h3>Комиссия сети</h3>
                  <h2>{networkCommission ? networkCommission : '-'}
                  </h2>
                </div>
                <div className="create_capital">
                  <h3>Максимальная сумма</h3>
                  <h2>{method[0]?.max_qty}</h2>
                </div>
              </div>
              <form onSubmit={createWithdraw}>
                <label>Сеть</label>
                <div className="relative">
                  <select
                    name="select"
                    className="select-custom"
                    value={withdrawalNetwork}
                    onChange={(e) => { setNetwork(e.target.value) }}
                  >
                    {networks.map((el, index) => (
                      <option value={el.network} key={index}>{el.network} - (fee {el.commission + ' ' + currency})</option>
                    ))}
                  </select>
                </div>
                <div className="flex-balanse">
                  <label>Сумма отправления</label>
                  <p className="balans-crypty">{(getCurrencyDetail[0]) && getCurrencyDetail[0].balance + ' ' + getCurrencyDetail[0].currency}</p>
                </div>
                <div className="position-lation">
                  <input
                    id="amount"
                    defaultValue={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                    type="text"
                    placeholder="Сумма отправления"
                  />
                  <div className="max-balanse" onClick={() => setWithdrawalAmount((getCurrencyDetail[0].balance) ? getCurrencyDetail[0].balance : 0)}>
                    <p className="balans-crypty">MAX</p>
                  </div>
                </div>
                <label>Cумма к получению</label>
                <input
                  className="not_allowed"
                  disabled={true}
                  value={withdrawalQuantity}
                  type="text"
                  placeholder="Cумма к получению"
                />
                <label>Номер {method[0].currency} кошелька</label>
                <div className="position-lation">
                  <input
                    id="crypto-address"
                    defaultValue={withdrawalAddress}
                    onChange={(e) => setWithdrawalAddress(e.target.value)}
                    type="text"
                    placeholder={`Введите номер ${withdrawalNetwork} кошелька`}
                  />
                  <div className="max-balanse" onClick={async () => {
                    setWithdrawalAddress(await navigator.clipboard.readText())
                  }}>
                    <FiCopy style={{ color: "#fff" }} size={20} />
                  </div>
                </div>
                <button type="submit" className="btn" disabled={loading} disabled={loading} >
                  {loading ? <Loading2 /> : "Продолжить"}
                </button>
              </form>
              {modal &&
                (detail.response == true ? (
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
                      <h1>Подтвердите действие</h1>
                      <div className="box_form">
                        <p>Сумма к списанию</p>
                        <p className="form">{detail.confirm.amount} {detail.confirm.currency}</p>
                      </div>
                      <div className="box_form">
                        <p>Сумма к зачислению</p>
                        <p className="form">{withdrawalQuantity} {detail.confirm.currency}</p>
                      </div>
                      <div className="box_form">
                        <p>Комиссия сети</p>
                        <p className="form">{detail.confirm.commission} {detail.confirm.currency}</p>
                      </div>
                      <button disabled={loading2} onClick={() => confirmWithdraw(detail.confirm.id)} className="btn_confirm">
                        {loading2 ? <Loading2 /> : "Подтвердить"}
                      </button>
                    </div>
                  </div>
                ) : (
                  setModal(false) || setLoading2(false) || setLoading(false)
                ))}
            </div>
            <div className="noticw_div">
              <div className="notice">
                <h1>Уведомление об выводе</h1>
                <p className="pro">
                  Наслаждайтесь нулевой комиссией и быстрой скоростью вывода
                  средств на кастодиальный кошелек.
                </p>
                <p className="pro">
                  В настоящее время обрабатывает все связанные с этим деловые
                  вопросы в соответствии с последними правилами соответствия,
                  запущенными корейскими платформами. Пожалуйста, не выводите
                  средства на платформы Upbit или Coinone до завершения
                  процесса, иначе вы можете потерять свои активы.
                </p>
                <p className="coin">
                  Пожалуйста, не отправляйте средства на адрес ICO или для
                  краудфандинга. Мы не несем ответственности за распространение
                  любых будущих токенов, которые вы можете получить.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="loading_div">
          <Loading />
        </div>
      )}
      {modalShow === true && (
        <div className="modal-window-v2" onClick={() => setModalShow(false)}>
          <div className="modal-window-v2-wrap" onClick={(e) => e.stopPropagation()}>
            <h2>Двухфакторная аутентификация</h2>
            <p>Зайдите в свой аунтефикатор и введите полученный код</p>
            <form className="form">
              <input
                type="number"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Введите защитный код *"
                required
                autoFocus
              />
              <button type="button" disabled={loading} onClick={() => confirmWithdraw(detail.confirm.id)} className="btn_confirm">
                {loading ? <Loading2 /> : "Подтвердить"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Translation;
