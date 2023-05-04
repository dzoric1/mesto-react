
function ImagePopup({ card, onClose }) {

  return (
    <div className={`popup popup_type_image ${card ? 'popup_opened' : ''} popup_darker`}>
      <div className="popup__container popup__container_image">
        <img
          className="popup__image"
          src={card ? card.link : '#'}
          alt={card ? card.name : 'Без названия'} />
        <p className="popup__location">{card ? card.name : 'Без названия'}</p>
        <button
          className="button popup__close"
          type="button"
          aria-label="Закрыть модальное окно"
          onClick={onClose}
        ></button>
      </div>
    </div>
  )
}

export default ImagePopup;