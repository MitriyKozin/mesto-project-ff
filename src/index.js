// import './pages/index.css'; 
// import { initialCards } from './components/cards.js'
// import { openPopup, closePopup } from './components/modal.js'
// import { createCard } from './components/card.js';

// const placesList = document.querySelector('.places__list'); 

// initialCards.forEach(function (cardData) { 
//   const cardElement = createCard(cardData, deleteCard, handleLikeClick, handleImageClick); 
//   placesList.appendChild(cardElement);
// });

// const addButton = document.querySelector('.profile__add-button'); 
// const NewCardPopup = document.querySelector('.popup_type_new-card');

// addButton.addEventListener('click', function () {
//   openPopup(NewCardPopup);
// });

// const popupNewCardClose = NewCardPopup.querySelector('.popup__close');
// popupNewCardClose.addEventListener('click', function () {
//   closePopup(NewCardPopup);
// });

// const form = document.forms['new-place'];
// form.addEventListener('submit', function (evt) {
//   evt.preventDefault();
//   const linkValue = form.elements.link.value;
//   const titleValue = form.elements['place-name'].value;
//   addCard(linkValue, titleValue);
//   form.reset();
//   closePopup(NewCardPopup);
// });

// function addCard(linkValue, titleValue) {
//   const newCard = createCard({ name: titleValue, link: linkValue }, deleteCard, handleLikeClick, handleImageClick);
//   placesList.prepend(newCard);
// }

// function deleteCard(cardElement) {
//   cardElement.remove();
// }

// function handleLikeClick() {
//   this.classList.toggle('card__like-button_is-active');
// }

// function handleImageClick() {
//   const popup = document.querySelector('.popup_type_image'); 
//   const popupImage = popup.querySelector('.popup__image'); 
//   const popupCaption = popup.querySelector('.popup__caption'); 
//   const imageCloseButton = popup.querySelector('.popup__close');
  
//   imageCloseButton.addEventListener('click', () => {   
//     closePopup(popup);
//   }); 
  
//   popupImage.src = this.src; 
//   popupImage.alt = this.alt; 
//   popupCaption.textContent = this.alt; 
//   popup.classList.add('popup_is-opened');
// }



































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
  // imageCloseButton.addEventListener('click', () => {
  //   closePopup(popup);
  //   imageCloseButton.removeEventListener('click', () => {
  //     closePopup(popup);
  //   });
  // });
  imageCloseButton.addEventListener('click', () => {
    closePopup(popup);
  });

  
  popupImage.src = clicedImage.src;
  popupImage.alt = clicedImage.alt;
  popupCaption.textContent = clicedImage.alt;
  // popup.classList.add('popup_is-opened');
  openPopup(popup);
};



// document.addEventListener('click', function () { 
//    document.querySelector('.popup_type_edit').classList.add('popup_is-animated'); 
//   }); 

// document.querySelector('.profile__edit-button').addEventListener('click', function () { 
//     document.querySelector('.popup_type_edit').classList.add('popup_is-animated'); 
//   }); 

// document.querySelector('.profile__add-button').addEventListener('click', function () { 
//     document.querySelector('.popup_type_new-card').classList.add('popup_is-animated'); 
//   }); 

// document.querySelector('.card__image').addEventListener('click', function () { 
//   document.querySelector('.popup_type_image').classList.add('popup_is-animated'); 
// });  
 
// document.querySelectorAll('.popup').forEach(popup => { 
//   popup.addEventListener('click', function (event) { 
//     if (event.target.classList.contains('popup')) { 
//       popup.classList.remove('popup_is-opened'); 
//     } 
//   }); 
//   }); 
 
// document.querySelectorAll('.popup__close').forEach(closeBtn => { 
// closeBtn.addEventListener('click', function (event) { 
//   event.target.closest('.popup').classList.remove('popup_is-opened'); 
// }); 
// });



















// document.querySelectorAll('.popup__close').forEach(closeBtn => {
//   closeBtn.addEventListener('click', function (event) {
//     event.target.closest('.popup').classList.remove('popup_is-opened');
//   });
// });

// import './pages/index.css';
// import { initialCards } from './components/cards.js'
// import { openPopup, closePopup } from './components/modal.js'
// import { createCard } from './components/card.js';

