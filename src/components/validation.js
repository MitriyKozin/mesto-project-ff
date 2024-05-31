
import { validationConfig } from './validation-config.js';

const showInputError = (inputElement, errorMessage) => {
  const errorElement = inputElement.nextElementSibling;
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (inputElement) => {
  const errorElement = inputElement.nextElementSibling;
  errorElement.textContent = '';
  errorElement.classList.remove(validationConfig.errorClass);
};
// const checkInputValidity = (inputElement) => {
//   if (!inputElement.validity.valid) {
//     const errorMessage = inputElement.validity.patternMismatch ? inputElement.dataset.errorMessage: inputElement.validationMessage;
//     showInputError(inputElement, errorMessage);
//     inputElement.classList.add(validationConfig.inputInvalidClass);
//   } else {
//     hideInputError(inputElement);
//     inputElement.classList.remove(validationConfig.inputInvalidClass);
//   }
// };

const checkInputValidity = (inputElement) => {
  if (!inputElement.validity.valid) {
    let errorMessage = inputElement.validationMessage; //const
    if (inputElement.validity.patternMismatch) {
      errorMessage = inputElement.getAttribute('data-error-pattern') || 'Неверный формат';
    }
    showInputError(inputElement, errorMessage);
    inputElement.classList.add(validationConfig.inputInvalidClass);
  } else {
    hideInputError(inputElement);
    inputElement.classList.remove(validationConfig.inputInvalidClass);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);
  buttonElement.disabled = hasInvalidInput;
  buttonElement.classList.toggle(validationConfig.inactiveButtonClass, hasInvalidInput);
};

const clearValidation = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(inputElement);
    inputElement.classList.remove(validationConfig.inputInvalidClass);
  });
  toggleButtonState(inputList, buttonElement);
};

export { enableValidation, clearValidation };
