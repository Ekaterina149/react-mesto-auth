import PopupWithForm from "./PopupWithForm";
// import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useState, useEffect } from "react";
function AddPlacePopup({
  formName,
  title,
  isOpen,
  onClose,
  onAddPlace,
  isLoading,
}) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  // const currentUser = useContext(CurrentUserContext);
  function handleChange(evt, stateFunction) {
    stateFunction(evt.target.value);
  }
  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    // console.log(currentUser);
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name,
      link,
    });
  }
  useEffect(() => {
    if (!isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);

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
            className="popup__input popup__input_type_place"
            type="text"
            id="placeInput"
            name="name"
            value={name}
            placeholder="Название"
            minLength="2"
            maxLength="30"
            // pattern="^[a-zA-ZА-Яа-яЁё\.\'\-\s]+$"
            required
            onChange={(evt) => {
              handleChange(evt, setName);
            }}
          />
          <span className="placeInput-error popup__input-error"></span>
        </label>
        <label className="popup__label">
          <input
            className="popup__input popup__input_type_link"
            type="url"
            id="linkInput"
            name="link"
            value={link}
            placeholder="Ссылка на картинку"
            required
            onChange={(evt) => {
              handleChange(evt, setLink);
            }}
          />
          <span className="linkInput-error popup__input-error"></span>
        </label>
      </>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
