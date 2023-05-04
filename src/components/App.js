import { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isProfileEditPopupOpen, setProfileEditPopupOpen] = useState(false)
  const [isAddCardPopupOpen, setisAddCardPopupOpen] = useState(false)
  const [isAvatarEditPopupOpen, setIisAvatarEditPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState()

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
    setSelectedCard(null)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  return (
    <>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleProfileEditClick}
          onAddCard={handleAddCardClick}
          onAvatarEdit={handleAvatarClick}
          onCardClick={handleCardClick}
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
    </>
  );
}

export default App;