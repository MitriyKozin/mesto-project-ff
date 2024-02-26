

import './pages/index.css';
import { initialCards } from './components/cards.js';
import { openPopup, closePopup } from './components/modal.js';
import { createCard, deleteCardCallback, handleLikeClick } from './components/card.js';

const placesList = document.querySelector('.places__list');
initialCards.forEach(function (cardData) {
  const cardElement = createCard(cardData,deleteCardCallback,handleLikeClick,handleImageClick);

  placesList.appendChild(cardElement);
});

//✴️Получаем окно и его элеметы
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
editButton.addEventListener('click', function () {
  const nameInput = editPopup.querySelector('.popup__input_type_name');
  const jobInput = editPopup.querySelector('.popup__input_type_description');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesc.textContent;
  openPopup(editPopup);
});
//✴️ Получаем кнопку закрытия модального окна внутри окна редактирования профиля
const popupClose = editPopup.querySelector('.popup__close');
popupClose.addEventListener('click', function () {
  closePopup(editPopup);
});
//✴️Редактирование имени и информации о себе
const profileForm = document.querySelector('.popup__form');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');
// ✴️ Обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  //✴️ Получите значение полей jobInput и nameInput из свойства value
  const newName = nameInput.value;
  const newJob = jobInput.value;
  profileTitle.textContent = newName;
  profileDesc.textContent = newJob;
  closePopup(editPopup);
}
// ✴️ Прикрепляем обработчик к форме:
profileForm.addEventListener('submit', handleProfileFormSubmit);

const addButton = document.querySelector('.profile__add-button');
const NewCardPopup = document.querySelector('.popup_type_new-card');
addButton.addEventListener('click', function () {
  openPopup(NewCardPopup);
});
const newCardPopupClose = NewCardPopup.querySelector('.popup__close');
newCardPopupClose.addEventListener('click', function () {
  closePopup(NewCardPopup);
});

const newCardForm = document.forms['new-place'];
newCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const linkValue = newCardForm.elements.link.value;
  const titleValue = newCardForm.elements['place-name'].value;
  const newCard = createCard({ name: titleValue, link: linkValue },
    // deleteCard,handleLikeClick,handleImageClick);
    deleteCardCallback,handleLikeClick,handleImageClick);

    placesList.prepend(newCard);
    newCardForm.reset();
  closePopup(NewCardPopup);
});

// ✴️ Обработчик клика по изображению карточки
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
imageCloseButton.addEventListener('click', () => closePopup(document.querySelector('.popup_type_image')));
