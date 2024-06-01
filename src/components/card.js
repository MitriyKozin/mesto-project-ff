
import { deleteCard, addLike, removeLike } from "./API.js"; 

const cardTemplate = document.querySelector('#card-template').content.querySelector('.card'); 

function createCard(cardData, userId, deleteCardCallback, handleLikeClick, handleImageClick) {

  // console.log('UserID:', userId); // отладка
  // console.log('Card Owner ID:', cardData.owner._id); //отладка

  const cardElement = cardTemplate.cloneNode(true); 
  const cardImage = cardElement.querySelector('.card__image'); 
  const cardTitle = cardElement.querySelector('.card__title'); 
  const deleteButton = cardElement.querySelector('.card__delete-button'); 

  if (cardData.owner._id === userId) { 
    deleteButton.style.display = 'block'; 
    deleteButton.addEventListener('click', function() { 
      deleteCardCallback(cardElement, cardData._id); 
    }); 
  } else { 
    deleteButton.style.display = 'none'; 
  } 
  const likeCard = cardElement.querySelector('.card__like-button'); 
  cardTitle.textContent = cardData.name; 
  cardImage.alt = cardData.name; 
  cardImage.src = cardData.link; 

  const likeButton = cardElement.querySelector('.card__like-button');
  const isLiked = cardData.likes.some(like => like._id === userId);
  likeButton.classList.toggle('card__like-button_is-active', isLiked);

  const likeCount = cardElement.querySelector('.card__like-count'); 
  likeCount.textContent = cardData.likes ? cardData.likes.length : 0;  
  likeCard.addEventListener('click', function(event) {
    handleLikeClick(event, likeCount, cardData, userId); 
  });

  if (cardData.owner._id === userId) { 
    deleteButton.style.display = 'block'; 
    deleteButton.addEventListener('click', function() { 
      deleteCardCallback(cardElement, cardData._id); 
    }); 
  } else { 
    deleteButton.style.display = 'none'; 
  } 

  cardImage.addEventListener('click', () => handleImageClick(cardData.name, cardData.link));

  return cardElement; 
} 

function deleteCardCallback(cardElement, cardId) { 
  deleteCard(cardId) 
    .then(() => { 
      if (cardElement.parentNode) { 
        cardElement.parentNode.removeChild(cardElement); 
      } 
    }) 
    .catch((err) => console.log(err)); 
} 

function handleLikeClick(event, likeCount, cardData, userId) {
    if (!cardData || !cardData.likes) {
      console.error('Ошибка: cardData не определён или cardData.likes отсутствует');
      return; 
    }
    const likeButton = event.target;
    const isLiked = cardData.likes.some(like => like._id === userId);
    const likePromise = isLiked ? removeLike(cardData._id) : addLike(cardData._id);
  
    likePromise
      .then((updatedCardData) => {
        if (!updatedCardData || !updatedCardData.likes) {
          throw new Error('Ошибка: обновлённые данные карты не содержат likes');
        }
        cardData.likes = updatedCardData.likes;
        likeCount.textContent = updatedCardData.likes.length;
        likeButton.classList.toggle('card__like-button_is-active', !isLiked);
      })
      .catch((err) => {
        console.error('Ошибка при обновлении лайков:', err);
      });
  }

export { createCard, deleteCardCallback, handleLikeClick };





