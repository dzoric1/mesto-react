import { useState } from "react"
import PopupWithForm from "./PopupWithForm"

const AddCardPopup = ({ isOpen, onClose, onAddCard }) => {

  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  function handleSubmit(e) {
    e.preventDefault();

    onAddCard({
      name,
      link
    });
  }

  return (
    <PopupWithForm
      name={'add'}
      title={'Новое место'}
      isOpen={isOpen}
      onClose={onClose}
      buttonTitle={'Создать'}
      onSubmit={handleSubmit}
    >
      <label className="popup__fieldset">
        <input
          className="popup__form-input popup__form-input_type_location"
          type="text"
          placeholder="Название"
          name="name"
          required
          maxLength="30"
          minLength="2"
          value={name || ''}
          onChange={(e) => setName(e.target.value)} />
        <span className="popup__input-error name-error"></span>
      </label>
      <label className="popup__fieldset">
        <input className="popup__form-input popup__form-input_type_url"
          type="url"
          placeholder="Ссылка на картинку"
          name="link"
          required
          value={link || ''}
          onChange={(e) => setLink(e.target.value)}
        />
        <span className="popup__input-error link-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddCardPopup