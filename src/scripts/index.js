// import { initialCards, createCard, handleLikeClick, deleteCard } from './components/card.js';
// import { openPopup, closePopup, closingOnEsc } from './components/modal';
// Используем импортированные функции
// initialCards();
// createCard();
// handleLikeClick();
// deleteCard();
// openPopup();
// closePopup();
// closingOnEsc();

// В файле index.js должны остаться:
// объявления и инициализация глобальных констант и переменных с DOM-элементами страницы,
// обработчики событий (при открытии и закрытии попапов; при отправке форм; обработчик, открывающий попап при клике по изображению карточки);
// вызовы других функций, подключённых из созданных модулей, которым нужно будет передавать объявленные здесь переменные и обработчики.

// // @todo: Функция создания карточки✴️----------------------------------createCard
// function createCard(cardData, deleteCardCallback, likeCardCallback) {
//   // 🔼функция, принимающая в аргументах данные одной карточки и функцию-колбэк для удаления, а возвращает подготовленный к выводу элемент карточки
//   //@todo: Темплейт карточки -------------------------------------------cardTemplate

//   const cardTemplate = document.querySelector('#card-template').content; //----создаём шаблон для template находящийся в html с id #card-template
//   const cardElement = cardTemplate.querySelector('.card').cloneNode(true); //--клонируем шаблон template(карточка) в cardElement
//   //cloneNode(*TRUE*) создает глубокую копию элемента со всем его содержимым, включая дочерние элементы и атрибуты.

//   // Лайк карточки
//   const likeCard = cardElement.querySelector('.card__like-button');
//   likeCard.addEventListener(
//     'click',
//     (likeCardCallback = function () {
//       likeCard.classList.toggle('card__like-button_is-active');
//     })
//   );

//   // @todo: DOM узлы✴️--------------------------------------------------cardElement
//   //------------------------------------------------------------------Установка значения вложенных элементов
//   const cardImage = cardElement.querySelector('.card__image'); //------------находим элемент card__image внутри cardElement и сохраняем в переменной cardImage
//   const cardTitle = cardElement.querySelector('.card__title'); //------------находим элемент card__title внутри cardElement м сохраняем в переменной cardTitle
//   const deleteButton = cardElement.querySelector('.card__delete-button'); //--находим элемент card__del.-but. внутри cardElement и сохр. в переменной deleteButton
//   //-----------------------------------------------------------------------Устанавливается значение свойств textContent, alt, src
//   cardTitle.textContent = cardData.name; //---------------------------------устанаваем текст заголовка карточки из cardData.name;
//   cardImage.alt = cardData.name; //---------------------------------------- устанаваем текст для alt из cardData.name;
//   cardImage.src = cardData.link; //-----------------------------------------устанаваем сылку на изображение карточки из cardData.name;
//   //-------------------------------------------------------------------------добавление обработчика клика на иконку удаления
//   deleteButton.addEventListener('click', function () {
//     //----------------------добавляет обработчик события "click" на кнопку с id "deleteButton"
//     deleteCardCallback(cardElement); //---------------------------------------(после нажатия) вызываться функция deleteCartCallback с аргументом cardElement
//   });

//   return cardElement; //------------------------------------------------------возвращает переменную cardElement
// }
// //✴️ Функция добавления лайка
// function handleLikeClick(popup) {
//   popup.target.classList.toggle('card__like-button_is-active');
// }

// function handleImageClick() {
//   // Реализация открытия попапа с изображением
// }

// //@todo: Функция удаления карточки✴️--------------------------------deleteCard
// //🔽---------------------------------------------------------------функция удаляет карточку из масива
// function deleteCard(cardElement) {
//   //--------------------------------принимает пареметр cardElement(элемент карточки)
//   cardElement.remove(); //-------------------------------------------удаление элемента
// }

//@todo: Вывести карточки на страницу✴️------------------------------placesList
const placesList = document.querySelector('.places__list'); //-----выведите все карточки из массива на страницу в элемент places__list
initialCards.forEach(function (cardData) {
  //-----------------------функция проходит по каждому элементу в массиве "initialCards" с помощью метода "forEach"
  const cardElement = createCard(cardData, deleteCard);
  placesList.appendChild(cardElement); //----------------------------созданная карточка добавляется в список .places__list с помощью метода "appendChild;
});

//-------------------__________________--------------------________________--------------------------____________________________---------------------

