class Card {
  constructor(container, somePopup, api) {
    this.container = container;
    this.somePopup = somePopup;
    this.api = api;

    this.remove = this.remove.bind(this);
    this.popupOpen = this.popupOpen.bind(this);
  }
  create (name, link, amount, idName) {
    const placeCard = document.createElement('div');
    placeCard.id = `${idName}`;  
    placeCard.classList.add('place-card');

    const placeCardImage = document.createElement('div');
    placeCardImage.classList.add('place-card__image');
    placeCardImage.style.backgroundImage = `url(${link})`;

    const buttonDelete = document.createElement('button');
    buttonDelete.classList.add('place-card__delete-icon');

    const placeCardDescription = document.createElement('div');
    placeCardDescription.classList.add('place-card__description');

    const placeCardName = document.createElement('h3');
    placeCardName.classList.add('place-card__name');
    placeCardName.textContent = `${name}`;
    
    const placeCardLike = document.createElement('div');
    placeCardLike.classList.add('place-card__like');
    const buttonLike = document.createElement('button');
    buttonLike.classList.add('place-card__like-icon');
    const likeAmount = document.createElement('p');
    likeAmount.classList.add('place-card__likeAmount');
    likeAmount.textContent = `${amount}`;

    placeCardImage.appendChild(buttonDelete);
    placeCardLike.appendChild(buttonLike);
    placeCardLike.appendChild(likeAmount);
    placeCardDescription.appendChild(placeCardName);
    placeCardDescription.appendChild(placeCardLike);
    placeCard.appendChild(placeCardImage);
    placeCard.appendChild(placeCardDescription);

    this.cardElement = placeCard;

    this.setEventListeners();
    return placeCard;
  }
    setEventListeners() {
      this.cardElement.querySelector('.place-card__like-icon').addEventListener ('click', this.like);
      this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
      this.cardElement.querySelector('.place-card__image').addEventListener('click', this.popupOpen);
    }
    like(event) {
       event.target.classList.toggle('place-card__like-icon_liked');
  }
    remove(event) {
      if(window.confirm("Вы действительно хотите удалить эту карточку?")) {
        const card = event.target.closest('.place-card');
        this.api.deleteCard(card.id).then(() => {
          this.container.removeChild(card);
        })
        .catch((err) => {
          console.log(err);
        })
      }
    }
    popupOpen() {
      const placeCardImage = event.target;
      if (event.target.classList.contains('place-card__image')){
        this.somePopup.querySelector('.popup-card__image').style.backgroundImage = placeCardImage.style.backgroundImage;
        this.somePopup.classList.add('popup-card_is-opened');
      }
    }
  }


