// const cardTemplate = document
//   .querySelector('#card-template')
//   .content.querySelector('.card');
// function createCard(
//   cardData,
//   deleteCardCallback,
//   handleLikeClick,
//   clickImageCallback
// ) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImage = cardElement.querySelector('.card__image');
//   const cardTitle = cardElement.querySelector('.card__title');
//   const deleteButton = cardElement.querySelector('.card__delete-button');
//   const likeCard = cardElement.querySelector('.card__like-button');
//   cardTitle.textContent = cardData.name;
//   cardImage.alt = cardData.name;
//   cardImage.src = cardData.link;
//   deleteButton.addEventListener('click', function () {
//     deleteCardCallback(cardElement);
//   });
//   function deleteCardCallback(cardElement) {
//     cardElement.remove();
//   }
//   function handleLikeClick() {
//     likeCard.classList.toggle('card__like-button_is-active');
//   }
//   likeCard.addEventListener('click', handleLikeClick);
//   cardImage.addEventListener('click', clickImageCallback);
//   return cardElement;
// }
// export { createCard };
















// const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// function createCard(cardData, deleteCardCallback, handleLikeClick, handleImageClick) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImage = cardElement.querySelector('.card__image');
//   const cardTitle = cardElement.querySelector('.card__title');
//   const deleteButton = cardElement.querySelector('.card__delete-button');
//   const likeCard = cardElement.querySelector('.card__like-button');
  
//   cardTitle.textContent = cardData.name;
//   cardImage.alt = cardData.name;
//   cardImage.src = cardData.link;
  
//   deleteButton.addEventListener('click', function () {
//     deleteCardCallback(cardElement);
//   });
  
//   likeCard.addEventListener('click', handleLikeClick);
  
//   cardImage.addEventListener('click', handleImageClick);
  
//   return cardElement;
// }

// export { createCard };










// //LAST MODIFIT 'card.js' HERE!!!

const cardTemplate = document
  .querySelector('#card-template')
  .content.querySelector('.card');
function createCard(
  cardData,
  deleteCardCallback,
  handleLikeClick,
  clickImageCallback
) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeCard = cardElement.querySelector('.card__like-button');
  cardTitle.textContent = cardData.name;
  cardImage.alt = cardData.name;
  cardImage.src = cardData.link;
  deleteButton.addEventListener('click', function () {
    deleteCardCallback(cardElement);
  });
  function deleteCardCallback(cardElement) {
    cardElement.remove();
  }
  function handleLikeClick() {
    likeCard.classList.toggle('card__like-button_is-active');
  }
  likeCard.addEventListener('click', handleLikeClick);
  cardImage.addEventListener('click', clickImageCallback);
  return cardElement;
}
export { createCard };
