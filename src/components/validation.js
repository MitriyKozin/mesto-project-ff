
// Добавьте валидацию для поля ввода URL аватара
avatarInput.addEventListener('input', () => {
  validateLinkInput(avatarInput);
  toggleButtonState(saveAvatarButton, avatarInput);
});

// Очистка поля ввода URL аватара
avatarInput.addEventListener('input', () => {
  clearValidation(avatarInput);
});

// Добавьте валидацию для поля ввода URL аватара
const avatarInput = avatarPopup.querySelector('.popup__input_type_avatar-link');
avatarInput.addEventListener('input', () => {
  validateLinkInput(avatarInput);
  toggleButtonState(saveAvatarButton, avatarInput);
});

const showInputError=(input, message)=>{
  const errorElement=input.nextElementSibling;
  errorElement.textContent=message;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (input) => {
  const errorElement=input.nextElementSibling;
  errorElement.textContent='';
  errorElement.classList.remove('popup__input-error_active');
};

const isValid = (input, pattern) => {
  if (input.validity.valid){
    hideInputError(input);
    input.classList.remove('popup__input-invalid');
  } else {
    if (input.value.length===0){
      showInputError(input, 'Это обязательное поле');
    } else if (!pattern.test(input.value)) {
      showInputError(input, 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы');
    } else if (input.validity.tooShort || input.validity.tooLong){
      showInputError(input, `Минимальное количество символов ${input.minLength}. Длина текста сейчас: ${input.value.length} символов`);
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

const toggleButtonState = (saveButtonProfile, nameInput, jobInput, saveButtonMesto, placeNameInput, linkInput) => {
  saveButtonProfile.disabled = !(nameInput.validity.valid && jobInput.validity.valid);
  // saveButtonMesto.disabled = !(placeNameInput.validity.valid && linkInput.validity.valid); 
};

const clearValidation = (profileForm, newCardForm, validationConfig) => {
  const nameInput = profileForm.querySelector(validationConfig.inputSelectorName);
  const jobInput = profileForm.querySelector(validationConfig.inputSelectorDescription);
  const placeNameInput = newCardForm.querySelector(validationConfig.inputSelectorCardName);
  const linkInput = newCardForm.querySelector(validationConfig.inputSelectorUrl);
  
  nameInput.value = '';
  jobInput.value = '';
  placeNameInput.value = '';
  linkInput.value = '';
  
  [nameInput, jobInput, placeNameInput, linkInput].forEach(input => {
    hideInputError(input);
    input.classList.remove(validationConfig.inputErrorClass);
  });
  
  toggleButtonState(
    profileForm.querySelector(validationConfig.submitButtonSelector),
    nameInput,
    jobInput,
    newCardForm.querySelector(validationConfig.submitButtonSelector),
    placeNameInput,
    linkInput
  );
};

export { clearValidation, toggleButtonState, isValid, validateLinkInput };




