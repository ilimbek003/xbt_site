import React from "react";
import "./Meet.css";
import coin from "../../img/slider1-graphic1 1.png";
import ic from "../../img/Union.png";
import com from "../../img/Subtract.png";
import lic from "../../img/Union (1).png";
import op from "../../img/Union (2).png";

const data = [
  {
    id: 1,
    img: ic,
    name: "Нам доверяют более  70 млн. пользователей",
  },
  {
    id: 2,
    img: com,
    name: "Гарантия безопасности ваших данных",
  },
  {
    id: 3,
    img: lic,
    name: "Защита вашего виртуального кошелька",
  },
  {
    id: 4,
    img: op,
    name: "Удобное использование ",
  },
];

const Meet = ({ color }) => {
  return (
    <div className="meet">
      <div className="container">
        <div className="save1">
          <div className="wrapper">
            <h1>
              <span
                className="meet_green"
                style={{ color: color ? "#4ac49e" : "#ff5c00" }}
              >
                Xbt.kg - надежный
              </span>
              сервис <br /> для обмена криптовалюты!
            </h1>
            <p>
              XBT.kg — это сервис отвечающий даже самым <br /> серьезным
              запросам! XBT не просто обменка, <br /> а самое главное дело в
              нашей жизни, нам <br />
              действительно важен каждый наш клиент.{" "}
            </p>
          </div>
          <div className="about-image-block"></div>
          <img
            className="image"
            src={coin}
            alt="XBT LLC - About image"
            width="350px"
          />
        </div>
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

export default Meet;
