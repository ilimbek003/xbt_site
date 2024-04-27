import React, { useEffect, useState } from "react";
import Latest from "../../components/Latest/Latest";
import LatestNews from "../../components/LatestNews/LatestNews";
import axios from "axios";
import { url } from "../../api";
import Loading from "../../components/IU/loading/loading";

const News = ({ color }) => {
  const [value, setValue] = useState("");
  const [news, setNews] = useState([]);
  const [newstate, setNewsState] = useState();
  const data = Object.values(news).map((item) => item);
  const dataNews = data[0] ? data[0] : false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url + "/news");
        setNews(response.data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  setTimeout(() => {
    if (dataNews != false) {
      const Newsdata = Object.values(dataNews).map((item) => item);
      setNewsState(Newsdata);
    } else {
      setNewsState(false);
    }
  }, 1);
  useEffect(() => {
    document.title = "Новости";
  }, []);
  return (
    <div className="news">
      {newstate ? (
        <>
          <LatestNews
            color={color}
            dataNews={newstate}
            value={value}
            setValue={setValue}
          />
          <Latest dataNews={newstate} value={value} />
        </>
      ) : (
        <div
          style={{
            width: "100%",
            height: 600,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="loading_div"
        >
          <Loading />
        </div>
      )}
    </div>
  );
};

export default News;
