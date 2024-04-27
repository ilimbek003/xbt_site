import React from "react";
import "./Latest.css";
import Loading2 from "../IU/loading2/loading2";
import { useNavigate } from "react-router";

const Latest = ({ dataNews, value }) => {
  const navigate = useNavigate();

  return (
    <div id="latest">
      <div className="container">
        <div className="grid">
          {dataNews ? (
            dataNews
              .filter((obj) => {
                const fullName = obj.name.toLowerCase();
                return fullName.includes(value.toLowerCase());
              })
              .map((el, index) => (
                <div
                  key={index}
                  onClick={() => navigate(`/news/${el.id}`)}
                  className="dummy_grid"
                >
                  <div className="news-photo">
                    <img
                      className="photo"
                      src={el ? el.photo : <Loading2 />}
                      alt=""
                    />
                  </div>
                  <h1>{el ? el.name : <Loading2 />}</h1>
                  <h6>{el ? el.date : <Loading2 />}</h6>
                </div>
              ))
          ) : (
            <Loading2 />
          )}
        </div>
      </div>
    </div>
  );
};

export default Latest;
