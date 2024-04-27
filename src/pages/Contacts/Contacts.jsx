import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../api";
import "./Contacts.css";
import unsplash from "../../img/1707295405.png";

const Contacts = () => {
  const [content, setContent] = useState('')

  useEffect(() => {
    axios
      .get(url + `/pages/contacts`)
      .then((response) => {
        if (response.data.detail.content) {
          setContent(response.data.detail.content)
        }
      })
  }, []);
  return (
    <div className="contacts">
      <div className="container">
        <div className="contact_form" dangerouslySetInnerHTML={{__html: (content) ? content : ''}}>
          {/* <h1>Контакты</h1>
          <p><b class="text-danger">Не проводим сделок онлайн в мессенджерах. Только на сайте или в офисе в Бишкеке</b></p>
          <h2>Контакты</h2>
          <p><a href="tel:+996777225555">+996 (777) 22-55-55</a></p>
          <p><a href="https://wa.me/+996777225555" target="_blank">+996 (777) 22-55-55 (Whatsapp)</a></p>
          <p>Telegram <a href="https://t.me/xbtkg" target="_blank">@xbtkg</a></p>
          <p>Форум <a href="https://diesel.elcat.kg/index.php?showtopic=293198009" target="_blank">Diesel</a></p>
          <h2>Электронная почта</h2>
          <p><a href="mailto:kgblockchain312@gmail.com">kgblockchain312@gmail.com</a> - по поводу сотрудничества</p>
          <h2>Реквизиты</h2>
          <p className="pb-4">
            Сервис предоставляется <b>ОсОО "Кейджи блокчейн солушенс"</b>
            <br /><br />ИНН <b>01105202310063</b>
            <br />г. Бишкек, микрорайон № 10, Дом 29/1.
            <br />Лицензия <b>№46</b>  от <b>23</b> августа <b>2023</b> года
            <br />выдана Государственной службой регулирования и надзора за финансовым рынком
            <br />при Министерстве экономики и финансов <b>Кыргызской Республики</b>
          </p> */}
        </div>
        <div>
          <img className="bg_login" src={unsplash} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Contacts;
