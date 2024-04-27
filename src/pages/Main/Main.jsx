import React, { useEffect, useState } from "react";
import Home from "../../components/Home/Home";
import Popular from "../../components/Popular/Popular";
import Stay from "../../components/Stay/Stay";
import Advantages from "../../components/Advantages/Advantages";
import App from "../../components/HomeApp/App";
import Questions from "../../components/Questions/Questions";
import axios from "axios";
import { url } from "../../api";
import OurAdvantages from "../../components/OurAdvantages/OurAdvantages";
const Main = ({ color }) => {
  const [popular, setPopular] = useState([]);
  const data = Object.values(popular).map((data) => data);
  const [count, setCount] = useState([]);
  const datas = Object.values(count).map((data) => data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url + "/index");
        setPopular(response.data.currencies);
      } catch (error) {
        // console.log("Ошибка:", error)
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    axios
      .get(url + "/currencies")
      .then((response) => {
        setCount(response.data.currencies);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    document.title = "XBT - Покупка. Продажа. Обмен криптовалюты";
  }, []);

  return (
    <div className="main">
      <Home data={data} color={color} datas={datas} />
      <OurAdvantages />
      <Popular data={data} color={color} datas={datas} />
      <Stay color={color} />
      <Advantages color={color} />
      {/* <App color={color} /> */}
      <Questions color={color} />
    </div>
  );
};

export default Main;
