import React, { useEffect, useState } from "react";
import "./PersonalArea.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Head from "../../components/Head/Head";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import TopUp from "../TopUp/TopUp";
import Settings from "../Settings/Settings";
import SendFunds from "../Sendfunds/SendFunds";
import Operations from "../Operations/Operations";
import axios from "axios";
import { url } from "../../api";
import PaymentFor from "../PaymentFor/PaymentFor";
import Withdraw from "../Withdraw/Withdraw";
import Translation from "../Translation/Translation";
import BuyCryptocurrency from "../BuyCryptocurrency/BuyCryptocurrency";
import ProtocolBuy from "../ProtocolBuy/ProtocolBuy";
import SellCryptocurrency from "../SellCryptocurrency/SellCryptocurrency";
import Protocol from "../Protocol/Protocol";
import Cabinet from "../Cabinet/Cabinet";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const PersonalArea = ({
  color,
  setColor,
  setIsAuthenticated,
  isAuthenticated,
}) => {
  const [home, setHome] = useState(false);
  const navigate = useNavigate();
  const [local, setLocal] = useState("");
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState([]);
  const [log, setLog] = useState([]);
  const [personal, setPersonal] = useState([]);
  const datas = Object.values(count).map((data) => data);
  const datas_log = Object.values(log).map((data) => data);
  const datas_personal = Object.values(personal).map((data) => data);
  const is2faEnabled =
    personal && personal.profile && personal.profile.security["2fa"];
  const [account, setAccount] = useState(false);
  const [profile, setProfile] = useState(true);
  useEffect(() => {
    document.title = "Личный кабинет - XBT";
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLocal(token);
    }
  }, []);
  const headers = {
    Authorization: `Bearer ${local}`,
  };
  useEffect(() => {
    if (local) {
      axios
        .get(url + "/currencies", { headers })
        .then((response) => {
          setCount(response.data.currencies);
          setLoading(false);
        })
        .catch();
    }
  }, [local]);
  function balanceTether() {
    if (local) {
      axios
        .get(url + "/currencies", { headers })
        .then((response) => {
          setCount(response.data.currencies);
          setLoading(false);
        })
        .catch((error) => {});
    }
  }
  useEffect(() => {
    if (local) {
      axios
        .get(url + "/profile/action-log", { headers })
        .then((response) => {
          setLog(response.data.action);
        })
        .catch((error) => {
          setHome(true);
        });
    }
  }, [local]);
  useEffect(() => {
    if (local) {
      axios
        .get(url + "/profile/personal", { headers })
        .then((response) => {
          setPersonal(response.data);
        })
        .catch();
    }
  }, [local]);
  function personalChange() {
    if (local) {
      axios
        .get(url + "/profile/personal", { headers })
        .then((response) => {
          setPersonal(response.data);
        })
        .catch();
    }
  }
  useEffect(() => {
    if (local) {
      axios
        .get(url + "/profile/action-log", { headers })
        .then((response) => {
          setLog(response.data.action);
        })
        .catch();
    }
  }, [local]);
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath !== "/dashboard/translation") {
      localStorage.removeItem("balance");
    } else {
      navigate("/dashboard/translation");
    }
  }, []);
  return (
    <div>
      <div className="borderd">
        <Header
          setColor={setColor}
          color={color}
          isAuthenticated={isAuthenticated}
        />
      </div>
      <div className="personal_area">
        <Head
          home={home}
          color={color}
          setColor={setColor}
          datas={datas}
          datas_personal={datas_personal}
          setIsAuthenticated={setIsAuthenticated}
        />
        <div className="prosons">
          <Routes>
            <Route path="top-up" element={<TopUp color={color} />} />
            <Route
              path="top-up/:nikcurrancy"
              element={<TopUp color={color} currencies={datas} />}
            />
            <Route
              path="home"
              element={
                <Cabinet
                  color={color}
                  datas={datas}
                  datas_personal={datas_personal}
                  datas_log={datas_log}
                  loading={loading}
                />
              }
            />
            <Route
              path="settings"
              element={
                <Settings
                  is2faEnabled={is2faEnabled}
                  color={color}
                  datas_personal={datas_personal}
                  personalChange={personalChange}
                  personal={personal}
                  setPersonal={setPersonal}
                  setAccount={setAccount}
                  account={account}
                  setProfile={setProfile}
                  profile={profile}
                />
              }
            />
            <Route
              path="translation"
              element={
                <Withdraw
                  datas={datas}
                  datas_personal={datas_personal}
                  setAccount={setAccount}
                  account={account}
                  setProfile={setProfile}
                  profile={profile}
                />
              }
            />
            <Route
              path="translation/:currency"
              element={
                <Translation
                  currencies={datas}
                  color={color}
                  mainBalance={balanceTether}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="operations" element={<Operations />} />
            <Route path="send-funds" element={<SendFunds />} />
            <Route path="payment-for-services" element={<PaymentFor />} />
            <Route
              path="buy-cryptocurrency"
              element={
                <BuyCryptocurrency
                  datas={datas}
                  setAccount={setAccount}
                  account={account}
                  setProfile={setProfile}
                  datas_personal={datas_personal}
                />
              }
            />
            <Route
              path="buy-cryptocurrency/:id"
              element={
                <ProtocolBuy balanceTether={balanceTether} currencies={datas} />
              }
            />
            <Route
              path="sell-cryptocurrency"
              element={
                <SellCryptocurrency
                  datas={datas}
                  setAccount={setAccount}
                  account={account}
                  setProfile={setProfile}
                  datas_personal={datas_personal}
                />
              }
            />
            <Route
              path="sell-cryptocurrency/:name"
              element={
                <Protocol balanceTether={balanceTether} currencies={datas} />
              }
            />
          </Routes>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(79, 75, 92, 1)" }}>
        <Footer />
      </div>
    </div>
  );
};

export default PersonalArea;