// // @todo: Вывести карточки на страницу✴️
// const placesList = document.querySelector('.places__list');
// initialCards.forEach(function (cardData) {
//   // const cardElement = createCard(cardData); //OLD CODE
//   const cardElement = createCard(cardData, deleteCard, handleLikeClick, handleImageClick);
//   placesList.appendChild(cardElement);
// });

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

// // ✴️ Обработчик «отправки» формы
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

// // ✴️ Функция addCard принимает значения linkValue и titleValue в качестве параметров
// const form = document.forms['new-place'];
// form.addEventListener('submit', function (evt) {
//     evt.preventDefault();
//     const linkValue = form.elements.link.value;
//     const titleValue = form.elements['place-name'].value;
//     addCard(linkValue, titleValue);
//     form.reset();
//     closePopup(NewCardPopup)
// });

// function addCard(linkValue, titleValue) {
//     // const newCard = createCard( titleValue, linkValue );//OLD CODE
//     const newCard = createCard({ name: titleValue, link: linkValue }, deleteCard, handleLikeClick, handleImageClick);
//     placesList.prepend(newCard);
// }

// function deleteCard(cardElement) {
//   cardElement.remove();
// }

// // function handleLikeClick() {
// //   this.classList.toggle('card__like-button_is-active');
// // }

// function handleLikeClick(event) {
//   const likeButton = event.target;
//   likeButton.classList.toggle('card__like-button_is-active');
// }

// //     newCard.querySelector('.card__image').src = linkValue; //OLD CODE
// //     newCard.querySelector('.card__title').textContent = titleValue; //OLD CODE
// // const addButton = document.querySelector('.profile__add-button');//OLD CODE

// // const NewCardPopup = document.querySelector('.popup_type_new-card');//OLD CODE
// // addButton.addEventListener('click', function () {//OLD CODE
// //     openPopup(NewCardPopup);//OLD CODE
// // });//OLD CODE

// // const popupNewCardClose = NewCardPopup.querySelector('.popup__close');//OLD CODE
// // popupNewCardClose.addEventListener('click', function () {//OLD CODE
// //     closePopup(NewCardPopup);//OLD CODE
// // });//OLD CODE
// // };//OLD CODE

// // ✴️ Для всех эл. с классом "card__image" выполняется функция.
// // const openImagePopup = document.querySelectorAll('.card__image')//OLD CODE
// // .forEach((item) => {   //OLD CODE              //============== ⚠️583/127
//     // item.addEventListener('click', () => { //OLD CODE
//       function handleImageClick() {
//       const popup = document.querySelector('.popup_type_image');
//       const popupImage = popup.querySelector('.popup__image');
//       const popupCaption = popup.querySelector('.popup__caption');
//       const imageCloseButton = popup.querySelector('.popup__close');
//       imageCloseButton = popup.addEventListener('click', () => {
//         closePopup(popup);
//       });
//       popupImage.src = item.src;
//       popupImage.alt = item.alt;
//       popupCaption.textContent = item.alt;
//       popup.classList.add('popup_is-opened');
//       };

//       item.addEventListener('click', () => {
//         handleImageClick(item);
//       });

// }); //OLD CODE
// }); //OLD CODE

//✅================ ⚠️614

//✅============ ⚠️617-641

//LAST MODIFIT 'index.js' HERE!!!

// import './pages/index.css';
// import { initialCards } from './components/cards.js'
// import { openPopup, closePopup } from './components/modal.js'
// import { createCard } from './components/card.js';

// // @todo: Вывести карточки на страницу✴️
// const placesList = document.querySelector('.places__list');
// initialCards.forEach(function (cardData) {
//   const cardElement = createCard(cardData); //, deleteCard
//   placesList.appendChild(cardElement);
// });

// //✴️Получаем окно и его элеметы
// const profileTitle = document.querySelector('.profile__title');
// const profileDesc = document.querySelector('.profile__description');
// const editButton = document.querySelector('.profile__edit-button');
// const editPopup = document.querySelector('.popup_type_edit'); //✅= ⚠️413/19
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

// // ✴️ Обработчик «отправки» формы
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
// form.addEventListener('submit', function (evt) {  //================ ⚠️511/67
//   evt.preventDefault();
//   const linkValue = form.elements.link.value;
//   const titleValue = form.elements['place-name'].value;
//   addCard(linkValue, titleValue);
//   //✴️Форма сбрасывается после отправки
//   form.reset();

