import "./index.css";
import {
  resetValidation,
  disableButton,
  enableValidation,
  settings,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";
import headerSrc from "../images/header_logo.svg";
import editProfileSrc from "../images/edit-profile-icon.svg";
import newProfileSrc from "../images/add-icon.svg";

const headerLogo = document.getElementById("header-logo");
headerLogo.src = headerSrc;
const profileImg = document.getElementById("profile-img");
const editIcon = document.getElementById("edit-profile-icon");
editIcon.src = editProfileSrc;
const newIcon = document.getElementById("new-profile-icon");
newIcon.src = newProfileSrc;
const editButton = document.querySelector(".profile__edit-btn");

const closeProfileButton = document.querySelector(".modal__close-btn");

const profileFormElement = document.querySelector("#edit-modal");

const profileSubmitButton =
  profileFormElement.querySelector(".modal__save-btn");

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

const previewModal = document.querySelector("#preview-modal");

const previewImageElement = previewModal.querySelector(".modal__img");

const previewCloseButton = previewModal.querySelector(".modal__close-btn");

const previewCaption = previewModal.querySelector(".modal__caption");

const deleteModal = document.querySelector("#delete-modal");

const deleteForm = document.forms[2];

const deleteButton = deleteModal.querySelector(".modal__delete-btn_delete");

const cancelButton = deleteModal.querySelector(".modal__delete-btn_cancel");

const closeDeletebutton = deleteModal.querySelector(".modal__close-btn");

let selectedCard;
let selectedCardId;

const newPostSubmitButton =
  newPostFormElement.querySelector(".modal__save-btn");

const modalsList = Array.from(document.querySelectorAll(".modal"));

// const initialCards = [
//   {
//     name: "Golden Gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
//   {
//     name: "Dubai",
//     link: "https://images.unsplash.com/photo-1732530365779-dbf5bdf4bc63?q=80&w=2160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     name: "Tokyo",
//     link: "https://plus.unsplash.com/premium_photo-1661914240950-b0124f20a5c1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     name: "Rome",
//     link: "https://plus.unsplash.com/premium_photo-1675975706513-9daba0ec12a8?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     name: "Rio de Janeiro",
//     link: "https://plus.unsplash.com/premium_photo-1671211307997-f4f552b0601c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     name: "Paris",
//     link: "https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "3a6ee566-6806-49c1-b2d5-f8c291a34de7",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, user]) => {
    cards.forEach((card) => {
      cardsListElement.append(getCardElementData(card));
    });
    profileNameElement.textContent = user.name;
    profileJobElement.textContent = user.about;
    profileImg.src = user.avatar;
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

function handleEscape(evt) {
  if (evt.key == "Escape") {
    modalsList.forEach((modal) => {
      if (modal.classList.contains("modal_opened")) {
        handleCloseModal(modal);
      }
    });
  }
}

function enableEsc() {
  document.addEventListener("keydown", handleEscape);
}

function disableEsc() {
  document.removeEventListener("keydown", handleEscape);
}

function handleOpenModal(modal) {
  modal.classList.add("modal_opened");
  enableEsc();
}

function handleCloseModal(modal) {
  modal.classList.remove("modal_opened");
  disableEsc();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const patch = { name: nameInput.value, about: jobInput.value };
  api.editUserInfo(patch).then((data) => {
    profileNameElement.textContent = data.name;
    profileJobElement.textContent = data.about;
  });
  handleCloseModal(profileFormElement);
}

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  api
    .postNewCard(captionInput.value, linkInput.value)
    .then((res) => {
      console.log("Server response:", res);
      const cardElement = getCardElementData(res);
      console.log("cardElement:", cardElement);
      cardsListElement.prepend(cardElement);
    })
    .catch((err) => {
      console.log("Error creating card:", err);
    })
    .finally(() => {
      evt.target.reset();
      disableButton(newPostSubmitButton, settings);
      handleCloseModal(newPostFormElement);
    });
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  api.removeCard(selectedCardId).then(selectedCard.remove());
  handleCloseModal(deleteModal);
}

function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  handleOpenModal(deleteModal);
}

function handleLikeClick(cardElement, btnElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  let selectedBtn = btnElement;

  if (!selectedBtn.classList.contains("card__like-btn_liked")) {
    api
      .likeCard(selectedCardId)
      .then(selectedBtn.classList.add("card__like-btn_liked"));
  } else {
    api
      .removeLike(selectedCardId)
      .then(selectedBtn.classList.remove("card__like-btn_liked"));
  }
}

function getCardElementData(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__description");
  const cardLikeButton = cardElement.querySelector(".card__like-btn");
  const cardDeleteButton = cardElement.querySelector(".card__delete-btn");

  cardImageElement.src = data.link;
  cardImageElement.alt = `${data.name} pic`;
  cardTitleElement.textContent = data.name;
  // YOU ARE HERE!!!!!!!!!!!!!!!!!!!!
  cardLikeButton.addEventListener("click", () => {
    handleLikeClick(cardElement, cardLikeButton, data);
    // cardLikeButton.classList.toggle("card__like-btn_liked");
  });
  cardDeleteButton.addEventListener("click", () =>
    handleDeleteCard(cardElement, data)
  );
  cardImageElement.addEventListener("click", () => {
    previewImageElement.src = cardImageElement.src;
    previewImageElement.alt = `${cardTitleElement.textContent} pic`;
    previewCaption.textContent = cardTitleElement.textContent;
    handleOpenModal(previewModal);
  });

  return cardElement;
}

function setModalCloseListeners() {
  modalsList.forEach((modal) => {
    modal.addEventListener("click", (evt) => {
      if (evt.target == modal) {
        handleCloseModal(modal);
      }
    });
  });
}

previewCloseButton.addEventListener("click", () => {
  handleCloseModal(previewModal);
});

setModalCloseListeners();

editButton.addEventListener("click", () => {
  handleOpenModal(profileFormElement);
  resetValidation(profileFormElement, [nameInput, jobInput], settings);
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
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

closeDeletebutton.addEventListener("click", () => {
  handleCloseModal(deleteModal);
});

cancelButton.addEventListener("click", () => {
  handleCloseModal(deleteModal);
});

newPostFormElement.addEventListener("submit", handleNewPostSubmit);

deleteForm.addEventListener("submit", handleDeleteSubmit);

enableValidation(settings);
