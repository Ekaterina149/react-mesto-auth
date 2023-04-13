import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React, { useState, useEffect, useContext } from "react";
function EditProfilePopup({
  formName,
  title,
  isOpen,
  onClose,
  onUpdateUser,
  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  function handleChange(evt, stateFunction) {
    stateFunction(evt.target.value);
  }

  useEffect(() => {
    if (!isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [isOpen, currentUser]);
  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      name={formName}
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <>
        <label className="popup__label">
          <input
            className="popup__input popup__input_type_name"
            type="text"
            id="nameInput"
            name="nameInput"
            placeholder="Имя"
            value={name}
            minLength="3"
            maxLength="40"
            pattern="^[a-zA-ZА-Яа-яЁё\s\-]+$"
            required
            onChange={(evt) => {
              handleChange(evt, setName);
            }}
          />
          <span className="nameInput-error popup__input-error"></span>
        </label>
        <label className="popup__label">
          <input
            className="popup__input popup__input_type_job"
            type="text"
            id="jobInput"
            name="jobInput"
            placeholder="Деятельность"
            minLength="2"
            maxLength="200"
            pattern="^[a-zA-ZА-Яа-яЁё\s\-]+$"
            required
            value={description}
            onChange={(evt) => {
              handleChange(evt, setDescription);
            }}
          />
          <span className="jobInput-error popup__input-error"></span>
        </label>
      </>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
