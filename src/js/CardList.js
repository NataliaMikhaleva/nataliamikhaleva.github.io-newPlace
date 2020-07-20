export default class CardList {
  constructor (cardContainer, api, someForm, createNewCard, popupNewPlaceIsClosed) {
    
    this.cardContainer = cardContainer; 
    this.api = api;
    this.someForm = someForm; 
    this.createNewCard = createNewCard;
    this.popupNewPlaceIsClosed = popupNewPlaceIsClosed;
    
    this.popupButton = this.someForm.querySelector('.popup__button');

    this.addCard = this.addCard.bind(this);
    this.renderFromArray = this.renderFromArray.bind(this);
    this.renderFromNewPlace = this.renderFromNewPlace.bind(this);
  }

  addCard(name, link, amount, idName) {
    return this.createNewCard(name, link, amount, idName);
  }

  renderFromArray() { 
    this.api.getInitialCards().then(res => {
      res.forEach(element => {
      
      const newCard = this.cardContainer.appendChild(this.addCard(element.name, element.link, element.likes.length, element._id));  
      if(this.testCardId(element)) {
        newCard.querySelector('.place-card__delete-icon').style.display = 'block';
      }   
      else {
        newCard.querySelector('.place-card__delete-icon').style.display = 'none';
      }
      })
    })
    .catch((err) => {
      console.log(err);
    })
    }

  renderFromNewPlace() {
    event.preventDefault();
    this.popupButton.textContent = 'Загрузка...';
    this.popupButton.style.fontSize = '18px';
    this.api.patchNewCard(this.someForm.elements.name.value, this.someForm.elements.link.value).then((res) => {
      const newCard = this.addCard(res.name, res.link, res.likes.length, res._id);  
      newCard.querySelector('.place-card__delete-icon').style.display = 'block';
      this.cardContainer.appendChild(newCard);  
      this.popupNewPlaceIsClosed();
      this.popupButton.textContent = '+';
      this.popupButton.style.fontSize = '36px';
    })
    .catch((err) => {
      console.log(err);
    })
  }  

  testCardId(resJbj) {
    if(resJbj.owner._id === "ed2020d03ead4c04f8eeadc2") {
      return true
    }
    else {
      return false
    }
  }
}
  