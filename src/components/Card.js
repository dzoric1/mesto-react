import notFound from '../assets/images/not-found.jpg'

function Card({ card, onCardClick }) {

  return (
    <li className="gallery__card card">
      <img
        className="card__image"
        src={card.link ? card.link : notFound}
        alt={card.name ? card.name : 'Без названия'}
        onClick={onCardClick}
      />
      <div className="card__heading">
        <h2 className="card__title">{card ? card.name : 'Без названия'}</h2>
        <div className="card__like-field">
          <button className="card__like" type="button" aria-label="Лайк"></button>
          <span className="card__like-count">{card ? card.likes.length : 0}</span>
        </div>
      </div>
      <button className="card__delete" type="button" aria-label="Удалить"></button>
    </li>
  )
}

export default Card;