import loadingAvatar from '../assets/images/loading.svg'

function Main() {
  return (
    <main className="content">
      <section className="content__profile profile">
        <div className="profile__avatar-wrapper">
          <img className="profile__avatar" src={loadingAvatar} alt="Аватар" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">Загрузка...</h1>
          <button className="profile__edit-button" type="button" aria-label="Редактирование профиля"></button>
          <p className="profile__work"></p>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить карточку"></button>
      </section>
      <section className="content__gallery gallery">
        <ul className="gallery__cards"></ul>
      </section>
    </main>
  )
}

export default Main;