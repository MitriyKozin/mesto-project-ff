import './pages/index.css';
import { initialCards } from './components/cards.js';
import { openPopup, closePopup } from './components/modal.js';
import { createCard } from './components/card.js';
const placesList = document.querySelector('.places__list');
initialCards.forEach(function (cardData) {
  const cardElement = createCard(cardData,deleteCard,handleLikeClick,handleImageClick);
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
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
// ✴️ Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  //✴️ Получите значение полей jobInput и nameInput из свойства value
  const newName = nameInput.value;
  const newJob = jobInput.value;
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  profileTitle.textContent = newName;
  profileDescription.textContent = newJob;
  closePopup(editPopup);
}
// ✴️ Прикрепляем обработчик к форме:
formElement.addEventListener('submit', handleFormSubmit);

const addButton = document.querySelector('.profile__add-button');
const NewCardPopup = document.querySelector('.popup_type_new-card');
addButton.addEventListener('click', function () {
  openPopup(NewCardPopup);
});
const popupNewCardClose = NewCardPopup.querySelector('.popup__close');
popupNewCardClose.addEventListener('click', function () {
  closePopup(NewCardPopup);
});

const form = document.forms['new-place'];
form.addEventListener('submit', addNewCard);
function addNewCard(evt) {
  evt.preventDefault();
  const linkValue = form.elements.link.value;
  const titleValue = form.elements['place-name'].value;
  addCard(linkValue, titleValue);
  form.reset();
  closePopup(NewCardPopup);
}
function addCard(linkValue, titleValue) {
  const newCard = createCard(
    { name: titleValue, link: linkValue },
    deleteCard,
    handleLikeClick,
    handleImageClick
  );

  placesList.prepend(newCard);
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function handleLikeClick(event) {
  const likeButton = event.target;
  likeButton.classList.toggle('card__like-button_is-active');
}

function handleImageClick(evt) {
  const clicedImage = evt.target;
  const popup = document.querySelector('.popup_type_image');
  const popupImage = popup.querySelector('.popup__image');
  const popupCaption = popup.querySelector('.popup__caption');
  const imageCloseButton = popup.querySelector('.popup__close');
  imageCloseButton.addEventListener('click', () => {
    closePopup(popup);
  });

  
  popupImage.src = clicedImage.src;
  popupImage.alt = clicedImage.alt;
  popupCaption.textContent = clicedImage.alt;
  openPopup(popup);
};



