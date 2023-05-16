import { useRef } from "react";
import PopupWithForm from "./PopupWithForm"

const EditAvatarProfilePopup = ({ isOpen, onClose, onUpdateAvatar }) => {

  const avatarRef = useRef(null)


  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }


  return (
    <PopupWithForm
      name={'avatar'}
      title={'Обновить аватар'}
      isOpen={isOpen}
      onClose={onClose}
      buttonTitle={'Сохранить'}
      onSubmit={handleSubmit}
    >
      <label className="popup__fieldset">
        <input
          className="popup__form-input popup__form-input_type_avatar"
          type="url"
          placeholder="Ссылка на аватар"
          name="avatar"
          required
          // value={avatarRef.current.value || ''}
          ref={avatarRef}
        />
        <span className="popup__input-error avatar-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarProfilePopup