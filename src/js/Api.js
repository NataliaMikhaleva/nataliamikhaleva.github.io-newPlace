export default class Api {
    constructor(options) {
      this.baseUrl = options.url;
}
    getUserInfo() {
      return fetch(`${this.baseUrl}/users/me`, {
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