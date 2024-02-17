// import { createCard, handleLikeClick, deleteCard, initialCards } from './card.js'; 


const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export { initialCards };






//✴️✴️✴️✴️  ✴️✴️✴️✴️  ✴️✴️✴️✴️index.js

// import './pages/index.css'; // добавьте импорт главного файла стилей
// import { instalCards } from './components/card.js';
// import { createCard, handleLikeClick, clickImageCallback, deleteCard } from './components/card.js';
// import { openPopup, closePopup, closePopupByOverlay } from './components/modal.js';

// //✴️Получаем окно и его элеметы
// const profileTitle = document.querySelector('.profile__title');
// const profileDesc = document.querySelector('.profile__description');
// const editButton = document.querySelector('.profile__edit-button');
// const editPopup = document.querySelector('.popup_type_edit');
// editButton.addEventListener('click', function () {
//   const nameInput = editPopup.querySelector('.popup__input_type_name');
//   const jobInput = editPopup.querySelector('.popup__input_type_description');
//   nameInput.value = profileTitle.textContent;
//   jobInput.value = profileDesc.textContent;
//   openPopup(editPopup);
// });

// //✴️ Получаем кнопку закрытия модального окна внутри окна редактирования профиля
// const popupClose = editPopup.querySelector('.popup__close'); 
// popupClose.addEventListener('click', function () { 
//   closePopup(editPopup); 
// }); 


// //✴️Редактирование имени и информации о себе
// const formElement = document.querySelector('.popup__form'); 
// const nameInput = formElement.querySelector('.popup__input_type_name'); 
// const jobInput = formElement.querySelector('.popup__input_type_description'); 

// // ✴️ Обработчик «отправки» формы, хотя пока
// function handleFormSubmit(evt) {
//   evt.preventDefault();
//   //✴️ Получите значение полей jobInput и nameInput из свойства value
//   const newName = nameInput.value; 
//   const newJob = jobInput.value; 
//   const profileTitle = document.querySelector('.profile__title'); 
//   const profileDescription = document.querySelector('.profile__description'); 
//   profileTitle.textContent = newName; 
//   profileDescription.textContent = newJob; 
//   closePopup(editPopup);
// }
// // ✴️ Прикрепляем обработчик к форме:
// formElement.addEventListener('submit', handleFormSubmit); 

// const addButton = document.querySelector('.profile__add-button'); 
// const NewCardPopup = document.querySelector('.popup_type_new-card'); 
// addButton.addEventListener('click', function () {
//   openPopup(NewCardPopup); 
// }); 

// // ✴️Получаем кнопку закрытия модального окна внутри окна добавления нового места 
// const popupNewCardClose = NewCardPopup.querySelector('.popup__close'); 
// popupNewCardClose.addEventListener('click', function () {
//   closePopup(NewCardPopup); 
// }); 

// //✴️ Форма добавления карточки. 
// const cardsContainer = document.querySelector('.places__list'); 
// const form = document.forms['new-place']; 
// form.addEventListener('submit', function (evt) {  
//   evt.preventDefault(); 
//   const linkValue = form.elements.link.value;  const titleValue = form.elements['place-name'].value; 
//   addCard(linkValue, titleValue);  form.reset();
// });
//   //✴️ Добавляем слушатели событий на кнопки новых карочек "удалить"
//   const deleteButtons = document.querySelectorAll('.card__delete-button');
//   deleteButtons.forEach((button) => {
//     button.addEventListener('click', function (evt) {
//       const card = evt.target.closest('.card');
//       card.remove();
//     });
//   });

// //✴️ Функция addCard принимает значения linkValue и titleValue в качестве параметров
// function addCard(linkValue, titleValue) {
//   const cardTemplate = document.querySelector('#card-template').content;
//   const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
//   cardElement.querySelector('.card__image').src = linkValue;
//   cardElement.querySelector('.card__title').textContent = titleValue;

//   const likeCard = cardElement.querySelector('.card__like-button');
//   likeCard.addEventListener('click', handleLikeClick);

//   //✴️ Находим изображение в карточке и добавляем ему обработчик события click
//   const cardImage = cardElement.querySelector('.card__image');
//   cardImage.addEventListener('click', () => {
//     const popup = document.querySelector('.popup_type_image');
//     const ImageInPopup = popup.querySelector('.popup__image');
//     const popupCaption = popup.querySelector('.popup__caption');
//     const closePopupCardImage = popup.querySelector('.popup__close');
//     ImageInPopup.src = linkValue;
//     ImageInPopup.alt = titleValue;
//     popupCaption.textContent = titleValue;
//     popup.classList.add('popup_is-opened');

//     closePopupCardImage.addEventListener('click', function () {
//       closePopup(popup);
//     });
//   });

//   //✴️Клонированный элемент добавляется в начало контейнера cardsContainer
//   cardsContainer.insertBefore(cardElement, cardsContainer.firstElementChild);
//   closePopup(NewCardPopup);
// }

