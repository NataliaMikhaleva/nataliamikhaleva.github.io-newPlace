import "./pages/index.css";

//импортируем модули
import Api from './js/Api.js';
import Card from './js/Card.js';
import CardList from './js/CardList.js';
import FormValidator from './js/FormValidator.js';
import Popup from './js/Popup.js';
import PopupImage from './js/PopupImage.js';
import UserAvatar from './js/UserAvatar.js';
import UserInfo from './js/UserInfo.js';


(function() {


//кнопки
const button = document.querySelector('.button');
const buttonEdit = document.querySelector('.button-edit');

//картинка аватара
const userInfoPhoto = document.querySelector('.user-info__photo');

//крестики, закрывающие попапы
const popupClosePlace = document.querySelector('.popup__close_place');
const popupCloseProfile = document.querySelector('.popup__close_profile');
const popupCloseAvatar = document.querySelector('.popup__close_avatar');

//попапы новое место, редактировать профиль, обновить аватар
const popup = document.querySelector('.popup');
const popupUser = document.querySelector('.popup_type_profile');
const popupAvatar = document.querySelector('.popup_avatar');

//попап с картинкой
const popupCard = document.querySelector('.popup-card');

//форма новое место
const newForm = document.forms.new;

//форма редактировать профиль  
const profileForm = document.forms.profile;

//форма Обновить аватар
const avatarForm = document.forms.avatar;

// контейнер, в который записываются данные пользователя 
const userDataContainer = document.querySelector('.user-info');

//контейнер, хранящий все карточки
const placesList = document.querySelector('.places-list');

//const API_URL = NODE_ENV === 'production' ? 'https://praktikum.tk' : 'http://praktikum.tk';

const API_URL = NODE_ENV === 'production' ? 'https://nomoreparties.co' : 'http://nomoreparties.co';

//объект для передачи данных классу Api
const options = {
  //url: 'https://praktikum.tk/cohort11'
  url: `${API_URL}/cohort11`
  //url: `${API_URL}`
}

//cоздаем экземпляр класса Api
const api = new Api(options, profileForm);

//создаем экземпляр класса UserInfo и передаем экземпляр класса Api в UserInfo
const eventProfile = new UserInfo(userDataContainer, api, profileForm, popupIsClosed, popupIsOpened);
eventProfile.setDefaultInfo();

//создаем экземпляр класса UserAvatar
const eventAvatar = new UserAvatar(api, avatarForm, userInfoPhoto, popupAvatarIsClosed);
  
//создаем экземпляр класса CardList
const list = new CardList(placesList, api, newForm, createNewCard, popupNewPlaceIsClosed);
list.renderFromArray();

//создаем функцию createNewCard для передачу классу CardList
function createNewCard(name, link, amount, idName) {
  const cards = new Card(placesList, popupCard, api);
  return cards.create(name, link, amount, idName);
}

//создаем функцию renderCardsFromNewPlace для передачи в класс Popup
function renderCardsFromNewPlace() {
  list.renderFromNewPlace();
}

 //создаем экземпляр класса Popup для попапа новое место
const eventPopupNewPlace = new Popup(popup, popupClosePlace, button, notActiveButtonPopup, renderCardsFromNewPlace);
eventPopupNewPlace.eventListeners();
eventPopupNewPlace.eventListenerPopupNewPlace();

//создаем фунцию закрытия попапа новое место
function popupNewPlaceIsClosed () {
  eventPopupNewPlace.close();
}

//создаем экземпляр класса Popup для попапа редактировать профиль
const eventPopupUser = new Popup(popupUser, popupCloseProfile, buttonEdit);
eventPopupUser.eventListeners();

//создаем ф-ию закрытия попапа popupIsClosed, используя метод класса Popup, для передачи в класс UserInfo
function popupIsClosed () {
  eventPopupUser.close();
}
//создаем ф-ию открытия попапа popupIsOpened, используя метод класса Popup, для передачи в класс UserInfo
function popupIsOpened () {
  eventPopupUser.open();
}

//создаем экземпляр класса Popup для попапа обновить аватар
const eventPopupAvatar = new Popup(popupAvatar, popupCloseAvatar, userInfoPhoto);
eventPopupAvatar.eventListeners();

//создаем ф-ию закрытия попапа popupIsClosed, используя метод класса Popup, для передачи в класс UserAvatar
function popupAvatarIsClosed () {
  eventPopupAvatar.close();
}

// создаем экземпляр класса FormValidator
const newFormValidator = new FormValidator(newForm);
newFormValidator.setEventListeners();

//создаем функцию notActiveButtonPopup для передачи в класс Popup
function notActiveButtonPopup(someButton) {
  newFormValidator.notActiveButton(someButton);
}

const profileFormValidator = new FormValidator(profileForm);
profileFormValidator.setEventListeners();

const avatarFormValidator = new FormValidator(avatarForm);
avatarFormValidator.setEventListeners();

// создаем экземпляр класса PopupImage
const popupImage = new PopupImage(popupCard);
popupImage.setEventListeners();


//вешаем слушатели
profileForm.addEventListener('submit', eventProfile.updateUserInfo);
buttonEdit.addEventListener('click', eventProfile.setUserInfo);
avatarForm.addEventListener('submit', eventAvatar.updateUserAvatar);
newForm.addEventListener('submit', list.renderFromNewPlace);

}());























