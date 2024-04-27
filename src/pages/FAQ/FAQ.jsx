import React, { useEffect, useState } from "react";
import "./FAQ.css";
import icon from "../../img/Arrow 2.svg";
import icons from "../../img/Arrow 2.svg";
import axios from "axios";
import Loading from "../../components/IU/loading/loading";
import { GoPlus } from "react-icons/go";
import { url } from "../../api";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const FAQ = ({ color }) => {
  const navigate = useNavigate();
  const [one, setOne] = useState(true);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [selected, setSelected] = useState(null);
  const [dataFaq, setDataFaq] = useState([]);
  const [faq, setFaq] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url + "/faq");
        setFaq(response.data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const accumulatedData = [];
  for (const key in faq) {
    if (faq.hasOwnProperty(key)) {
      const accordionsData = faq[key];
      for (const key in accordionsData) {
        if (accordionsData.hasOwnProperty(key)) {
          const currency = accordionsData[key];
          accumulatedData.push(currency);
        }
      }
    }
  }
  const accumulatedNames = [];

  for (const key in faq) {
    if (faq.hasOwnProperty(key)) {
      const innerObject = faq[key];
      for (const innerKey in innerObject) {
        if (innerObject.hasOwnProperty(innerKey)) {
          accumulatedNames.push(innerObject[innerKey]);
        }
      }
    }
  }
  setTimeout(() => {
    if (one) {
      setDataFaq(accumulatedData[0]);
    }
  });
  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };
  useEffect(() => {
    document.title = "FAQ";
  }, []);

  return (
    <div className="faq">
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "45px 0 25px 0",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <p className="about">Главная</p>
          <FaArrowLeftLong
            size={24}
            color="rgba(252, 252, 252, 1)"
            style={{ margin: "0 10px 0 10px" }}
          />
          <p className="news">FAQ</p>
        </div>
        <h1>Часто задаваемые вопросы</h1>
        <div className="buttons_category">
          {accumulatedNames[0]?.slice(0, 1).map((el) => (
            <div>
              <button
                style={{
                  borderBottom: one
                    ? color
                      ? "1px solid var(--green)"
                      : "var(--orange)"
                    : "none",
                }}
                onClick={() =>
                  setOne(true) ||
                  setTwo(false) ||
                  setThree(false) ||
                  setDataFaq(accumulatedData[0]) ||
                  toggle()
                }
                className={one ? "btn" : "btn active"}
              >
                {el.name}
              </button>
            </div>
          ))}
          {accumulatedNames[1]?.slice(0, 1).map((el) => (
            <div>
              <button
                style={{
                  borderBottom: two
                    ? color
                      ? "1px solid var(--green)"
                      : "var(--orange)"
                    : "none",
                }}
                onClick={() =>
                  setOne(false) ||
                  setTwo(true) ||
                  setThree(false) ||
                  setDataFaq(accumulatedData[1]) ||
                  toggle()
                }
                className={two ? "btn" : "btn active"}
              >
                {el.name}
              </button>
            </div>
          ))}
        </div>
        <div className="accordion">
          {dataFaq ? (
            dataFaq.map((el, i, idx) => (
              <div
                key={i}
                onClick={() => toggle(i)}
                className={selected === i ? "sit box " : "sit"}
              >
                <div className="sit-amet">
                  <h4 className="arty" key={idx.id}>
                    {el.question}
                  </h4>
                  <div className="magic">
                    {selected === i ? (
                      <GoPlus
                        className="roteit"
                        size={45}
                        color="rgba(255, 255, 255, 1)"
                      />
                    ) : (
                      <GoPlus
                        className="icon"
                        size={45}
                        color="rgba(255, 255, 255, 1)"
                      />
                    )}
                  </div>
                </div>
                <div className={selected === i ? "content show  " : "content"}>
                  <div
                    className={selected === i ? "content show  " : "content"}
                  >
                    {React.createElement("p", {
                      dangerouslySetInnerHTML: {
                        __html: el.answer ? el.answer : "",
                      },
                    })}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="loading_div">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
