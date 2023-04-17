import React, { useState } from "react";
function Login({ onAuthorize }) {
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
    onAuthorize(email, password);
  }
  return (
    <div className="user">
      <div className="user__container">
        <h2 className="user__header">Вход</h2>
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
            Войти
          </button>
          {/* {linkBottomPage ? (
            <a className="user__link" href="#" target="_blank">
              {linkBottomPage }
            </a>
          ):  <a>
        </a>} */}
        </form>
      </div>
    </div>
  );
}
export default Login;
