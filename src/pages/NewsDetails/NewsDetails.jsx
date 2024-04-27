import React, { useEffect, useState } from "react";
import "./NewsDetails.css";
import { useParams } from "react-router";
import axios from "axios";
import { url } from "../../api";
import { AiFillEye } from "react-icons/ai";
import { MdOutlineDateRange } from "react-icons/md";
import Loading from "../../components/IU/loading/loading";

const NewsDetails = () => {
  const [news, setNews] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url + `/news/${id}`);
        setNews(response.data.detail);
      } catch (error) {
        // console.log("Ошибка:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="news_details">
      {news ? (
        <div className="container">
          <h1>{news.name}</h1>
          {React.createElement("p", {
            dangerouslySetInnerHTML: {
              __html: news.body ? news.body : "",
            },
          })}
          <div className="icon_box">
            <div className="icons">
              <MdOutlineDateRange className="icon" size={20} />
              <p>{news.date}</p>
            </div>
            <div className="icons">
              <AiFillEye className="icon" size={20} />
              <p>{news.views}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="loading_div">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default NewsDetails;
