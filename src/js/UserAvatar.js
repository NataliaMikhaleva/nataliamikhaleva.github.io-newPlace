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
        /* 
           + Надо исправить: закрывать попап только если сервер ответил подтверждением
           т.е. расположить закрытие в блоке then
        */
        
        /* 
           + Надо исправить: изменения текста кнопки делать только после того как
           запрос на сервер выполнился. Нужно разместить в блоке finally
           https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
           .finally(function() {
              this.popupButtoAvatar.textContent = 'Сохранить';  // завершен (успешно или с ошибкой)
            });
        */
       .finally(() => {
          this.popupButtonAvatar.textContent = 'Сохранить'; 
        });
    }  
     
}
  