//✴️Получаем окно и его элеметы
const editButton = document.querySelector('.profile__edit-button'); // Редактировать профиль
const editPopup = document.querySelector('.popup_type_edit'); // Mодальное окно для редактирования профиля
// Добавляем обработчик клика по кнопке Редактировать профиль
editButton.addEventListener('click', function () {
  openPopup(editPopup);
});

//✴️ Получаем кнопку закрытия модального окна внутри окна редактирования профиля
const popupClose = editPopup.querySelector('.popup__close');
//Добавляем обработчик клика по кнопке закрытия модального окна внутри окна редактирования профиля
popupClose.addEventListener('click', function () {
  closePopup(editPopup);
});

// function openPopup(popup) {
//   //✴️ Функция открытия попапа
//   popup.classList.add('popup_is-opened');
//   // Добавляем обработчик клика по оверлею
//   popup.addEventListener('click', overlayClick);
// }

// function closePopup(popup) {
//   //✴️ Функция закрытия попапа
//   popup.classList.remove('popup_is-opened');
//   // Удаляение обработчика клика по оверлею
//   popup.removeEventListener('click', overlayClick);
// }

// function overlayClick(evt) {
//   //✴️  Функция закрытия попапа кликом на оверлей
//   if (evt.target === evt.currentTarget) {
//     const popup = evt.target;
//     closePopup(popup);
//   }
// }

// function closingOnEsc(evt) {
//   //✴️ Функция закрытия попапа нажатием на Esc
//   if (evt.key === 'Escape') {
//     //27
//     const openedPopup = document.querySelector('.popup_is-opened');
//     if (openedPopup) {
//       closePopup(openedPopup);
//     }
//   }
// }

//✴️ Добавляем слушателя событий на документ который будет отслеживать нажатие клавиш на клавиатуре
// Когда происходит событие 'keydown', (нажатие клавиши) сработает функция losingOnEsc
document.addEventListener('keydown', closingOnEsc);

//✴️Редактирование имени и информации о себе
// Находим форму в DOM
const formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name'); // Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector('.popup__input_type_description'); // Воспользуйтесь инструментом .querySelector()

// ✴️ Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  //✴️ Получите значение полей jobInput и nameInput из свойства value
  const newName = nameInput.value; // Получаем значение поля имени
  const newJob = jobInput.value; // Получаем значение поля описания
  // Выберите элементы, куда должны быть вставлены значения полей
  const profileTitle = document.querySelector('.profile__title'); // Находим элемент заголовка профиля
  const profileDescription = document.querySelector('.profile__description'); // Находим элемент описания профиля
  // Вставьте новые значения с помощью textContent
  profileTitle.textContent = newName; // Обновляем значение заголовка профиля
  profileDescription.textContent = newJob; // Обновляем значение описания профиля
  //Закрыть модальное окно после сохранения
  closePopup(editPopup);
}
// ✴️ Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

const addButton = document.querySelector('.profile__add-button'); // Новое место
const NewCardPopup = document.querySelector('.popup_type_new-card'); // Mодальное окно для добавления нового места
addButton.addEventListener('click', function () {
  // Добавляем обработчик клика по кнопке Новое место
  openPopup(NewCardPopup);
});
// ✴️Получаем кнопку закрытия модального окна внутри окна добавления нового места
const popupNewCardClose = NewCardPopup.querySelector('.popup__close');
popupNewCardClose.addEventListener('click', function () {
  // Добавляем обработчик клика по кнопке закрытия модального окна внутри окна добавления нового места
  closePopup(NewCardPopup);
});

//✴️ Форма добавления карточки.
//Объявляется переменная cardsContainer которая получает элемент с классом places__list из DOM.
const cardsContainer = document.querySelector('.places__list');
//Объявляется переменная form, которая получает форму с именем new-place из DOM
const form = document.forms['new-place'];
//Добавляется слушатель события "submit" на форму
// Когда форма отправляется функция-обработчик предотвращает
// выполнение стандартного действия (перезагрузка страницы)
form.addEventListener('submit', function (evt) {
  //предотвращает выполнение стандартного действия (перезагрузка страницы)
  evt.preventDefault();
  //Из формы извлекаются значения полей link и place-name
  const linkValue = form.elements.link.value;
  const titleValue = form.elements['place-name'].value;
  // Вызывается функция addCard которой передаются значения linkValue и titleValue
  addCard(linkValue, titleValue);
  //✴️Форма сбрасывается после отправки🗑️
  form.reset();

  //✴️ Добавляем слушатели событий на кнопки новых карочек "удалить"
  // Выбираем все кнопки "удалить" с классом .card__delete
  const deleteButtons = document.querySelectorAll('.card__delete-button');
  // Перебираем все кнопки "удалить"
  deleteButtons.forEach((button) => {
    // Добавляем слушатель события "click" на каждую кнопку "удалить"
    button.addEventListener('click', function (evt) {
      // Удаляем карточку из DOM
      const card = evt.target.closest('.card');
      card.remove();
    });
  });
});

