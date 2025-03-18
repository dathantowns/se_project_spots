const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-btn",
  inactiveButtonClass: "modal__save-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_visible",
};

function showInputError(formElement, inputElement, errorMessage) {
  const errorElementId = inputElement.id + "-error";
  const errorElement = formElement.querySelector("#" + errorElementId);
  inputElement.classList.add("modal__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("modal__input-error_visible");
}

function hideInputError(formElement, inputElement) {
  const errorElementId = inputElement.id + "-error";
  const errorElement = formElement.querySelector("#" + errorElementId);
  inputElement.classList.remove("modal__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("modal__input-error_visible");
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(".modal__save-btn");

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function enableValidation() {
  const formsList = Array.from(document.querySelectorAll(config.formSelector));

  formsList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

enableValidation();