//   //✴️ Добавляем слушателя событий на документ который будет отслеживать нажатие клавиш на клавиатуре
// // Когда происходит событие 'keydown', (нажатие клавиши) сработает функция losingOnEsc
// // document.addEventListener('keydown', closingOnEsc); //✅======== ⚠️459/78

//   //✴️ Добавляем слушатели событий на кнопки новых карочек "удалить"
//   const deleteButtons = document.querySelectorAll('.card__delete-button');
//   deleteButtons.forEach((button) => { //========================= ⚠️526/82
//     button.addEventListener('click', function (evt) {
//       const card = evt.target.closest('.card');// **УДАЛЕНИЕ*НОВЫХ*КАРТОЧЕК**
//       card.remove();
//     });
//   });
// });

// // ✴️ Функция addCard принимает значения linkValue и titleValue в качестве параметров
// function addCard(linkValue, titleValue) {         //================ ⚠️537/91
//   const cardTemplate = document.querySelector('#card-template').content;
//   const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
//   cardElement.querySelector('.card__image').src = linkValue;
//   cardElement.querySelector('.card__title').textContent = titleValue;

//   // ✴️ Добавляем слушатели событий на кнопки новых карточек 'Like'
//   const likeCard = cardElement.querySelector('.card__like-button');
//   likeCard.addEventListener('click', function () {
//     likeCard.classList.toggle('card__like-button_is-active');
//   });

//   // ✴️ Находим изображение в карточке и добавляем ему обработчик события click
//   const cardImage = cardElement.querySelector('.card__image');
//   cardImage.addEventListener('click', () => {     //=============== ⚠️559/105
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
//   cardsContainer.prepend(cardElement, cardsContainer.firstElementChild);
//   closePopup(NewCardPopup);                       //✅============= ⚠️576/121
// }

// // ✴️ Для всех эл. с классом "card__image" выполняется функция.
// const openImagePopup = document
//    .querySelectorAll('.card__image')
//    .forEach((item) => {                            //============== ⚠️583/127
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

  //                                              //✅================ ⚠️614

 //                                               //✅============ ⚠️617-641

// import './pages/index.css';
// import { initialCards } from './components/cards.js'
// import { openPopup, closePopup } from './components/modal.js'
// import { createCard } from './components/card.js';
// //СТАРЫЙ КОД 7-12
// // @todo: Вывести карточки на страницу✴️
// const placesList = document.querySelector('.places__list');
// initialCards.forEach(function (cardData) {
//   const cardElement = createCard(cardData); // cardData, deleteCard, handleLikeClick, openImagePopup
//   placesList.appendChild(cardElement);
// });

// //✴️Получаем окно и его элеметы
// const profileTitle = document.querySelector('.profile__title');
// const profileDesc = document.querySelector('.profile__description');
// const editButton = document.querySelector('.profile__edit-button');
// const editPopup = document.querySelector('.popup_type_edit'); //✅= ⚠️413/19
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

// // ✴️ Обработчик «отправки» формы
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
// // СТАРЫЙ КОД 64-117
// // //✴️ Форма добавления карточки.
// // const cardsContainer = document.querySelector('.places__list');
// // const form = document.forms['new-place'];
// // form.addEventListener('submit', function (evt) {  //================ ⚠️511/67
// //   evt.preventDefault();
// //   const linkValue = form.elements.link.value;
// //   const titleValue = form.elements['place-name'].value;
// //   addCard(linkValue, titleValue);
// //   //✴️Форма сбрасывается после отправки
// //   form.reset();

// //   // // ✴️ Добавляем слушатели событий на кнопки новых карочек "удалить"
// //   // const deleteButtons = document.querySelectorAll('.card__delete-button');
// //   // deleteButtons.forEach((button) => { //========================= ⚠️526/82
// //   //   button.addEventListener('click', function (evt) {
// //   //     const card = evt.target.closest('.card');// **УДАЛЕНИЕ*НОВЫХ*КАРТОЧЕК**
// //   //     card.remove();
// //   //   });
// //   // });
// // });

// // // ✴️ Функция addCard принимает значения linkValue и titleValue в качестве параметров
// // function addCard(linkValue, titleValue) {         //================ ⚠️537/91
// //   const cardTemplate = document.querySelector('#card-template').content;
// //   const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
// //   cardElement.querySelector('.card__image').src = linkValue;
// //   cardElement.querySelector('.card__title').textContent = titleValue;

