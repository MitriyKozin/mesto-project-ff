
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

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

const isValid = (input) => {
  if (input.validity.valid) {
    hideInputError(input);
    input.classList.remove('popup__input-invalid');
  } else {
    showInputError(input, input.validationMessage);
    input.classList.add('popup__input-invalid');
  }
};

// Функция переключения состояния кнопки
const toggleButtonState = (formElement) => {
  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
  const inputs = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const isValidForm = inputs.every((input) => input.validity.valid);
  submitButton.disabled = !isValidForm;
  submitButton.classList.toggle(validationConfig.inactiveButtonClass, !isValidForm);
};

// // Функция очистки валидации
const clearValidation = (formElement) => {
  const inputs = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  inputs.forEach((input) => {
    hideInputError(input);
    input.classList.remove(validationConfig.inputErrorClass);
  });
  toggleButtonState(formElement);
};

// Функция включения валидации
const enableValidation = () => {
  const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));
  forms.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    const inputs = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(inputElement);
        toggleButtonState(formElement);
      });
    });
  });
};

export { enableValidation, clearValidation };