import React from "react";
import "./Operations.css";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const Operation = ({ el, setModal, funcDataOperation }) => {
  return (
    <>
      <div
        onClick={() =>
          el.status.value === "2"
            ? setModal(true) || funcDataOperation(el)
            : false
        }
        className="save_oper"
      >
        <img src={el.logo} alt="" />
        <span className="name">
          <p>{el.date}</p>
          <span className="opt-time">{el.time}</span>
        </span>
        <p>{el.type}</p>
        {el.debit ? <p className="text-success">{el.debit}</p> : <p>-</p>}
        {el.credit ? <p className="text-error">{el.credit}</p> : <p>-</p>}
        <button
          style={{
            color:
              el.status.value == 2
                ? "var(--green)"
                : el.status.value == 3
                ? "red"
                : el.status.value == 1
                ? "rgba(0, 239, 142, 1)"
                : "",
          }}
          className="btn"
        >
          {el.status.name}
        </button>
      </div>
      <div
        onClick={() => setModal(true) || funcDataOperation(el)}
        className="save_oper cross"
      >
        <img src={el.logo} alt="" />
        <p>{el.type}</p>
        {el.debit ? (
          <p className="summ" style={{ color: "#03ff03" }}>
            +{el.debit}
          </p>
        ) : el.credit ? (
          <p className="summ" style={{ color: "red" }}>
            -{el.credit}
          </p>
        ) : (
          <p>-</p>
        )}
      </div>
    </>
  );
};

export default Operation;
