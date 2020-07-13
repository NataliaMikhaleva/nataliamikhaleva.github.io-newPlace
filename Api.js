class Api {
    constructor(options) {
      this.baseUrl = options.url;

      /*
       + Надо исправить: в класс Api не должна передаваться форма userForm
      */
}
    getUserInfo() {
      return fetch(`${this.baseUrl}/users/me`, {
        /*
          Можно лучше: здесь и далее ключ авторизации не хардкодить в каждом методе, а 
          передавать как параметр конструктора
        */
        headers: {
            authorization: '5f964995-7da7-4204-b259-11a4aa038056'
          } 
      })
      /*
        Можно лучше: проверка ответа сервера и преобразование из json
        дублируется во всех методах класса Api, лучше вынести в отдельный метод:
          _getResponseData(res) {
          if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
          }
          return res.json();
          }
        Подчеркивание в начале имени метода говорит о том, что метод является приватным, т.е.
        не используется вне класса Api
      */
          .then(res => {
              if(res.ok) {
                return res.json(); 
              }
            return Promise.reject('Произошла ошибка');
          })          
    }

    getInitialCards() {
      return fetch(`${this.baseUrl}/cards`, {
        headers: {
          authorization: '5f964995-7da7-4204-b259-11a4aa038056'
        }
    })
        .then(res => {
            if(res.ok) {
              return res.json(); 
            }
          return Promise.reject('Произошла ошибка');
        })
    }

    patchUserInfo(someName, someUserInfo) {
      return fetch(`${this.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: '5f964995-7da7-4204-b259-11a4aa038056',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          /*
            Надо исправить:
            - + нужно не передавать форму в конструктор, а передавать как параметры
            метода patchUserInfo передаваемые данные:
            patchUserInfo(name, about) 
          
            - + не обращайтесь к DOM элементам на странице по их индексу, может измениться
            верстка и индексы у элементов будут уже другие, скрипт перестанет работать
          */
          name: someName, 
          about: someUserInfo
        })
      })
      .then(res => {
        if(res.ok) {
          return res.json(); 
        }
        return Promise.reject('Произошла ошибка');
      })
    }

    patchNewCard(someName, someLink) {
      return fetch(`${this.baseUrl}/cards`, {
        method: 'POST',
        headers: {
          authorization: '5f964995-7da7-4204-b259-11a4aa038056',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: someName,
          link: someLink
        })
      })
      .then(res => {
        if(res.ok) {
          return res.json(); 
        }
        return Promise.reject('Произошла ошибка');
      })
    }
    deleteCard(cardId) {
      return fetch(`${this.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: '5f964995-7da7-4204-b259-11a4aa038056',
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if(res.ok) {
          return res.json(); 
      }
      return Promise.reject('Произошла ошибка');
      })
    }
    patchAvatar(link) {
      return fetch(`${this.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: '5f964995-7da7-4204-b259-11a4aa038056',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          /*
            Надо исправить:
            - + нужно передавать как параметр не форму, а сами отправляемые данные
          
            - + не обращайтесь DOM элементам на странице по их индексу, может измениться
            верстка и индексы у элементов будут уже другие, скрипт перестанет работать
          */
          avatar: link
        })
      })
      .then(res => {
        if(res.ok) {
          return res.json(); 
        }
        return Promise.reject('Произошла ошибка');
      })
    }
  }