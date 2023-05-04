function PopupWithForm({ name, title, isOpen, onClose, buttonTitle, children }) {

  return (
    <div
      className={`popup popup_type_${name}${isOpen ? ' popup_opened' : ''}`}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть попап"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form className={`popup__form popup__form_type_${name}`} name={`form-${name}`} noValidate>
          {children}
          <button className="popup__submit" type="submit">{buttonTitle}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;