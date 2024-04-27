import React, { useEffect, useState } from "react";
import "./Operations.css";
import { url } from "../../api";
import axios from "axios";
import Operation from "./Operation";
import { Alert } from "../../components/IU/alert/alert";
import { MdOutlineFileCopy } from "react-icons/md";
import Loading from "../../components/IU/loading/loading";
import { BsDatabaseFillExclamation } from "react-icons/bs";

const Operations = () => {
  const [modal, setModal] = useState(false);
  const [bec, setBec] = useState([]);
  const [local, setLocal] = useState("");
  const [loading, setLoading] = useState(true);
  const [operation, setOperation] = useState([]);
  const oper = operation ? operation : [];
  const datas = Object.values(oper).map((data) => data);

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
        .get(url + "/operations", { headers })
        .then((response) => {
          setOperation(response.data.operations);
          setLoading(false);
        })
        .catch((error) => {
          // console.error("Error:", error);
        });
    }
  }, [local]);

  function funcDataOperation(becc) {
    setBec(becc);
  }

  const handleCopyButtonClick = (text) => {
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);
    Alert("success", "успешно скопировано !");
  };

  return (
    <div className="operations">
      {loading ? (
        <div className="loading_div">
          <Loading />
        </div>
      ) : (
        <div>
          <h1>История операции</h1>
          {modal &&
            (bec == [] ? (
              setModal(false)
            ) : (
              <div className="modal_home">
                <div onClick={() => setModal(false)} className="not"></div>
                <div className="modal">
                  <h1>Квитанция платежа</h1>
                  <div className="type">
                    {bec.type ? (
                      <div className="type_box">
                        <p>Тип операции</p>
                        <h3>{bec.type}</h3>
                      </div>
                    ) : (
                      ""
                    )}
                    {bec.date || bec.time ? (
                      <div className="type_box">
                        <p>Дата и время</p>
                        <h3>
                          {bec.date} / {bec.time}
                        </h3>
                      </div>
                    ) : (
                      ""
                    )}
                    {bec.sum ? (
                      <div className="type_box">
                        <p>Сумма к списанию</p>
                        <h3>{bec.sum}</h3>
                      </div>
                    ) : (
                      ""
                    )}
                    {bec.debit ? (
                      <div className="type_box">
                        <p>Сумма к зачислению</p>
                        <h3>{bec.debit}</h3>
                      </div>
                    ) : (
                      ""
                    )}
                    {bec.commission ? (
                      <div className="type_box">
                        <p>Комиссия</p>
                        <h3>{bec.commission}</h3>
                      </div>
                    ) : (
                      ""
                    )}
                    {bec.currency ? (
                      <div className="type_box">
                        <p>Валюта</p>
                        <h3>{bec.currency}</h3>
                      </div>
                    ) : (
                      ""
                    )}
                    {bec.status.name ? (
                      <div className="type_box">
                        <p>Статус</p>
                        <h2>{bec.status.name}</h2>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  {bec.requisite ? (
                    <>
                      <p>Реквизит</p>
                      <div className="input_box">
                        <input type="text" value={bec.requisite} />
                        <MdOutlineFileCopy
                          onClick={() => handleCopyButtonClick(bec.requisite)}
                          className="icon"
                          size={20}
                        />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {bec.batch ? (
                    <>
                      <p>Номер квитанции</p>
                      <div className="input_box">
                        <input type="text" value={bec.batch} />
                        <MdOutlineFileCopy
                          onClick={() => handleCopyButtonClick(bec.batch)}
                          className="icon"
                          size={20}
                        />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {bec.memo ? (
                    <>
                      <p>Примечание</p>
                      <div className="input_box">
                        <input type="text" value={bec.memo} />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  <button onClick={() => setModal(false)} className="close">
                    Закрыть
                  </button>
                </div>
              </div>
            ))}
          <div className="wrapper">
            <div className="box">
              <p className="start">ПС</p>
              <p>Дата</p>
              <p>Тип операции</p>
              <p>Приход</p>
              <p>Расход</p>
              <p>Статус</p>
            </div>
            {datas.length > 0 ? (
              datas.map((el, id) => (
                <Operation
                  key={id}
                  el={el}
                  setModal={setModal}
                  funcDataOperation={funcDataOperation}
                />
              ))
            ) : (
              <div className="not_data">
                <BsDatabaseFillExclamation
                  className="not_data_icon"
                  size={45}
                />
                <h1 className="not_data_h1">Нет данных</h1>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Operations;
