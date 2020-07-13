class FormValidator {
  constructor(someForm) {
    this.someForm = someForm;
    this.checkInputValidity = this.checkInputValidity.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
  }
  notActiveButton(someButton) {
    someButton.classList.add('popup__button_notactive');
    someButton.setAttribute('disabled', 'disabled');
  }
  activeButton(someButton) {
    someButton.classList.remove('popup__button_notactive');
    someButton.removeAttribute('disabled', 'disabled');
  }
  checkInputValidity = (someInput) => {
    const errorElement = someInput.nextElementSibling;

    if (someInput.type === 'url') {
      if (someInput.value.length === 0) {
        if (!someInput.classList.contains('popup__was-clicked')) {
          const errorMessage = 'Это обязательное поле';
          errorElement.textContent = errorMessage;
          errorElement.classList.add('error-message');
        }
        return false;
      } else if (!someInput.checkValidity()) {
        if (!someInput.classList.contains('popup__was-clicked')) {
          const errorMessage = 'Здесь должна быть ссылка';
          errorElement.textContent = errorMessage;
          errorElement.classList.add('error-message');
        }
        return false;
      } else {
        errorElement.textContent = '';
        errorElement.classList.remove('error-message');
        return true;
      }
    } else {
      if (!someInput.checkValidity()) {
        if (!someInput.classList.contains('popup__was-clicked')) {
          const errorMessage = 'Это обязательное поле';
          errorElement.textContent = errorMessage;
          errorElement.classList.add('error-message');
        }
        return false;
      } else if (someInput.value.length < 2 || someInput.value.length > 30) {
        if (!someInput.classList.contains('popup__was-clicked')) {
          errorElement.textContent = 'Должно быть от 2 до 30 символов';
          errorElement.classList.add('error-message');
        }
        return false;
      } else {
        errorElement.textContent = '';
        errorElement.classList.remove('error-message');
        return true;
      }
    }
  }
  setSubmitButtonState(state, someForm) {
    const someFormButton = someForm.querySelector('.button');
    if (state === true) {
      this.activeButton(someFormButton);
    } else {
      this.notActiveButton(someFormButton);
    }
  }


  setEventListeners() {
    this.someForm.addEventListener('input', this.inputHandler);
  }

  inputHandler(event) {
    const input = event.target;
    const array = Array.from(this.someForm.elements);
    input.classList.remove('popup__was-clicked');
    delete array[array.length - 1];
    this.checkInputValidity(input);
    if (!array.every(this.checkInputValidity)) {
      this.setSubmitButtonState(false, this.someForm);
    } else {
      this.setSubmitButtonState(true, this.someForm);
    }

  }
}