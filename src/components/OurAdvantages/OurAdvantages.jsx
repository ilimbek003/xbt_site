import React from "react";
import "../OurAdvantages/OurAdvantages.css";
import ic from "../../img/ic_bezopasnost.png";
import com from "../../img/ic_commission.png";
import lic from "../../img/ic_license.png";
import op from "../../img/ic_oplata.png";

const data = [
  {
    id: 1,
    img: ic,
    name: "Безопасность пользователей",
  },
  {
    id: 2,
    img: com,
    name: "Прозрачные комиссии",
  },
  {
    id: 3,
    img: lic,
    name: "Наличие лицензии",
  },
  {
    id: 4,
    img: op,
    name: "Разнообразие способов оплаты",
  },
];

const OurAdvantages = () => {
  return (
    <div className="our_advantages">
      <div className="container">
        <p className="text">Наши преимущества</p>
        <p className="pro">
          Наше видение заключается в продвижении свободы денег. Мы верим, что,
          продвигая <br /> эту свободу, мы можем повлиять на качество жизни по
          всему миру.
        </p>
        <div className="home_block">
          {data.map((item) => (
            <div className="block_our" key={item.id}>
              <div className="radius">
                <img src={item.img} alt="" />
              </div>
              <p className="margen">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurAdvantages;
