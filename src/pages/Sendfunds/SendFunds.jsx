import React from "react";
import "./Sendfunds.css";
import frogme from "../../img/Frame.svg";

const SendFunds = () => {
  return (
    <div id="send_funds">
      <div className="container">
        <h1>Отправить средства</h1>
        <div className="protocol">
          <div className="protocol_ll">
            <div className="big">
              <div className="all_big">
                <div className="big_ll">
                  <img src={frogme} alt="" />
                  <div>
                    <h6>Срок исполнения</h6>
                    <h2>Моментально</h2>
                  </div>
                </div>
                <div className="big_ll d_flex1">
                  <img src={frogme} alt="" />
                  <div>
                    <h6>Минимальная сумма</h6>
                    <h2>47.00 ZRX</h2>
                  </div>
                </div>
              </div>
              <div className="all_big mar">
                <div className="big_ll">
                  <img src={frogme} alt="" />
                  <div>
                    <h6>Минимальная сумма</h6>
                    <h2>47.00 ZRX</h2>
                  </div>
                </div>
                <div className="big_ll d_flex">
                  <img src={frogme} alt="" />
                  <div>
                    <h6>Комиссия</h6>
                    <h2>0.30 %</h2>
                  </div>
                </div>
              </div>
            </div>
            <form>
              <label>Email пользователя</label>
              <input type="text" />
              <div className="process">
                <div className="latest">
                  <label>Баланс: 0.00 USDT</label>
                  <input type="text" placeholder=" USDT Tether" />
                </div>
                <div className="latest">
                  <label>Сумма отправления</label>
                  <input type="text" />
                </div>
                <div className="latest">
                  <label>Доступная 'сумма': 0.00USDT</label>
                  <input type="text" placeholder="Сумма к зачислению" />
                </div>
              </div>
              <label>Код протекции</label>
              <input type="text" />
              <button>Продолжить</button>
            </form>
          </div>
          <div>
            <div className="zero ">
              <h1>Уведомление об выводе</h1>
              <p className="speed ">
                Наслаждайтесь нулевой комиссией и быстрой скоростью вывода
                средств на кастодиальный кошелек.
              </p>
              <p className="speed ">
                В настоящее время обрабатывает все связанные с этим деловые
                вопросы в соответствии с последними правилами соответствия,
                запущенными корейскими платформами. Пожалуйста, не выводите
                средства на платформы Upbit или Coinone до завершения процесса,
                иначе вы можете потерять свои активы.
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
    </div>
  );
};

export default SendFunds;
