import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const currentUser = useContext(CurrentUserContext)

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name={'edit'}
      title={'Редактировать профиль'}
      isOpen={isOpen}
      onClose={onClose}
      buttonTitle={'Сохранить'}
      onSubmit={handleSubmit}
    >
      <label className="popup__fieldset">
        <input
          className="popup__form-input popup__form-input_type_name"
          type="text" placeholder="Имя"
          name="name"
          required maxLength="40"
          minLength="2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="popup__input-error name-error"></span>
      </label>
      <label className="popup__fieldset">
        <input className="popup__form-input popup__form-input_type_job"
          type="text"
          placeholder="Деятельность"
          name="about"
          required maxLength="200"
          minLength="2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <span className="popup__input-error about-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup