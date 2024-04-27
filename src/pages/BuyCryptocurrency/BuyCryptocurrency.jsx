import React, { useEffect, useState, useMemo } from "react";
import "./BuyCryptocurrency.css";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { LineChart, Line } from "recharts";
import { color } from "chart.js/helpers";

const BuyCryptocurrency = ({
  datas,
  setAccount,
  account,
  setProfile,
  datas_personal,
}) => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const [ratesArray, setRatesArray] = useState([]);
  const verification = datas_personal[0]?.verification;
  useEffect(() => {
    const ratesArray = datas.map((el) => ({
      price: el.rates[0]?.price || 0,
    }));
    setRatesArray(ratesArray);
  }, [datas]);

  const filteredDatas = useMemo(() => {
    return datas.filter((obj) => {
      const fullName = obj.currency.toLowerCase();
      return fullName.includes(value.toLowerCase());
    });
  }, [datas, value]);

  return (
    <div id="sell_cryptocurrency">
      <div>
        <div className="holder">
          <div className="width">
            <BiSearch className="search_i" />
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              placeholder="Поиск"
            />
          </div>
          <h1>Купить Криптовалюту</h1>
        </div>
        <div className="sell_border">
          {filteredDatas.map((el, id) => (
            <div key={id}>
              {el.can_buy === true ? (
                <div className={`buy_cryp ${id == 0 && "first"}`} id={id}>
                  <div className="with_bys" style={{ margin: "0 0 0 10px" }}>
                    <div className="big">
                      <img src={el.logo} alt="" />
                      <div>
                        <h3>{el.currency}</h3>
                        <h6>{el.name}</h6>
                      </div>
                    </div>
                  </div>
                  <div className="with_bys">
                    <h3>${el.rate}</h3>
                    <h3 className="мarket_h3">Цена</h3>
                  </div>
                  <div className="with_bys">
                    <h3>{el.balance}</h3>
                    <h2
                      style={{
                        color: el.converted_balance > 0 ? "#0F8F67" : "red",
                      }}
                      className="мarket_h2"
                    >
                      {"$" + el.converted_balance}
                    </h2>
                  </div>
                  <div className="with_bys">
                    <button
                      style={{
                        background: "rgba(115, 244, 173, 1)",
                        color: "rgba(0, 0, 0, 1)",
                      }}
                      onClick={() =>
                        verification?.value == 1
                          ? navigate("/dashboard/settings") ||
                            setAccount(!account)
                          : null || verification?.value == 2
                          ? navigate(
                              `/dashboard/buy-cryptocurrency/${el.currency}`
                            )
                          : null || verification?.value == 3
                          ? navigate("/dashboard/settings") ||
                            setAccount(!account) ||
                            setProfile(false)
                          : null || verification?.value == 4
                          ? navigate("/dashboard/settings")
                          : null || setAccount(!account) || setProfile(false)
                      }
                    >
                      Купить
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyCryptocurrency;
