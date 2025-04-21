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
import editAvatarSrc from "../images/Group2.svg";
import { renderLoading, handleSubmit } from "../utils/utils.js";

const headerLogo = document.getElementById("header-logo");
headerLogo.src = headerSrc;
const profileImg = document.getElementById("profile-img");
const editIcon = document.getElementById("edit-profile-icon");
editIcon.src = editProfileSrc;
const newIcon = document.getElementById("new-profile-icon");
newIcon.src = newProfileSrc;
const editButton = document.querySelector(".profile__edit-btn");
const editAvatarIcon = document.getElementById("edit-avatar-icon");
editAvatarIcon.src = editAvatarSrc;

const editAvatarButton = document.querySelector(".profile__edit-avatar-btn");

const profileFormElement = document.querySelector("#edit-modal");

const nameInput = profileFormElement.querySelector("#name");

const jobInput = profileFormElement.querySelector("#description");

const profileNameElement = document.querySelector(".profile__title");

const profileJobElement = document.querySelector(".profile__description");

const cardTemplate = document.querySelector("#card-template");

const cardsListElement = document.querySelector(".cards__list");

const newProfileButton = document.querySelector(".profile__new-btn");

const newPostFormElement = document.querySelector("#post-modal");

const linkInput = document.querySelector("#link");

const captionInput = document.querySelector("#caption");

const previewModal = document.querySelector("#preview-modal");

const previewImageElement = previewModal.querySelector(".modal__img");

const previewCaption = previewModal.querySelector(".modal__caption");

const deleteModal = document.querySelector("#delete-modal");

const deleteForm = document.forms["delete-form"];

const cancelButton = deleteModal.querySelector(".modal__delete-btn_cancel");

const avatarModal = document.querySelector("#avatar-modal");

const avatarFormElement = document.forms["avatar-form"];

const avatarInput = avatarModal.querySelector("#avatar");

const avatarSubmitButton = avatarFormElement.querySelector(".modal__save-btn");

let selectedCard;
let selectedCardId;

const newPostSubmitButton =
  newPostFormElement.querySelector(".modal__save-btn");

const modalsList = Array.from(document.querySelectorAll(".modal"));

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
    console.error(err);
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
  function makeRequest() {
    return api
      .editUserInfo({ name: nameInput.value, about: jobInput.value })
      .then((userData) => {
        profileNameElement.textContent = userData.name;
        profileJobElement.textContent = userData.about;
        handleCloseModal(profileFormElement);
      });
  }
  handleSubmit(makeRequest, evt);
}

function handleNewPostSubmit(evt) {
  function makeRequest() {
    return api.postNewCard(captionInput.value, linkInput.value).then((res) => {
      const cardElement = getCardElementData(res);
      cardsListElement.prepend(cardElement);
      evt.target.reset();
      disableButton(newPostSubmitButton, settings);
      handleCloseModal(newPostFormElement);
    });
  }
  handleSubmit(makeRequest, evt);
}

function handleAvatarSubmit(evt) {
  function makeRequest() {
    return api.editUserAvatar(avatarInput.value).then((data) => {
      profileImg.src = data.avatar;
      handleCloseModal(avatarModal);
      evt.target.reset();
      disableButton(avatarSubmitButton, settings);
    });
  }
  handleSubmit(makeRequest, evt);
}

function handleDeleteSubmit(evt) {
  function makeRequest() {
    return api.removeCard(selectedCardId).then(() => {
      selectedCard.remove();
      handleCloseModal(deleteModal);
    });
  }
  handleSubmit(makeRequest, evt, "Deleting...");
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
      .then(() => {
        selectedBtn.classList.add("card__like-btn_liked");
      })
      .catch((err) => console.error(err));
  } else {
    api
      .removeLike(selectedCardId)
      .then(() => {
        selectedBtn.classList.remove("card__like-btn_liked");
      })
      .catch((err) => console.error(err));
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

  if (data.isLiked) {
    cardLikeButton.classList.add("card__like-btn_liked");
  }

  cardLikeButton.addEventListener("click", () => {
    handleLikeClick(cardElement, cardLikeButton, data);
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

function setCloseButtonListeners() {
  const closeButtons = document.querySelectorAll(".modal__close-btn");
  closeButtons.forEach((button) => {
    const popup = button.closest(".modal");
    button.addEventListener("click", () => handleCloseModal(popup));
  });
}

setModalCloseListeners();
setCloseButtonListeners();

editAvatarButton.addEventListener("click", () => {
  handleOpenModal(avatarModal);
});

editButton.addEventListener("click", () => {
  handleOpenModal(profileFormElement);
  resetValidation(profileFormElement, [nameInput, jobInput], settings);
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

newProfileButton.addEventListener("click", () => {
  handleOpenModal(newPostFormElement);
});

cancelButton.addEventListener("click", () => {
  handleCloseModal(deleteModal);
});

newPostFormElement.addEventListener("submit", handleNewPostSubmit);

deleteForm.addEventListener("submit", handleDeleteSubmit);

avatarFormElement.addEventListener("submit", handleAvatarSubmit);

enableValidation(settings);