// //   // ✴️ Добавляем слушатели событий на кнопки новых карточек 'Like'
// //   const likeCard = cardElement.querySelector('.card__like-button');
// //   likeCard.addEventListener('click', function () {
// //     likeCard.classList.toggle('card__like-button_is-active');
// //   });

// //   // ✴️ Находим изображение в карточке и добавляем ему обработчик события click
// //   const cardImage = cardElement.querySelector('.card__image');
// //   cardImage.addEventListener('click', () => {     //=============== ⚠️559/105
// //     const popup = document.querySelector('.popup_type_image');
// //     const ImageInPopup = popup.querySelector('.popup__image');
// //     const popupCaption = popup.querySelector('.popup__caption');
// //     const closePopupCardImage = popup.querySelector('.popup__close');
// //     ImageInPopup.src = linkValue;
// //     ImageInPopup.alt = titleValue;
// //     popupCaption.textContent = titleValue;
// //     popup.classList.add('popup_is-opened');

// //     closePopupCardImage.addEventListener('click', function () {
// //       closePopup(popup);
// //     });
// //   });
// //   //✴️Клонированный элемент добавляется в начало контейнера cardsContainer
// //   cardsContainer.prepend(cardElement, cardsContainer.firstElementChild);
// //   closePopup(NewCardPopup);                       //✅============= ⚠️576/121
// // }
// // СТАРЫЙ КОД 64-117

// // ✴️ Функция addCard принимает значения linkValue и titleValue в качестве параметров
// const form = document.forms['new-place'];
// form.addEventListener('submit', function (evt) {
//     evt.preventDefault();
//     const linkValue = form.elements.link.value;
//     const titleValue = form.elements['place-name'].value;
//     addCard(linkValue, titleValue);
//     form.reset();
//     closePopup(NewCardPopup)
// });

// function addCard(linkValue, titleValue) {
//     const newCard = createCard(titleValue, linkValue );
//     placesList.prepend(newCard);
//     newCard.querySelector('.card__image').src = linkValue;
//     newCard.querySelector('.card__title').textContent = titleValue;
// const addButton = document.querySelector('.profile__add-button');

// const NewCardPopup = document.querySelector('.popup_type_new-card');
// addButton.addEventListener('click', function () {
//     openPopup(NewCardPopup);
// });

// const popupNewCardClose = NewCardPopup.querySelector('.popup__close');
// popupNewCardClose.addEventListener('click', function () {
//     closePopup(NewCardPopup);
// });
// };

// // ✴️ Для всех эл. с классом "card__image" выполняется функция.
// // const openImagePopup = document.querySelectorAll('.card__image')
// // .forEach((item) => {                            //============== ⚠️583/127
// //     item.addEventListener('click', () => {
// //       const popup = document.querySelector('.popup_type_image');
// //       const popupImage = popup.querySelector('.popup__image');
// //       const popupCaption = popup.querySelector('.popup__caption');
// //       // const imageCloseButton = popup.querySelector('.popup__close');
// //       const imageCloseButton = popup.addEventListener('click', () => {
// //         closePopup(popup);
// //       });
// //       popupImage.src = item.src;
// //       popupImage.alt = item.alt;
// //       popupCaption.textContent = item.alt;
// //       popup.classList.add('popup_is-opened');
// //     });
// //   });

// function createCard(imageSrc, imageAlt) {
//   const card = document.createElement('div');
//   const image = document.createElement('img');
//   image.src = imageSrc;
//   image.alt = imageAlt;
//   image.addEventListener('click', function() {
//     openImagePopup(image);
//   });
//   card.appendChild(image);
//   return card;
// }

// function openImagePopup(image) {
//   const popup = document.querySelector('.popup_type_image');
//   const popupImage = popup.querySelector('.popup__image');
//   const popupCaption = popup.querySelector('.popup__caption');
//   // const imageCloseButton = popup.querySelector('.popup__close');
//   const imageCloseButton = popup.addEventListener('click', function() {
//     closePopup(popup);
//   });
//   popupImage.src = image.src;
//   popupImage.alt = image.alt;
//   popupCaption.textContent = image.alt;
//   popup.classList.add('popup_is-opened');
// }
