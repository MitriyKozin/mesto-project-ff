import './pages/index.css';
import { openPopup, closePopup } from './components/modal.js';
import { createCard, deleteCardCallback, handleLikeClick } from './components/card.js';
import { getUserData, getInitialCards, editUserProfile, addCard, updateUserAvatar } from './components/API.js';

window.addEventListener('DOMContentLoaded', function () {
  getUserData()
    .then((userData) => {
      const profileImage = document.querySelector('.profile__image');
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      profileTitle.textContent = userData.name;
      profileDesc.textContent = userData.about;
    })
    .catch((err) => console.log(err));
});

const placesList = document.querySelector('.places__list');
// ✴️Получаем окно и его элеметы
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
  openPopup(avatarPopup);
});

closeAvatarButton.addEventListener('click', () => {
  closePopup(avatarPopup);
});

const avatarForm = avatarPopup.querySelector('.popup__form');
avatarForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const avatarLink = avatarForm.elements.link.value;
  updateUserAvatar(avatarLink)
    .then((userData) => {
      const profileImage = document.querySelector('.profile__image');
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closePopup(avatarPopup);
    })
    .catch((err) => console.log(err));
});

function setButtonMessage(button, message) {
  button.textContent = message;
}

avatarForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const avatarLink = avatarForm.elements.link.value;
  setButtonMessage(saveAvatarButton, 'Сохранение...');
  updateUserAvatar(avatarLink)
    .then((userData) => {
      const profileImage = document.querySelector('.profile__image');
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closePopup(avatarPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setButtonMessage(saveAvatarButton, 'Сохранить');
    });
});

// // При отправке формы редактирования профиля
// profileForm.addEventListener('submit', function (evt) {
//   evt.preventDefault();
//   saveButton.textContent = 'Сохранение...';
// });

// // При отправке формы добавления новой карточки
// newCardForm.addEventListener('submit', function (evt) {
//   evt.preventDefault();
//   mestoSaveButton.textContent = 'Сохранение...';
// });

// // При отправке формы обновления аватара
// avatarForm.addEventListener('submit', function (evt) {
//   evt.preventDefault();
//   saveAvatarButton.textContent = 'Сохранение...';
// });



const addButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
addButton.addEventListener('click', function () {
  openPopup(newCardPopup);
});
const newCardPopupClose = newCardPopup.querySelector('.popup__close');
newCardPopupClose.addEventListener('click', function () {
  closePopup(newCardPopup);
});

const newCardForm = newCardPopup.querySelector('.popup__form');
// ✴️ Обработчик клика по изображению карточки
newCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const linkValue = newCardForm.elements.link.value;
  const titleValue = newCardForm.elements['place-name'].value;

  // Добавление новой карточки на сервер
  addCard(titleValue, linkValue)
    .then((cardData) => {
      // Добавление новой карточки на страницу
      const newCard = createCard(
        cardData,
        deleteCardCallback,
        handleLikeClick,
        handleImageClick
      );
      placesList.prepend(newCard);

      // Сброс формы и закрытие попапа
      newCardForm.reset();
      closePopup(newCardPopup);
    })
    .catch((err) => console.log(err));
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
const imageCloseButton = document.querySelector(
  '.popup_type_image .popup__close'
);
imageCloseButton.addEventListener('click', () =>
  closePopup(document.querySelector('.popup_type_image'))
);

const saveButton = profileForm.querySelector('.popup__button');
const placeNameInput = newCardPopup.querySelector(
  '.popup__input_type_card-name'
);
const linkInput = newCardPopup.querySelector('.popup__input_type_url');
const mestoSaveButton = newCardPopup.querySelector('.popup__button');

