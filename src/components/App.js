import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import React, { useState, useEffect } from "react";
import { api, setApi } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, getCurrentUser] = useState({
    about: "",
    avatar: "",
    name: "",
  });
  const [cards, setCards] = useState([]);
  const [deletePlaceConfirm, setDeletePlaceConfirm] = useState({
    isOpen: false,
    card: {},
  });
  const [isLoading, setLoading] = useState(false);
  console.log(isLoading);
  useEffect(() => {
    Promise.all([api.getData("/users/me"), api.getData("/cards")])

      .then(([userData, cardData]) => {
        getCurrentUser(userData);
        setCards([...cardData]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleDeletePopupClick(card) {
    setDeletePlaceConfirm({ isOpen: true, card: card });
  }
  function handleCardDelete(card) {
    setLoading(true);
    setApi
      .setData(`/cards/${card._id}`, "DELETE")
      .then((res) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setDeletePlaceConfirm({ isOpen: false, card: {} });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    setApi
      .setData(`/cards/${card._id}/likes`, !isLiked ? "PUT" : "DELETE")
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateUser(userInfo) {
    setLoading(true);
    setApi
      .setData("/users/me", "PATCH", userInfo)
      .then((updatedUser) => {
        getCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }
  function handleUpdateAvatar(link) {
    setLoading(true);
    setApi
      .setData("/users/me/avatar", "PATCH", { avatar: link })
      .then((updatedAvatar) => {
        getCurrentUser(updatedAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

  function handleAddPlaceSubmit(cardInfo) {
    setLoading(true);
    setApi
      .setData("/cards", "POST", cardInfo)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header />
          <Main
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onDeleteCardClick={handleDeletePopupClick}
            onCardLike={handleCardLike}
          />
          <EditProfilePopup
            formName="edit"
            title="Редактировать профиль"
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />

          <AddPlacePopup
            name="add"
            title="Новое место"
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
            onClose={closeAllPopups}
            isLoading={isLoading}
          />

          <EditAvatarPopup
            formName="avatar"
            title="Обновить аватар"
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <DeleteCardPopup
            formname="delete-card"
            title="Вы уверены?"
            isOpen={deletePlaceConfirm.isOpen}
            onClose={closeAllPopups}
            buttonName="Да"
            card={deletePlaceConfirm.card}
            onCardDelete={handleCardDelete}
            isLoading={isLoading}
          />

          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
