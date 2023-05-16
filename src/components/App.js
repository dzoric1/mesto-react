import { useState, useEffect } from 'react';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarProfilePopup from './EditAvatarPopup';

function App() {

  const [cards, setCards] = useState([])
  const [isProfileEditPopupOpen, setProfileEditPopupOpen] = useState(false)
  const [isAddCardPopupOpen, setisAddCardPopupOpen] = useState(false)
  const [isAvatarEditPopupOpen, setIisAvatarEditPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' })
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    api.getUserInfo()
      .then(userData => setCurrentUser(userData))
      .catch(err => console.warn(err))
  }, [])

  useEffect(() => {
    Promise.all([
      api.getCards()
    ])
      .then(([cardsData]) => {
        setCards(cardsData)
      })
      .catch(err => console.warn(err))
  }, [])

  function handleProfileEditClick() {
    setProfileEditPopupOpen(true)
  }

  function handleAddCardClick() {
    setisAddCardPopupOpen(true)
  }

  function handleAvatarClick() {
    setIisAvatarEditPopupOpen(true)
  }

  function closeAllPopups() {
    setIisAvatarEditPopupOpen(false)
    setisAddCardPopupOpen(false)
    setProfileEditPopupOpen(false)
    setSelectedCard({ name: '', link: '' })
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleLikeClick(card, isLiked) {
    if (isLiked) {
      api.toggleLike(card._id, 'DELETE')
        .then(newCard => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => console.warn(err))
    } else {
      api.toggleLike(card._id, 'PUT')
        .then(newCard => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => console.warn(err))
    }
  }

  function handleCardDelete(id) {
    api.deleteCard(id)
      .then(() => {
        setCards(cards.filter(card => card._id !== id))
      })
  }

  function handleUpdateUser(userData) {
    api.patchUserInfo(userData)
      .then(newUserData => setCurrentUser(newUserData))
  }

  function handleUpdateAvatar(avatar) {
    api.updateAvatar(avatar)
      .then(newUserData => setCurrentUser(newUserData))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">
        <Header />
        <Main
          onEditProfile={handleProfileEditClick}
          onAddCard={handleAddCardClick}
          onAvatarEdit={handleAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleLikeClick}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />

        <EditProfilePopup isOpen={isProfileEditPopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <PopupWithForm
          name={'add'}
          title={'Новое место'}
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
          buttonTitle={'Создать'}
        >
          <label className="popup__fieldset">
            <input className="popup__form-input popup__form-input_type_location" type="text" placeholder="Название"
              name="name" required maxLength="30" minLength="2" />
            <span className="popup__input-error name-error"></span>
          </label>
          <label className="popup__fieldset">
            <input className="popup__form-input popup__form-input_type_url" type="url" placeholder="Ссылка на картинку"
              name="link" required />
            <span className="popup__input-error link-error"></span>
          </label>
        </PopupWithForm>

        <EditAvatarProfilePopup isOpen={isAvatarEditPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>

    </CurrentUserContext.Provider>
  );
}

export default App