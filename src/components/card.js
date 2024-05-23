
import { deleteCard, addLike, removeLike } from "./API.js";

const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

function createCard(cardData, userId, deleteCardCallback, handleLikeClick, handleImageClick) {//userID
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeCard = cardElement.querySelector('.card__like-button');

  cardTitle.textContent = cardData.name;
  cardImage.alt = cardData.name;
  cardImage.src = cardData.link;
  
  deleteButton.addEventListener('click', function() {
    deleteCardCallback(cardElement);
  });

  const likeCount = cardElement.querySelector('.card__like-count');
  likeCount.textContent = cardData.likes ? cardData.likes.length : 0; 
  likeCard.addEventListener('click', function(event) {
    handleLikeClick(event, likeCount, cardData, userId); 
  });

  if (cardData.owner._id === userId) {
    deleteButton.style.display = 'block';
  } else {
    deleteButton.style.display = 'none';
  }
  //проверка стоит ли лайк
  const isLiked = cardData.likes.some(like => like._id === userId);
  // если да то активировать 
  if (isLiked) {
    likeCard.classList.add('card__like-button_is-active'); 
  }


  // likeCard.addEventListener('click', handleLikeClick);
  likeCard.addEventListener('click', function(event) {
    handleLikeClick(event, likeCount, cardData, userId); // Добавьте userId как параметр
  });
  
  cardImage.addEventListener('click', () => handleImageClick(cardData.name, cardData.link));

  return cardElement;
}

// function deleteCardCallback(cardElement) {
//   if (cardElement.parentNode) {
//     cardElement.parentNode.removeChild(cardElement);
//   }
// }

function deleteCardCallback(cardElement, cardId) {
  deleteCard(cardId)
    .then(() => {
      if (cardElement.parentNode) {
        cardElement.parentNode.removeChild(cardElement);
      }
    })
    .catch((err) => console.log(err));
}

  // function handleLikeClick(event, likeCount, cardData, userId) {
  //   const likeButton = event.target;
  //   likeButton.classList.toggle('card__like-button_is-active');
  // }

  function handleLikeClick(event, likeCount, cardData, userId) {
    const likeButton = event.target;
    const isLiked = cardData.likes.some(like => like._id === userId); // Исправлено: like._id вместо like.name
   
    if (isLiked) {
      // Удалить лайк
      cardData.likes = cardData.likes.filter(like => like.name !== userId);
    } else {
      // Добавить лайк
      cardData.likes.push({ name: userId });
    }

    // Добавление или удаление лайка
    const likePromise = isLiked ? removeLike(cardData._id) : addLike(cardData._id);
  
    likePromise
      .then((updatedCardData) => {
        // Обновление количества лайков на странице
        likeCount.textContent = updatedCardData.likes.length;
  
        // Переключение активного состояния кнопки лайка
        likeButton.classList.toggle('card__like-button_is-active');
      })
      .catch((err) => console.log(err)); // Не забудьте обработать ошибки
  }
  

export { createCard, deleteCardCallback, handleLikeClick };

