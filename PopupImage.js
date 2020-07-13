// для закрытия попапа с картинкой
class PopupImage {
    constructor(somePopup) {
      this.somePopup = somePopup;

      this.close = this.close.bind(this);
    }
    close() {
        this.somePopup.classList.remove('popup-card_is-opened'); 
    }
    setEventListeners() {
        this.somePopup.querySelector('.popup__close').addEventListener('click', this.close); 
  }
}