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

// @todo: Функция создания карточки✴️----------------------------------createCard
 function createCard(cardData, deleteCardCallback, likeCardCallback){
  // 🔼функция, принимающая в аргументах данные одной карточки и функцию-колбэк для удаления, а возвращает подготовленный к выводу элемент карточки
  //@todo: Темплейт карточки -------------------------------------------cardTemplate

  const cardTemplate = document.querySelector('#card-template').content; //----создаём шаблон для template находящийся в html с id #card-template
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); //--клонируем шаблон template(карточка) в cardElement
  //cloneNode(*TRUE*) создает глубокую копию элемента со всем его содержимым, включая дочерние элементы и атрибуты.

  // Лайк карточки
  const likeCard = cardElement.querySelector('.card__like-button');
  likeCard.addEventListener('click',(likeCardCallback = function () {
      likeCard.classList.toggle('card__like-button_is-active');
    })
  );

  // @todo: DOM узлы✴️--------------------------------------------------cardElement
  //------------------------------------------------------------------Установка значения вложенных элементов
  const cardImage = cardElement.querySelector('.card__image'); //------------находим элемент card__image внутри cardElement и сохраняем в переменной cardImage
  const cardTitle = cardElement.querySelector('.card__title'); //------------находим элемент card__title внутри cardElement м сохраняем в переменной cardTitle
  const deleteButton = cardElement.querySelector('.card__delete-button'); //--находим элемент card__del.-but. внутри cardElement и сохр. в переменной deleteButton
  //-----------------------------------------------------------------------Устанавливается значение свойств textContent, alt, src
  cardTitle.textContent = cardData.name; //---------------------------------устанаваем текст заголовка карточки из cardData.name;
  cardImage.alt = cardData.name; //---------------------------------------- устанаваем текст для alt из cardData.name;
  cardImage.src = cardData.link; //-----------------------------------------устанаваем сылку на изображение карточки из cardData.name;
  //-------------------------------------------------------------------------добавление обработчика клика на иконку удаления
  deleteButton.addEventListener('click', function () {
    //----------------------добавляет обработчик события "click" на кнопку с id "deleteButton"
    deleteCardCallback(cardElement); //---------------------------------------(после нажатия) вызываться функция deleteCartCallback с аргументом cardElement
  });

  return cardElement; //------------------------------------------------------возвращает переменную cardElement
}

//✴️ Функция добавления лайка
 function handleLikeClick(popup) {
  popup.target.classList.toggle('card__like-button_is-active');
}

//@todo: Функция удаления карточки✴️--------------------------------deleteCard
//🔽---------------------------------------------------------------функция удаляет карточку из масива
 function deleteCard(cardElement) {
  //--------------------------------принимает пареметр cardElement(элемент карточки)
  cardElement.remove(); //-------------------------------------------удаление элемента
}

// export { createCard, handleLikeClick, deleteCard };