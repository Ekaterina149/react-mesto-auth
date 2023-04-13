function NewComponent() {
  return (
    <div className="user">
      <div className="user__container">
        <h2 className="user__header">Регистрация</h2>
        <form className="user__form" name="form" method="get">
          <fieldset className="user__fieldset" id="fieldsetPlacename">
            <label className="user__label">
              <input
                className="user__input user__input_type_place"
                type="text"
                id="placeInput"
                name="name"
                placeholder="Название"
                minlength="2"
                maxlength="30"
                pattern="^[a-zA-ZА-Яа-яЁё\.\'\-\s]+$"
                required
              />
              <span className="placeInput-error user__input-error"></span>
            </label>
            <label className="user__label">
              <input
                className="user__input user__input_type_link"
                type="url"
                id="linkInput"
                name="link"
                placeholder="Ссылка на картинку"
                required
              />
              <span className="linkInput-error user__input-error"></span>
            </label>
          </fieldset>
          <button className="user__submit" type="submit" aria-label="Сохранить">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}
export default NewComponent;
