//для попапа новое место и редактировать профиль

/*
  Можно лучше: класс Popup слишком сильно перегружен
  в нем должны быть только методы открытия закрытия окна

  class Popup {
    constructor(popUpWindow) {  //container
      this.close = this.close.bind(this);         
      this.popUpWindow.querySelector('.popup__close').addEventListener('click', this.close);
    }

    close() {
      this.popUpWindow.classList.remove("popup_is-opened");
    }

    open() {
      this.popUpWindow.classList.add("popup_is-opened");
    }
  }

  На этом нужно было ограничиться и расширять весь остальной функционал попапа 
  с помощью наследования


*/

class Popup {
    constructor(somePopup, closeButton, openButton, notActiveButtonPopup, renderCardsFromNewPlace) {
      this.somePopup = somePopup,
      this.closeButton = closeButton, 
      this.openButton = openButton, 
      this.notActiveButtonPopup = notActiveButtonPopup;
      this.renderCardsFromNewPlace = renderCardsFromNewPlace;

      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
      this.notActiveButtonPopupNewPlace = this.notActiveButtonPopupNewPlace.bind(this);
      
    }   
    open () {  
      this.somePopup.classList.add('popup_is-opened');
      
    }

    errorsDelete () {
      const someForm = this.somePopup.querySelector('.popup__form');
      
      const array = Array.from(someForm.elements);
      array.forEach (function (elem) {
        if (!elem.classList.contains('button')) {
              const errorElement = elem.nextElementSibling;
              elem.classList.add('popup__was-clicked');
              errorElement.textContent = '';
              errorElement.classList.remove('error-message');
          }
      });
    }
    close () {
      this.somePopup.querySelector('.popup__form').reset();
      this.somePopup.classList.remove('popup_is-opened');
      this.errorsDelete();
    }
    notActiveButtonPopupNewPlace() {
      const button = this.somePopup.querySelector('.popup__button');
      this.notActiveButtonPopup(button);
      this.open(); 
    }
    eventListeners() {
        this.openButton.addEventListener('click', this.open); 
        this.closeButton.addEventListener('click', this.close); 
      }
    eventListenerPopupNewPlace() {
        this.openButton.addEventListener('click', this.notActiveButtonPopupNewPlace); 
            
      }
    }



    
  
