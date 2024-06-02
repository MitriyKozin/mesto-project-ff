

const showInputError = (inputElement, errorMessage, config) => {
  const errorElement = inputElement.nextElementSibling;
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (inputElement, config) => {
  const errorElement = inputElement.nextElementSibling;
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
};

const checkInputValidity = (inputElement, config) => {
  if (!inputElement.validity.valid) {
    let errorMessage = inputElement.validationMessage; 
    if (inputElement.validity.patternMismatch) {
      errorMessage = inputElement.getAttribute('data-error-pattern') || 'Неверный формат';
    }
    showInputError(inputElement, errorMessage, config);
    inputElement.classList.add(config.inputInvalidClass);
  } else {
    hideInputError(inputElement, config);
    inputElement.classList.remove(config.inputInvalidClass);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement,config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement,config);
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);
  buttonElement.disabled = hasInvalidInput;
  buttonElement.classList.toggle(config.inactiveButtonClass, hasInvalidInput);
};

const clearValidation = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(inputElement, config);
    inputElement.classList.remove(config.inputInvalidClass);
  });
  toggleButtonState(inputList, buttonElement, config);
};

export { enableValidation, clearValidation };