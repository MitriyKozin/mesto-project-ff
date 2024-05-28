import './pages/index.css';
import { openPopup, closePopup } from './components/modal.js';
import { createCard, deleteCardCallback, handleLikeClick } from './components/card.js';
import { getUserData, getInitialCards, editUserProfile, addCard, updateUserAvatar } from './components/API.js';
import { enableValidation, clearValidation } from './components/validation.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Включение валидации
enableValidation(validationConfig);

const placesList = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const editSaveButton = editPopup.querySelector('.popup__button');
editButton.addEventListener('click', function () {
  const nameInput = editPopup.querySelector('.popup__input_type_name');
  const jobInput = editPopup.querySelector('.popup__input_type_description');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesc.textContent;
  clearValidation(profileForm, validationConfig);
  openPopup(editPopup);
});
//✴️ Получаем кнопку закрытия модального окна внутри окна редактирования профиля
const editPopupClose = editPopup.querySelector('.popup__close');
editPopupClose.addEventListener('click', function () {
  closePopup(editPopup);
});
//✴️Редактирование имени и информации о себе
const profileForm = editPopup.querySelector('.popup__form');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newJob = jobInput.value;

  // Вызов функции editUserProfile для обновления профиля на сервере
  editUserProfile(newName, newJob)
    .then((userData) => {
      // Обновление профиля пользователя на странице
      profileTitle.textContent = userData.name;
      profileDesc.textContent = userData.about;
      closePopup(editPopup);
    })
    .catch((err) => console.log(err));
}
// ✴️ Прикрепляем обработчик к форме:
profileForm.addEventListener('submit', handleProfileFormSubmit);

// Получаем кнопку открытия попапа изменения аватара
const editAvatar = document.querySelector('.profile__avatar-edit');
const avatarPopup = document.querySelector('.popup_type_avatar');
const inputAvatar = avatarPopup.querySelector('.popup__input_type_avatar-link');
const saveAvatarButton = avatarPopup.querySelector('.popup__button');
const closeAvatarButton = avatarPopup.querySelector('.popup__close');

editAvatar.addEventListener('click', () => {
  clearValidation(avatarForm, validationConfig);
  openPopup(avatarPopup);
});

closeAvatarButton.addEventListener('click', () => {
  closePopup(avatarPopup);
});

function setButtonMessage(button, message) {
  button.textContent = message;
}

const avatarForm = avatarPopup.querySelector('.popup__form');
avatarForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const avatarLink = avatarForm.elements.link.value;
  setButtonMessage(saveAvatarButton, 'Сохранение...');
  updateUserAvatar(avatarLink)
    .then((userData) => {
      const profileImage = document.querySelector('.profile__image');
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      avatarForm.reset();
      closePopup(avatarPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setButtonMessage(saveAvatarButton, 'Сохранить');
    });
});

profileForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  setButtonMessage(editSaveButton, 'Сохранение...');
  editUserProfile(profileTitle, profileDesc)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDesc.textContent = userData.about;
      closePopup(editPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setButtonMessage(editSaveButton, 'Сохранить');
    });
});

const addButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardSaveButton = newCardPopup.querySelector('.popup__button')
addButton.addEventListener('click', function () {
  clearValidation(newCardForm, validationConfig);
  openPopup(newCardPopup);
});
const newCardPopupClose = newCardPopup.querySelector('.popup__close');
newCardPopupClose.addEventListener('click', function () {
  closePopup(newCardPopup);
});

const newCardForm = newCardPopup.querySelector('.popup__form');

newCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const linkValue = newCardForm.elements.link.value;
  const titleValue = newCardForm.elements['place-name'].value;

  setButtonMessage(newCardSaveButton, 'Сохранение...');

  addCard(titleValue, linkValue)
    .then((cardData) => {
      const newCard = createCard(cardData, deleteCardCallback, handleLikeClick, handleImageClick);
      placesList.prepend(newCard);
      newCardForm.reset();
      closePopup(newCardPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setButtonMessage(newCardSaveButton, 'Сохранить');
    });
});

function handleImageClick(name, link) {
  const popup = document.querySelector('.popup_type_image');
  const popupImage = popup.querySelector('.popup__image');
  const popupCaption = popup.querySelector('.popup__caption');

  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openPopup(popup);
}

// ✴️ Обработчик закрытия просмотра картинки
const imageCloseButton = document.querySelector('.popup_type_image .popup__close');
imageCloseButton.addEventListener('click', () =>
  closePopup(document.querySelector('.popup_type_image'))
);

editButton.addEventListener('click', () => {
  openPopup(editPopup);
  profileForm.reset();
  clearValidation(profileForm, validationConfig);
});

addButton.addEventListener('click', () => {
  openPopup(newCardPopup);
  newCardForm.reset();
  clearValidation(newCardForm, validationConfig);
});

editPopupClose.addEventListener('click', () => {
  closePopup(editPopup);
  closePopup(newCardPopup);
  clearValidation(profileForm, validationConfig);
});

editAvatar.addEventListener('click', () => {
  openPopup(avatarPopup);
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
})


const token = '37a3c59e-17a1-445c-bd60-3082d57222e3';

window.addEventListener('DOMContentLoaded', function () {
  Promise.all([getInitialCards(token), getUserData(token)]).then(
    ([cards, user]) => {
      console.log(cards, user);
      const profileImage = document.querySelector('.profile__image');
      profileImage.style.backgroundImage = `url(${user.avatar})`;
      profileTitle.textContent = user.name;
      profileDesc.textContent = user.about;

      cards.forEach(function (cardData) {
        const cardElement = createCard(
          cardData,
          user._id,
          () => deleteCardCallback(cardElement, cardData._id),
          handleLikeClick,
          handleImageClick
        );
        placesList.appendChild(cardElement);
        // Привязываем обработчики к каждой карточке
        cardElement
          .querySelector('.card__like-button')
          .addEventListener('click', function (event) {
            handleLikeClick(event);
          });
        cardElement
          .querySelector('.card__image')
          .addEventListener('click', function () {
            handleImageClick(cardData.name, cardData.link);
          });
      });
    }
  )
  .catch((err) => console.log(err));
});
