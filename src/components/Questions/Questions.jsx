import React, { useEffect, useState } from "react";
import "./Questions.css";
import icon from "../../img/Arrow 2.svg";
import icons from "../../img/Arrow 2.svg";
import Loading from "../IU/loading/loading";
import axios from "axios";
import { url } from "../../api";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";

const Questions = ({ color }) => {
  const [selected, setSelected] = useState(null);
  const [dataFaq, setDataFaq] = useState([]);
  const [faq, setFaq] = useState([]);
  const navigate = useNavigate();

  function naviFaq() {
    navigate("/faq");
  }

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

  setTimeout(() => {
    setDataFaq(accumulatedData[1]);
  }, 1);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  return (
    <div id="questions">
      <div className="container">
        <h1 className="questions_h1">Часто задаваемые вопросы</h1>
        <div className="accordion">
          {dataFaq ? (
            dataFaq.map((el, i, idx) => {
              return (
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
                  <div
                    className={selected === i ? "content show  " : "content"}
                  >
                    <div
                      className={selected === i ? "content show  " : "content"}
                    ></div>
                    {React.createElement("p", {
                      dangerouslySetInnerHTML: {
                        __html: el.answer ? el.answer : "",
                      },
                    })}
                  </div>
                </div>
              );
            })
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

export default Questions;
