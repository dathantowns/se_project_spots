const editButton = document.querySelector(".profile__edit-btn");

const closeProfileButton = document.querySelector(".modal__close-btn");

const profileFormElement = document.querySelector("#edit-modal");

const submitButton = profileFormElement.querySelector(".modal__save-btn");

const nameInput = profileFormElement.querySelector("#name");

const jobInput = profileFormElement.querySelector("#description");

const profileNameElement = document.querySelector(".profile__title");

const profileJobElement = document.querySelector(".profile__description");

const cardTemplate = document.querySelector("#card-template");

const cardsListElement = document.querySelector(".cards__list");

const newProfileButton = document.querySelector(".profile__new-btn");

const newPostFormElement = document.querySelector("#post-modal");

const closePostButton = newPostFormElement.querySelector(".modal__close-btn");

const linkInput = document.querySelector("#link");

const captionInput = document.querySelector("#caption");

const newPostSubmitButton =
  newPostFormElement.querySelector(".modal__save-btn");

const initialCards = [
  {
    name: "Ibiza",
    link: "https://plus.unsplash.com/premium_photo-1697730002753-6772fea94e55?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Dubai",
    link: "https://images.unsplash.com/photo-1732530365779-dbf5bdf4bc63?q=80&w=2160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Tokyo",
    link: "https://plus.unsplash.com/premium_photo-1661914240950-b0124f20a5c1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Rome",
    link: "https://plus.unsplash.com/premium_photo-1675975706513-9daba0ec12a8?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Rio de Janeiro",
    link: "https://plus.unsplash.com/premium_photo-1671211307997-f4f552b0601c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Paris",
    link: "https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// function handleOpenForm() {
//   profileFormElement.classList.add("modal_opened");
//   nameInput.value = profileNameElement.textContent;
//   jobInput.value = profileJobElement.textContent;
// }

function handleOpenModal(modal) {
  modal.classList.add("modal_opened");
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
}

function handleCloseModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  handleCloseModal(profileFormElement);
  evt.preventDefault();
}

function renderCards() {
  initialCards.forEach((card) => {
    cardsListElement.append(getCardElementData(card));
  });
}

function renderNewCard(card) {
  cardsListElement.prepend(getCardElementData(card));
}

function handleNewPostSubmit(evt) {
  initialCards.splice(0, 0, {
    link: linkInput.value,
    name: captionInput.value,
  });
  renderNewCard(initialCards[0]);
  handleCloseModal(newPostFormElement);
  evt.preventDefault();
}

function getCardElementData(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  let cardImageElement = cardElement.querySelector(".card__image");
  let cardTitleElement = cardElement.querySelector(".card__description");
  let cardLikeButton = cardElement.querySelector(".card__like-btn");
  let cardDeleteButton = cardElement.querySelector(".card__delete-btn");
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  cardTitleElement.textContent = data.name;
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-btn_liked");
  });
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

renderCards();

editButton.addEventListener("click", () => {
  handleOpenModal(profileFormElement);
});

closeProfileButton.addEventListener("click", () => {
  handleCloseModal(profileFormElement);
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

newProfileButton.addEventListener("click", () => {
  handleOpenModal(newPostFormElement);
});

closePostButton.addEventListener("click", () => {
  handleCloseModal(newPostFormElement);
});

newPostFormElement.addEventListener("submit", handleNewPostSubmit);
