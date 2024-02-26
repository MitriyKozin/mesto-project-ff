
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

function createCard(cardData, deleteCardCallback, handleLikeClick, handleImageClick) {
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

  likeCard.addEventListener('click', handleLikeClick);

  cardImage.addEventListener('click', () => handleImageClick(cardData.name, cardData.link));

  return cardElement;
  }

function deleteCardCallback(cardElement) {
  cardElement.remove();
  }

function handleLikeClick(event) {
  const likeButton = event.target;
  likeButton.classList.toggle('card__like-button_is-active');
  }

export { createCard, deleteCardCallback, handleLikeClick };
