import React from "react";
import "./NewsLatest.css";
import Loading2 from "../IU/loading2/loading2";
import eli from "../../img/Ellipse 7.svg";

const NewsLatest = ({ dataNews }) => {
  return (
    <div id="news__latest">
      <div className="container">
        {dataNews ? (
          <div className="latest__news__block">
            <img className="phone" src={dataNews[0].photo} alt="" />
            <div>
              <h1>{dataNews[0].name}</h1>
              <p>{dataNews[0].body}</p>
              <h6>{dataNews[0].date}</h6>
            </div>
          </div>
        ) : (
          <Loading2 />
        )}
      </div>
    </div>
  );
};

export default NewsLatest;
