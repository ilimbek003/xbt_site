import React, { useEffect } from "react";
import Meet from "../../components/Meet/Meet";
import Partners from "../../components/Advantages/Advantages";
import rgoup from "../../img/Group 48095472.png";
import "./About.css";
import tel from "../../img/app-66 1.png"
const About = ({ color }) => {
  useEffect(() => {
    document.title = "О компании";
    const desc =
      "XBT.kg — это сервис отвечающий даже самым серьезным запросам! XBT не просто обменка, а самое главное дело в нашей жизни, нам действительно важен каждый наш клиент.";
    document
      .querySelector("meta[name='description']")
      .setAttribute("content", desc);
  }, []);
  return (
    <div className="About">
      <Meet color={color} />
      <Partners />
      <div className="container flex">
        <div>
          <p className="pro">
            Вы сможете пополнить баланс вашего аккаунта из <br /> любого, даже
            самого отдаленного места в <br /> Кыргызстане, а с помощью
            банковского перевода вы <br />
            сможете пополнить свой аккаунт или вывести деньги <br /> в любую
            страну мира. Прозрачные комиссии, наличие <br /> лицензии, большие
            резервы и отличная репутация <br /> гарантируют успех ваших обменных
            операций!
          </p>
          <div className="home-button-wrap">
            <img src={rgoup} alt="" />
            <div>
              <p className="projwct_text">
                Отсканируйте, чтобы загрузить приложение
              </p>
              <p className="projwct_ios">iOS и Android</p>
            </div>
          </div>
        </div>
        <div>
          <img className="tel" src={tel} alt="" />
        </div>
      </div>
    </div>
  );
};

export default About;