//✴️ Функция addCard принимает значения linkValue и titleValue в качестве параметров
function addCard(linkValue, titleValue) {
  //Внутри функции addCard получается элемент с id "card-template" из DOM его содержимое клонируется и сохраняется в переменной cardElement.
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  //У клонированного элемента изменяется значение атрибута src
  // у изображения и текста у заголовка, используя значения linkValue и titleValue.
  cardElement.querySelector('.card__image').src = linkValue;
  cardElement.querySelector('.card__title').textContent = titleValue;

  // // ✴️ Добавляем слушатели событий на кнопки новых карточек 'Like'
  // // Выбираем кнопки 'Like' с классом .card__like-button
  // const likeCard = cardElement.querySelector('.card__like-button');
  // likeCard.addEventListener('click', function () {
  //   likeCard.classList.toggle('card__like-button_is-active');
  //   // handleLikeClick(popup)
  // });

  const likeCard = cardElement.querySelector('.card__like-button');
  likeCard.addEventListener('click', handleLikeClick);

  //✴️ Находим изображение в карточке и добавляем ему обработчик события click
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.addEventListener('click', () => {
    const popup = document.querySelector('.popup_type_image');
    const ImageInPopup = popup.querySelector('.popup__image');
    const popupCaption = popup.querySelector('.popup__caption');
    const closePopupCardImage = popup.querySelector('.popup__close');
    ImageInPopup.src = linkValue;
    ImageInPopup.alt = titleValue;
    popupCaption.textContent = titleValue;
    popup.classList.add('popup_is-opened');

    closePopupCardImage.addEventListener('click', function () {
      // Добавляем обработчик клика по кнопке закрытия модального окна внутри окна добавления нового места
      closePopup(popup);
    });
  });

  //✴️Клонированный элемент добавляется в начало контейнера cardsContainer
  cardsContainer.insertBefore(cardElement, cardsContainer.firstElementChild);
  closePopup(NewCardPopup);
}

// Для всех эл. с классом "card__image" выполняется функция.
const openImagePopup = document
  .querySelectorAll('.card__image')
  .forEach((item) => {
    // Для каждого эл. добавляется обработчик события 'click' который вызывает функцию
    item.addEventListener('click', () => {
      // Находим эл. с классом "popup_type_image" сохр. в переменную '.popup'
      const popup = document.querySelector('.popup_type_image');
      // Находим изображение внутри модального окна и сохр. в переменную 'pupImage'
      const popupImage = popup.querySelector('.popup__image');
      // Находим подпись изображения внутри модального окна и сохр. в переменную 'popup__caption'
      const popupCaption = popup.querySelector('.popup__caption');
      // Добав. обработчик события 'click' для кнопки закр. модал. окна
      // внутри окна просмотра картинки который вызывает функ. closePopup(popup)
      const imageCloseButton = popup.addEventListener('click', () => {
        closePopup(popup);
      });
      //Из карточки извлекаются значения полей url и title
      popupImage.src = item.src;
      popupImage.alt = item.alt;
      popupCaption.textContent = item.alt;
      // Для модального окна добавляю класс 'popup_is-opened'
      popup.classList.add('popup_is-opened');
    });
  });

//Анимация открытия и закрытия попапов
// Попап изменения профиля
// function openProfilePopup() {
document
  .querySelector('.profile__edit-button')
  .addEventListener('click', function () {
    document
      .querySelector('.popup_type_edit')
      .classList.add('popup_is-animated');
  });
// }
// function openNewCardPopup() {
document
  .querySelector('.profile__add-button')
  .addEventListener('click', function () {
    document
      .querySelector('.popup_type_new-card')
      .classList.add('popup_is-animated');
  });
// }
// function openImagePopup() {
document.querySelector('.card__image').addEventListener('click', function () {
  document
    .querySelector('.popup_type_image')
    .classList.add('popup_is-animated');
});
// }

document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('click', function (event) {
    if (event.target.classList.contains('popup')) {
      popup.classList.remove('popup_is-opened');
      // closePopup(popup)
    }
  });
  });

document.querySelectorAll('.popup__close').forEach(closeBtn => {
closeBtn.addEventListener('click', function (event) {
  event.target.closest('.popup').classList.remove('popup_is-opened');
});
});
