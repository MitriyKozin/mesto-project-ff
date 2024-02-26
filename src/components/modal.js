// //✴️ Добавляем слушателя событий на документ который будет отслеживать нажатие клавиш на клавиатуре
document.addEventListener('keydown', closePopupByEscape);
// document.addEventListener('click', closePopupByOverlay);


function openPopup(popup) { 
  //✴️ Функция открытия попапа 
  setTimeout(() => { 
  popup.classList.add('popup_is-opened');
  },0);
  popup.classList.add('popup_is-animated');
  document.addEventListener('click', closePopupByOverlay);  
  document.addEventListener('keydown', closePopupByEscape);
  } 

  function closePopup(popup) {  
    //✴️ Функция закрытия попапа 
    popup.classList.remove('popup_is-opened'); 
    setTimeout(() => {  
    popup.classList.remove('popup_is-animated'); 
  }, 600); 
  document.removeEventListener('click', closePopupByOverlay);  
  document.removeEventListener('keydown', closePopupByEscape);  
  }  
  

function closePopupByOverlay(evt) {              
  //✴️  Функция закрытия попапа кликом на оверлей
  const popup = evt.target;
  if (popup.classList.contains('popup')) {
    closePopup(popup);
  }
}

function closePopupByEscape(evt) {                
  //✴️ Функция закрытия попапа нажатием на Esc
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

export { openPopup, closePopup };


















// function openPopup(popup) {
//   //✴️ Функция открытия попапа 
//   popup.addEventListener('click', closePopupByOverlay);  
//   document.addEventListener('keydown', closePopupByEscape);
//   popup.classList.add('popup_is-opened'); 
// }
 
// function closePopup(popup) {
//   //✴️ Функция закрытия попапа 
//   // document.removeEventListener('click', closePopupByOverlay);  
//   // document.removeEventListener('keydown', closePopupByEscape);
//   popup.classList.remove('popup_is-opened'); 
// }

// function closePopupByOverlay(evt){             
//   //✴️  Функция закрытия попапа кликом на оверлей
//   const popup = evt.target;
//   // closePopup(popup);
//   if (evt.target === evt.currentTarget) {
//     const popup = evt.target;
//     closePopup(popup);
//   }
// }
// // }


// function closePopupByEscape(evt) {               
//   //✴️ Функция закрытия попапа нажатием на Esc
//   if (evt.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_is-opened');
//     if (openedPopup) {
//       closePopup(openedPopup);
//     }
//   }
// }


// export {openPopup, closePopup} ;