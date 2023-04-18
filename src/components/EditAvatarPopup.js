import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";
function EditAvatarPopup({
  formName,
  title,
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoading,
}) {
  const avatarLink = useRef();

  useEffect(() => {
    if (!isOpen) {
      avatarLink.current.value = "";
    }
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar(avatarLink.current.value);
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
            ref={avatarLink}
            className="popup__input popup__input_type_link"
            type="url"
            name="avatar"
            id="avatarlink"
            placeholder="Ссылка на аватар"
            required
          />
          <span className="avatarlink-error popup__input-error"></span>
        </label>
      </>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
