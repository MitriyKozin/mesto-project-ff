
function openPopup(popup) {
    //✴️ Функция открытия попапа
    popup.classList.add('popup_is-opened');
    // Добавляем обработчик клика по оверлею
    popup.addEventListener('click', overlayClick);
  }
  
function closePopup(popup) {
    //✴️ Функция закрытия попапа
    popup.classList.remove('popup_is-opened');
    // Удаляение обработчика клика по оверлею
    popup.removeEventListener('click', overlayClick);
  }
  
function overlayClick(evt) {
    //✴️  Функция закрытия попапа кликом на оверлей
    if (evt.target === evt.currentTarget) {
      const popup = evt.target;
      closePopup(popup);
    }
  }
  
function closingOnEsc(evt) {
    //✴️ Функция закрытия попапа нажатием на Esc
    if (evt.key === 'Escape') {
      //27
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) {
        closePopup(openedPopup);
      }
    }
  }

  // export { openPopup, closePopup, closingOnEsc };