// const openImagePopup = document
//   .querySelectorAll('.card__image')
//   .forEach((item) => {
//     item.addEventListener('click', () => {
//       const popup = document.querySelector('.popup_type_image');
//       const popupImage = popup.querySelector('.popup__image');
//       const popupCaption = popup.querySelector('.popup__caption');
//       const imageCloseButton = popup.addEventListener('click', () => {
//         closePopup(popup);
//       });
//       popupImage.src = item.src;
//       popupImage.alt = item.alt;
//       popupCaption.textContent = item.alt;
//       popup.classList.add('popup_is-opened');
//     });
//   });



//✴️✴️✴️✴️  ✴️✴️✴️✴️  ✴️✴️✴️✴️card.js
// const cardTemplate = document
//   .querySelector('#card-template')
//   .content.querySelector('.card');
// const cardElement = cardTemplate.cloneNode(true);

// // @todo: Функция создания карточки✴️
// function createCard(
//   cardData,
//   deleteCardCallback,
//   handleLikeClick,
//   clickImageCallback
// ) {
//   const likeCard = cardElement.querySelector('.card__like-button');
//   likeCard.addEventListener(
//     'click',
//     (handleLikeClick = function () {
//       likeCard.classList.toggle('card__like-button_is-active');
//     })
//   );

//   // @todo: DOM узлы✴️
//   const cardImage = cardElement.querySelector('.card__image');
//   const cardTitle = cardElement.querySelector('.card__title');
//   const deleteButton = cardElement.querySelector('.card__delete-button');
//   cardTitle.textContent = cardData.name;
//   cardImage.alt = cardData.name;
//   cardImage.src = cardData.link;
//   function deleteCardCallback(cardElement) {
//     deleteButton.addEventListener('click', function () {
//       deleteCardCallback(cardElement);
//     });
//   }
//   return cardElement;
// }

// //✴️ Функция добавления лайка
// function handleLikeClick(event) {
//   event.target.classList.toggle('card__like-button_is-active');
// }

// //@todo: Функция удаления карточки✴️
// function deleteCard(cardElement) {
//   cardElement.remove();
// }

// //✴️ Находим изображение в карточке и добавляем ему обработчик события click
// // const cardImage = cardElement.querySelector('.card__image');
// // cardImage.addEventListener('click', () => {
// function clickImageCallback(linkValue, titleValue) {
//   const popup = document.querySelector('.popup_type_image');
//   const ImageInPopup = popup.querySelector('.popup__image');
//   const popupCaption = popup.querySelector('.popup__caption');
//   const closePopupCardImage = popup.querySelector('.popup__close');

//   ImageInPopup.src = linkValue;
//   ImageInPopup.alt = titleValue;
//   popupCaption.textContent = titleValue;
//   popup.classList.add('popup_is-opened');

//   closePopupCardImage.addEventListener('click', () => {
//     closePopup(popup);
//   });
//   // });
//   const cardImage = cardElement.querySelector('.card__image');
//   cardImage.addEventListener('click', () => {
//     clickImageCallback(linkValue, titleValue);
//   });

// //   cardsContainer.prepend(cardElement, cardsContainer.firstElementChild);
// //   closePopup(NewCardPopup);
// }

// export { createCard, handleLikeClick, clickImageCallback, deleteCard };




//✴️✴️✴️✴️  ✴️✴️✴️✴️  ✴️✴️✴️✴️modal.js
// //✴️ Добавляем слушателя событий на документ который будет отслеживать нажатие клавиш на клавиатуре
// document.addEventListener('keydown', closePopupByEscape);

// function openPopup(popup) {
//   //✴️ Функция открытия попапа
//   popup.classList.add('popup_is-opened');
//   popup.classList.add('popup_is-animated');
//   // document.addEventListener('click', overlayClick);
//   document.addEventListener('click', closePopupByEscape); 

// }

// function closePopup(popup) {
//   //✴️ Функция закрытия попапа
//   popup.classList.remove('popup_is-opened');
//   popup.classList.remove('popup_is-animated');
//   // document.removeEventListener('click', overlayClick);
//   document.removeEventListener('click', closePopupByEscape); 

// }

// function closePopupByOverlay(evt) {
//   //✴️  Функция закрытия попапа кликом на оверлей
//   if (evt.target === evt.currentTarget) {
//     const popup = evt.target;
//     closePopup(popup);
//   }
// }

// function closePopupByEscape(evt) {
//   //✴️ Функция закрытия попапа нажатием на Esc
//   if (evt.key === 'Escape') {
//     //27
//     const openedPopup = document.querySelector('.popup_is-opened');
//     if (openedPopup) {
//       closePopup(openedPopup);
//     }
//   }
// }

// export { openPopup, closePopup, closePopupByOverlay };