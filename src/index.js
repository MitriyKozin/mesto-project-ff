import './pages/index.css';
import { openPopup, closePopup } from './components/modal.js';
import { createCard, deleteCardCallback,  handleLikeClick } from './components/card.js';
import { getUserData, getInitialCards, editUserProfile, addCard, updateUserAvatar } from './components/API.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { validationConfig } from './components/validation-config.js';

let userId;

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
    setButtonMessage(editSaveButton, 'Сохранение...');
  editUserProfile(nameInput.value, jobInput.value)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDesc.textContent = userData.about;
      closePopup(editPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setButtonMessage(editSaveButton, 'Сохранить');
    });
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
      if (!userId) {
        throw new Error('UserID не доступен');
      }
      const newCard = createCard(cardData, userId, deleteCardCallback, handleLikeClick, handleImageClick);
      placesList.prepend(newCard);
      newCardForm.reset();
      closePopup(newCardPopup);
    })
    .catch((err) => {
      console.error(err);
    })
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

window.addEventListener('DOMContentLoaded', function () {
  Promise.all([getInitialCards(), getUserData()])
    .then(([cards, user]) => {
      userId = user._id;
      console.log(cards, user);
      const profileImage = document.querySelector('.profile__image');
      profileImage.style.backgroundImage = `url(${user.avatar})`;
      profileTitle.textContent = user.name;
      profileDesc.textContent = user.about;
      cards.forEach((cardData) => {
        const cardElement = createCard(cardData, userId, deleteCardCallback, handleLikeClick, handleImageClick);
        placesList.appendChild(cardElement);
      });
    })
  .catch((err) => console.log(err));
});
