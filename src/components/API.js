
const config = {
  BASE_URL: 'https://mesto.nomoreparties.co/v1/wff-cohort-14',
  headers: {
    authorization: '37a3c59e-17a1-445c-bd60-3082d57222e3',
    'Content-Type': 'application/json',
  },
};

export const userData = { _id: 'ae1090f3a727551f619497b7'};

// Функция для получения всех карточек
export const getInitialCards = () => {
  return fetch(`${config.BASE_URL}/cards`, {
    method: 'GET',
    headers: {
      authorization: config.headers.authorization, 
    },
  }).then(handleResponse);
};

// Функция для получения информации о пользователе
export const getUserData = () => {
  return fetch(`${config.BASE_URL}/users/me`, {
    method: 'GET',
    headers: config.headers,
  }).then(handleResponse);
};

// Функция для обновления профиля пользователя
export const editUserProfile = (name, description) => {
  return fetch(`${config.BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: description,
    }),
  }).then(handleResponse);
};

// Функция для добавления новой карточки
export const addCard = (name, link) => {
  return fetch(`${config.BASE_URL}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name, //plase-name
      link: link,
    }),
  }).then(handleResponse);
};

// Функция для добавления нового аватара
export const updateUserAvatar = (avatarLink) => {
  return fetch(`${config.BASE_URL}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then(handleResponse);
};

// Функция для удаления карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.BASE_URL}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(handleResponse);
};

// Функция для добавления лайка карточке
export const addLike = (cardId) => {
  return fetch(`${config.BASE_URL}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  }).then(handleResponse);
};

// Функция для удаления лайка с карточки
export const removeLike = (cardId) => {
  return fetch(`${config.BASE_URL}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(handleResponse);
};

// Обработчик ответа от сервера
function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}


