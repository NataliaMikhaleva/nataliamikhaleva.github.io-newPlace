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

//объект для передачи данных классу Api
const options = {
  url: 'https://praktikum.tk/cohort11'
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

/*
Отлично, запросы на сервер отправляются, но есть несколько замечаний:

Надо исправить:
- + не создавать экземпляр класса Api каждый раз когда нужно сделать запрос, а создать один раз и использовать его
- + в конструктор класса передавать базовый адрес https://praktikum.tk/cohort11 , а остальную часть адреса добавлять к запосу в самом методе 
- + данные передаваемые на сервер передавать не в конструктор, а как  параметры самого метода запроса -   (исправлено не полностью)
- + обработка ошибок должна быть не в методах класса Api, а самом конце обработки промиса

Наша команда приносит извинения, при проверке работы на предыдущем спринте были пропущены следующие ошибки:
- + не вешать обработчик на buttonEdit каждый раз при отправке формы, а повесить один раз 
- + не создавать экземпляры каждый раз когда необходимо к ним обратиться как например UserInfo  CardList, а создать 
один раз и использовать уже созданные экземпляры вызывая его методы
- + когда код расположен в разных файлах, его нужно 
заключать в модули, т.к. если файлов будет много, то в разных 
файлах могут появится функции или переменные с одинаковыми именами,
они будут переопределять друг друга. Модуль должен предоставлять
наружу только минимально необходимый api
Для создании модулей можно воспользоваться IIFE, подробнее:
https://learn.javascript.ru/closures-module
https://habr.com/ru/company/ruvds/blog/419997/ 
Нужно обернуть в модули как минимум содержимое файла script.js
Оборачивание кода в IIFE не позволит глобально использовать переменные объявленные в нем и
и заставит явно передавать их туда, где они необходимы, как например в конструкторы классов

Данные исправления необходимо внести, т.к в дальнейшем вы можете столкнуться с проблемами при выполнении заданий и сдачи проектных и дипломной работы


Можно лучше: 
- проверка ответа сервера и преобразование из json дублируется во всех методах класса Api, лучше вынести в отдельный метод

*/

/*
Большая часть замечаний исправлена, но несколько ещё осталось:
Надо исправить:
- + в класс Api не передавать формы, а передавать как параметры методов patchUserInfo и patchAvatar сами передаваемые данные
  Класс Api не должен ничего знать о том как устроена форма, какие 
  там есть поля ввода и что из этой формы отправлять на сервер, метод класса Api должен только
  получить как параметры сами отправляемые данные и отправить запрос на сервер
- + не обращайтесь к DOM элементам на странице по их индексу, может измениться
  верстка и индексы у элементов будут уже другие, скрипт перестанет работать
- + закрытие попапов профиля и аватара при сохранении данные перенести в блок then, чтобы оно выполнялось только если сервер ответил подтверждением 

Можно лучше:
- не хардкодить ключ авторизации в каждом методе, а передавать в конструктор класса и использовать переданный
- не хардкодить id пользователя, а получать из данных пользователя принимаемых с сервера

*/



























