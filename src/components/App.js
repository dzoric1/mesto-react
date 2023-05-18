import { useState, useEffect, } from 'react';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarProfilePopup from './EditAvatarPopup';
import AddCardPopup from './AddCardPopup';

function App() {

  const [cards, setCards] = useState([])
  const [isProfileEditPopupOpen, setProfileEditPopupOpen] = useState(false)
  const [isAddCardPopupOpen, setisAddCardPopupOpen] = useState(false)
  const [isAvatarEditPopupOpen, setIisAvatarEditPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' })
  const [currentUser, setCurrentUser] = useState({})

  const [editButtonText, setEditButtonText] = useState('Сохранить')
  const [addButtonText, setAddButtonText] = useState('Создать')
  const [avatarButtonText, setAvatarButtonText] = useState('Сохранить')

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getCards()
    ])
      .then(([userData, cardsData]) => {
        setCards(cardsData)
        setCurrentUser(userData)
      })
      .catch(err => console.warn(err))
      .finally(() => setIsLoading(false))
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
      .catch(err => console.warn(err))
  }

  function handleUpdateUser(userData) {
    setEditButtonText('Сохранение...')
    api.patchUserInfo(userData)
      .then(newUserData => {
        setCurrentUser(newUserData)
        closeAllPopups()
      })
      .catch(err => console.warn(err))
      .finally(() => setEditButtonText('Сохранить'))
  }

  function handleUpdateAvatar(avatar) {
    setAvatarButtonText('Сохранение...')
    api.updateAvatar(avatar)
      .then(newUserData => {
        setCurrentUser(newUserData)
        closeAllPopups()
      })
      .catch(err => console.warn(err))
      .finally(() => setAvatarButtonText('Сохранить'))
  }

  function handleAddCardSubmit(card) {
    setAddButtonText('Создание...')
    api.addCard(card)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => console.warn(err))
      .finally(() => setAddButtonText('Создать'))
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

          isLoading={isLoading}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isProfileEditPopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonText={editButtonText}
        />

        <AddCardPopup
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCardSubmit}
          buttonText={addButtonText}
        />

        <EditAvatarProfilePopup
          isOpen={isAvatarEditPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonText={avatarButtonText}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>

    </CurrentUserContext.Provider>

  );
}

export default App