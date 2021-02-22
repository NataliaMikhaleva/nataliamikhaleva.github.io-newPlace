export default class UserInfo {
  constructor(container, api, someForm, popupIsClosed, popupIsOpened) {
      this.container = container;  
      this.api = api;
      this.someForm = someForm;
      this.popupIsClosed = popupIsClosed;
      this.popupIsOpened = popupIsOpened;

      this.userInfoName = this.container.querySelector('.user-info__name');
      this.userInfoJob = this.container.querySelector('.user-info__job');
      this.userInfoPhoto = this.container.querySelector('.user-info__photo');
      this.buttonEdit = this.someForm.querySelector('.popup__button_edit');

      this.updateUserInfo = this.updateUserInfo.bind(this);
      this.setUserInfo = this.setUserInfo.bind(this);
  }

  setUserInfo () {
    this.buttonEdit.textContent = 'Сохранить';
    this.someForm.elements.username.value = this.userInfoName.textContent;
    this.someForm.elements.userinfo.value = this.userInfoJob.textContent;
    this.popupIsOpened();
  }

  updateUserInfo() {
    event.preventDefault();
    this.buttonEdit.textContent = 'Загрузка...';     
    const userName = this.someForm.elements.username.value;
    const userInfo = this.someForm.elements.userinfo.value;
    this.api.patchUserInfo(userName, userInfo).then((res) => {
      this.userInfoName.textContent = res.name;
      this.userInfoJob.textContent = res.about;
      this.popupIsClosed();
    })
    .catch((err) => {
      console.log(err);
    })

  }

  setDefaultInfo() {
    this.api.getUserInfo().then((res) => {
      this.userInfoName.textContent = res.name;
      this.userInfoJob.textContent = res.about;
      this.userInfoPhoto.style.backgroundImage = `url(${res.avatar})`;
    })
    .catch((err) => {
      console.log(err);
    })
  }  
}
