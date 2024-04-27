import React from "react";
import "./NotFoundPage.css";
import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="not_found_page">
      <h1>Страница не найдена</h1>
      <p>Неправильно набран адрес, или такой страницы на сайте больше не существует</p>
      <NavLink to="/" className="button">На главную страницу</NavLink>
    </div>
  );
};

export default NotFoundPage;
