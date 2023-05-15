import { useState, useEffect } from 'react';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

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

  function handleLikeClick(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id)

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
          cards={cards}
        />
        <Footer />

        <PopupWithForm
          name={'edit'}
          title={'Редактировать профиль'}
          isOpen={isProfileEditPopupOpen}
          onClose={closeAllPopups}
          buttonTitle={'Сохранить'}
        >
          <label className="popup__fieldset">
            <input className="popup__form-input popup__form-input_type_name" type="text" placeholder="Имя" name="name"
              required maxLength="40" minLength="2" />
            <span className="popup__input-error name-error"></span>
          </label>
          <label className="popup__fieldset">
            <input className="popup__form-input popup__form-input_type_job" type="text" placeholder="Деятельность"
              name="about" required maxLength="200" minLength="2" />
            <span className="popup__input-error about-error"></span>
          </label>
        </PopupWithForm>

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

        <PopupWithForm
          name={'avatar'}
          title={'Обновить аватар'}
          isOpen={isAvatarEditPopupOpen}
          onClose={closeAllPopups}
          buttonTitle={'Сохранить'}
        >
          <label className="popup__fieldset">
            <input className="popup__form-input popup__form-input_type_avatar" type="url" placeholder="Ссылка на аватар"
              name="avatar" required />
            <span className="popup__input-error avatar-error"></span>
          </label>
        </PopupWithForm>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;