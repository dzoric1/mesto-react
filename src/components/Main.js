import { useContext } from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddCard, onAvatarEdit, onCardClick, onCardLike, cards }) {

  const { name, about, avatar } = useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="content__profile profile">
        <div className="profile__avatar-wrapper" onClick={onAvatarEdit}>
          <img className="profile__avatar" src={avatar} alt="Аватар" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="Редактирование профиля"
            onClick={onEditProfile}
          ></button>
          <p className="profile__work">{about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить карточку"
          onClick={onAddCard}
        ></button>
      </section>
      <section className="content__gallery gallery">
        <ul className="gallery__cards">
          {cards.map(card => (
            <Card
              key={card._id}
              card={card}
              onCardClick={() => onCardClick(card)}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main;