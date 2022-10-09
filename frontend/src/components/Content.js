import { useEffect, useState } from "react";
import api from "../utils/api";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ConfirmationDeletePopup from "./ConfirmationDeletePopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function Content() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);

  const [currentUser, setCurrentUser] = useState({
    userName: "Пришелец Альф",
    userDescription: "Порядочный обжора",
    userAvatar: "",
  });

  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  const [selectedCard, setSelectedCard] = useState({});

  //Открытие попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(link, name) {
    setSelectedCard({
      isOpen: true,
      link: link,
      name: name,
    });
  }

  function handleDeleteClick(cardId) {
    setCurrentCard(cardId);
    setIsConfirmDeletePopupOpen(true);
  }

  //Данные пользователя с api
  useEffect(() => {
    api
      .getUserData()
      .then((userInfo) => {
        setCurrentUser({
          ...userInfo,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Карточки с api
  useEffect(() => {
    api
      .getCards()
      .then((cards) => setCards([...cards]))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Обновление данных пользователя с api
  function handleUpdateUser(user) {
    api
      .setUserData(user.name, user.about)
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          name: res.name,
          about: res.about,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Обновление аватара пользователя с api
  function handleUpdateAvatar(avatar) {
    api
      .updateAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Лайк карточке с api
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .likeSwitcher(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Удаление карточки в попапе подтверждения удаления с api
  function handleCardDeleteConfirm() {
    api
      .deleteCard(currentCard._id)
      .then(() => {
        setCards((state) =>
          state.filter((c) => {
            return c._id !== currentCard._id;
          })
        );
        setCurrentCard({});
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Добавление карточки с api
  function handleAddPlace(cardData) {
    api
      .addCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Закрытие попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        selectedCard={selectedCard}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleDeleteClick}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <ConfirmationDeletePopup
        isOpen={isConfirmDeletePopupOpen}
        onClose={closeAllPopups}
        onConfirmClick={handleCardDeleteConfirm}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
      />

      <ImagePopup onClose={closeAllPopups} card={selectedCard} />
    </CurrentUserContext.Provider>
  );
}
