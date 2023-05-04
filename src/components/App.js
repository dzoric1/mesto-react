import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function App() {
  return (
    <>
      <div className="page">
        <Header />
        <Main />
        <Footer />

        <div className="popup popup_type_edit">
          <div className="popup__container">
            <button className="popup__close" type="button" aria-label="Закрыть попап"></button>
            <h2 className="popup__title">Редактировать профиль</h2>
            <form className="popup__form popup__form_type_edit" name="form-edit" noValidate>
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
              <button className="popup__submit" type="submit">Сохранить</button>
            </form>
          </div>
        </div>

        <div className="popup popup_type_add">
          <div className="popup__container">
            <button className="popup__close" type="button" aria-label="Закрыть попап"></button>
            <h2 className="popup__title">Новое место</h2>
            <form className="popup__form popup__form_type_add" name="form-add" noValidate>
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
              <button className="popup__submit popup__submit_type_disabled" type="submit" disabled>Создать</button>
            </form>
          </div>
        </div>

        <div className="popup popup_type_image popup_darker">
          <div className="popup__container popup__container_image">
            <img className="popup__image" src="#" alt="#" />
            <p className="popup__location"></p>
            <button className="button popup__close" type="button" aria-label="Закрыть модальное окно"></button>
          </div>
        </div>

        <div className="popup popup_type_confirm">
          <div className="popup__container">
            <button className="popup__close" type="button" aria-label="Закрыть попап"></button>
            <h2 className="popup__title">Вы уверены?</h2>
            <form className="popup__form popup__form_type_submit" name="form-submit" noValidate>
              <button className="popup__submit" type="submit">Да</button>
            </form>
          </div>
        </div>

        <div className="popup popup_type_avatar">
          <div className="popup__container">
            <button className="popup__close" type="button" aria-label="Закрыть попап"></button>
            <h2 className="popup__title">Обновить аватар</h2>
            <form className="popup__form popup__form_type_avatar" name="form-avatar" noValidate>
              <label className="popup__fieldset">
                <input className="popup__form-input popup__form-input_type_avatar" type="url" placeholder="Ссылка на аватар"
                  name="avatar" required />
                <span className="popup__input-error avatar-error"></span>
              </label>
              <button className="popup__submit" type="submit">Сохранить</button>
            </form>
          </div>
        </div>

      </div>

      <template id="card-template">
        <li className="gallery__card card">
          <img className="card__image" src="#" alt="#" />
          <div className="card__heading">
            <h2 className="card__title"></h2>
            <div className="card__like-field">
              <button className="card__like" type="button" aria-label="Лайк"></button>
              <span className="card__like-count"></span>
            </div>
          </div>
          <button className="card__delete" type="button" aria-label="Удалить"></button>
        </li>
      </template>
    </>
  );
}

export default App;
