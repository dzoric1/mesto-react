import { useState, useEffect } from 'react';
import api from '../utils/Api';
import Card from './Card';

import loadingAvatar from '../assets/images/loading.svg'

function Main({ onEditProfile, onAddCard, onAvatarEdit, onCardClick }) {

  const [userName, setUserName] = useState('Загрузка...')
  const [userDescription, setUserDescription] = useState('...')
  const [userAvatar, setUserAvatar] = useState(loadingAvatar)
  const [cards, setCards] = useState([])

  useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getCards()
    ])
      .then(([userData, cardsData]) => {
        setUserName(userData.name)
        setUserDescription(userData.about)
        setUserAvatar(userData.avatar)
        setCards(cardsData)
      })
      .catch(err => console.warn(err))
  }, [])


  return (
    <main className="content">
      <section className="content__profile profile">
        <div className="profile__avatar-wrapper" onClick={onAvatarEdit}>
          <img className="profile__avatar" src={userAvatar} alt="Аватар" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="Редактирование профиля"
            onClick={onEditProfile}
          ></button>
          <p className="profile__work">{userDescription}</p>
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
            <Card key={card._id} card={card} onCardClick={() => onCardClick(card)} />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main;