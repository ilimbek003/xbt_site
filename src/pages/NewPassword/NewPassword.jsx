import react, {useState} from "react";
import "./NewPassword.css";
import unsplash from "../../img/bg_register.svg";
import axios from "axios";
import { url } from "../../api";
import Loading from "../../components/IU/loading/loading";

const NewPassword = () => {
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [isNavigating, setIsNavigating] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (formData.new_password !== formData.confirm_password) {
      alert("Пароли не совпадают");
      return;
    }
    const dataToUpdate = { password: formData.new_password };
    axios
      .patch(url + "", dataToUpdate)
      .then((response) => {
        if (response.status === 200) {
          alert("Пароль успешно изменен");
        } else {
          alert("Не удалось изменить пароль");
        }
      })
      .catch((error) => {
        // console.error("Ошибка при выполнении запроса:", error);
      });
  };

  return (
    <div className="new_password">
      <div className="container">
        <div className="wrapper">
          <div className="wrapper_password">
            <h1>Сбросить пароль</h1>
            <form onSubmit={handleFormSubmit}>
              <label>Эл. почта/номер телефона</label>
              <input
                type="password"
                name="newPassword"
                value={formData.new_password}
                onChange={(e) =>
                  setFormData({ ...formData, new_password: e.target.value })
                }
                required
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirm_password}
                onChange={(e) =>
                  setFormData({ ...formData, confirm_password: e.target.value })
                }
                required
              />
              <button
                onSubmit={handleFormSubmit}
                // style={{ background: color ? "var(--green)" : "var(--orange)" }}
                className="btn"
              >
                {isNavigating ? <Loading /> : "Отправить"}
              </button>
            </form>
          </div>
          <img className="bg_password" src={unsplash} alt="" />
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
