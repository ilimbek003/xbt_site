import react, { useState, useEffect } from "react";
import "./SellCryptocurrency.css";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const SellCryptocurrency = ({
  datas,
  setAccount,
  account,
  setProfile,
  datas_personal,
}) => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [ratesArray, setRatesArray] = useState([]);
  const verification = datas_personal[0]?.verification;
  useEffect(() => {
    const ratesArray = datas.map((el) => ({
      price: el.rates[0]?.price || 0,
    }));
    setRatesArray(ratesArray);
  }, [datas]);

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
          <h1>Продать Криптовалюту</h1>
        </div>
        <div className="sell_border">
          {datas
            .filter((obj) => {
              const fullName = obj.currency.toLowerCase();
              return fullName.includes(value.toLowerCase());
            })
            .map((el, id) => (
              <div key={id}>
                {el.can_sell === true ? (
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
                        onClick={() =>
                          verification?.value == 1
                            ? navigate("/dashboard/settings") ||
                              setAccount(!account)
                            : null || verification?.value == 2
                            ? navigate(
                                `/dashboard/sell-cryptocurrency/${el.currency}`
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
                        Продать
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

export default SellCryptocurrency;