const showInputError = (input, message) => {
  const errorElement = input.nextElementSibling;
  errorElement.textContent = message;
  errorElement.classList.add('popup__input-error_active');
};
const hideInputError = (input) => {
  const errorElement = input.nextElementSibling;
  errorElement.textContent = '';
  errorElement.classList.remove('popup__input-error_active');
};
const isValid = (input, pattern) => {
  if (input.validity.valid) {
    hideInputError(input);
    input.classList.remove('popup__input-invalid');
  } else {
    if (input.value.length === 0) {
      showInputError(input, 'Это обязательное поле');
    } else if (!pattern.test(input.value)) {
      showInputError(
        input,
        'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы'
      );
    } else if (input.validity.tooShort || input.validity.tooLong) {
      showInputError(
        input,
        `Минимальное количество символов ${input.minLength}. Длина текста сейчас: ${input.value.length} символов`
      );
    }
    input.classList.add('popup__input-invalid');
  }
};
const validateLinkInput = (input) => {
  if (input.validity.valid) {
    hideInputError(input);
    input.classList.remove('popup__input-invalid');
  } else {
    if (input.value.length === 0) {
      showInputError(input, 'Это обязательное поле');
    } else if (!input.checkValidity()) {
      showInputError(input, 'Введите правильный URL');
      input.classList.add('popup__input-invalid');
    }
  }
};
const toggleButtonState = () => {
  saveButton.disabled = !(nameInput.validity.valid && jobInput.validity.valid);
  mestoSaveButton.disabled = !(
    placeNameInput.validity.valid && linkInput.validity.valid
  );
};
[nameInput, jobInput, placeNameInput, linkInput].forEach((input) => {
  input.addEventListener('input', () => {
    if (input === nameInput || input === jobInput) {
      isValid(input, /^[a-zA-Zа-яёА-ЯЁ\s/-]+$/);
    } else if (input === placeNameInput) {
      isValid(input, /^[a-zA-Zа-яёА-ЯЁ\s/-]+$/);
    } else if (input === linkInput) {
      validateLinkInput(input);
    }
    toggleButtonState();
  });
});
const clearValidation = () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesc.textContent;
  [nameInput, jobInput, placeNameInput, linkInput].forEach((input) => {
    hideInputError(input);
    input.classList.remove('popup__input-invalid');
  });
  toggleButtonState();
  placeNameInput.value = '';
  linkInput.value = '';
};
editButton.addEventListener('click', () => {
  openPopup(editPopup);
  clearValidation();
});
addButton.addEventListener('click', () => {
  openPopup(newCardPopup);
  clearValidation();
});
popupClose.addEventListener('click', () => {
  closePopup(editPopup);
  closePopup(newCardPopup);
  clearValidation();
});
// const enableValidation = (validationConfig) => {
//   const profileForm = document.querySelector(validationConfig.formSelectorProfile);
//   const nameInput = profileForm.querySelector(validationConfig.inputSelectorName);
//   const jobInput = profileForm.querySelector(validationConfig.inputSelectorDescription);
//   const saveButtonProfile = profileForm.querySelector(validationConfig.submitButtonSelectorProfile);
//   const newCardForm = document.querySelector(validationConfig.formSelectorMesto);
//   const placeNameInput = newCardForm.querySelector(validationConfig.inputSelectorCardName);
//   const linkInput = newCardForm.querySelector(validationConfig.inputSelectorUrl);
//   const saveButtonMesto = newCardForm.querySelector(validationConfig.submitButtonSelectorMesto);

//    [nameInput, jobInput, placeNameInput, linkInput].forEach(input => {
//   input.addEventListener('input', () => {
//     if (input === nameInput || input === jobInput) {
//       isValid(input, /^[a-zA-Zа-яёА-ЯЁ\s/-]+$/);
//     } else if (input === placeNameInput) {
//       isValid(input, /^[a-zA-Zа-яёА-ЯЁ\s/-]+$/);
//     } else if (input === linkInput) {
//       validateLinkInput(input);
//     }
//     toggleButtonState();
//   });
// });

// editButton.addEventListener('click', () => {
//   openPopup(editPopup);
//   clearValidation(profileForm, validationConfig);
// });

// addButton.addEventListener('click', () => {
//   openPopup(newCardPopup);
//   clearValidation(newCardForm, validationConfig);
// });

// popupClose.addEventListener('click', () => {
//   closePopup(editPopup);
//   closePopup(newCardPopup);
//   clearValidation(profileForm, newCardForm, validationConfig);
// });
// };

// enableValidation({
//     // formSelector: '.popup__form',
//   formSelectorProfile: '.popup__form',
//   formSelectorMesto: '.popup__form', // что то не так с формами
//     // inputSelector: '.popup__input',
//   inputSelectorName: '.popup__input_type_name',
//   inputSelectorDescription: '.popup__input_type_description',
//     // inputSelector: '.popup__input'
//   inputSelectorCardName: '.popup__input_type_card-name',
//   inputSelectorUrl: '.popup__input_type_url',
//     // submitButtonSelector: '.popup__button',
//   submitButtonSelectorProfile: '.popup__button',
//   // submitButtonSelectorMesto: '.popup__button',

//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// });

const token = '37a3c59e-17a1-445c-bd60-3082d57222e3';

Promise.all([getInitialCards(token), getUserData(token)]).then(
  ([cards, user]) => {
    console.log(cards, user);
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
);
