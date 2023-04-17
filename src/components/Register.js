import React, { useState } from "react";
import { Link } from "react-router-dom";
function Register({ linkBottomPage, onRegister, route }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }
  function handleSubmit(evt) {
    const { email, password } = formValue;
    evt.preventDefault();
    onRegister(email, password);
  }
  return (
    <div className="user">
      <div className="user__container">
        <h2 className="user__header">Регистрация</h2>
        <form
          className="user__form"
          name="form"
          method="get"
          onSubmit={handleSubmit}
        >
          <fieldset className="user__fieldset">
            <label className="user__label">
              <input
                className="user__input user__input_type_email"
                type="email"
                id="email"
                name="email"
                placeholder="email"
                minLength="2"
                value={formValue.email}
                onChange={handleChange}
                required
              />
              <span className="placeInput-error user__input-error"></span>
            </label>
            <label className="user__label">
              <input
                className="user__input user__input_type_password"
                type="password"
                id="passwordInput"
                name="password"
                placeholder="Пароль"
                value={formValue.password}
                onChange={handleChange}
                required
              />
              <span className="linkInput-error user__input-error"></span>
            </label>
          </fieldset>
          <button
            className="user__btn opacity"
            type="submit"
            aria-label="Зарегистрироваться"
          >
            Зарегистрироваться
          </button>
          {linkBottomPage && (
            <Link className="user__link" to={route}>
              {linkBottomPage}
            </Link>
          )}
        </form>
      </div>
    </div>
  );
}
export default Register;
