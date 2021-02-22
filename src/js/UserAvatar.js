export default class UserAvatar {
    constructor(api, someForm, photo, popupIsClosed) {
      this.api = api;
      this.someForm = someForm;
      this.photo = photo;
      this.popupIsClosed = popupIsClosed;

      this.popupButtonAvatar = this.someForm.querySelector('.popup__button_avatar');

      this.updateUserAvatar = this.updateUserAvatar.bind(this);
    }
    updateUserAvatar() {
       event.preventDefault();
       this.popupButtonAvatar.textContent = 'Загрузка...';     
       const someLink = this.someForm.elements.avatarlink.value;
       this.api.patchAvatar(someLink).then((res) => {
       this.photo.style.backgroundImage = `url${res.avatar}`;
       this.popupIsClosed();
        })
        .catch((err) => {
          alert(err);
          console.log(err);
        })
       
       .finally(() => {
          this.popupButtonAvatar.textContent = 'Сохранить'; 
        });
    }  
     
}
  