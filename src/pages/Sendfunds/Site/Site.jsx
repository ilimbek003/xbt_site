import React, { useEffect, useState } from "react";
import Main from "../Main/Main";
import RegisterPersonal from "../Register/RegisterPersonal";
import Login from "../Login/Login";
import Navigetion from "../Navigetion/Navigetion";
import NewPassword from "../NewPassword/NewPassword";
import About from "../About/About";
import FAQ from "../FAQ/FAQ";
import Feedback from "../Feedback/Feedback";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { Route, Routes } from "react-router-dom";
import Header from "../../components/Header/Header";
import News from "../News/News";
import NewsDetails from "../NewsDetails/NewsDetails";
import axios from "axios";
import { url } from "../../api";

const Site = ({
  setColor,
  color,
  setLocal,
  isAuthenticated,
  setIsAuthenticated,
}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(url + "/reviews")
      .then((response) => {
        setData(response.data.reviews);
        setLoading(false);
      })
      .catch((error) => {
        // console.error("Error:", error);
      });
  }, []);

  return (
    <div className="site">
      <Header
        setColor={setColor}
        color={color}
        isAuthenticated={isAuthenticated}
      />
      <Routes>
        <Route index element={<Main color={color} reviewData={data} />} />
        <Route path="about" element={<About color={color} />} />
        <Route path="faq" element={<FAQ color={color} />} />
        <Route path="news" element={<News color={color} />} />
        <Route path="news/:id" element={<NewsDetails />} />
        <Route
          path="feedback"
          element={<Feedback color={color} loading={loading} data={data} />}
        />
        <Route
          path="register-personal"
          element={<RegisterPersonal color={color} />}
        />
        <Route
          path="login"
          element={
            <Login
              color={color}
              setLocalReload={setLocal}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route
          path="account-activation"
          element={<Navigetion color={color} />}
        />
        <Route path="new-password" element={<NewPassword color={color} />} />
        <Route
          path="forgot-password"
          element={<ForgotPassword color={color} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default Site;
