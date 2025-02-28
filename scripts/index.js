const editButton = document.querySelector(".profile__edit-btn");

const closeButton = document.querySelector(".form__close-btn");

const profileFormElement = document.querySelector("#edit-modal");

const submitButton = profileFormElement.querySelector(".form__save-btn");

let nameInput = profileFormElement.querySelector("#name");

let jobInput = profileFormElement.querySelector("#description");

let profileNameElement = document.querySelector(".profile__title");

let profileJobElement = document.querySelector(".profile__description");

function handleOpenForm() {
  profileFormElement.classList.add("modal_opened");
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
}

function handleCloseForm() {
  profileFormElement.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  profileFormElement.classList.remove("modal_opened");
  evt.preventDefault();
}

// const initialCards = [
//   {
//     name: "Ibiza"
//     link: "https://plus.unsplash.com/premium_photo-1697730002753-6772fea94e55?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//   }
//   {
//     name: "Dubai"
//     link: "https://images.unsplash.com/photo-1732530365779-dbf5bdf4bc63?q=80&w=2160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//   }
//   {
//     name: "Tokyo"
//     link: "https://plus.unsplash.com/premium_photo-1661914240950-b0124f20a5c1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//   }
//   {
//     name: "Rome"
//     link: "https://plus.unsplash.com/premium_photo-1675975706513-9daba0ec12a8?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//   }
//   {
//     name: "Rio de Janeiro"
//     link: "https://plus.unsplash.com/premium_photo-1671211307997-f4f552b0601c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//   }
//   {
//     name: "Paris"
//     link: "https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//   }
// ]

editButton.addEventListener("click", handleOpenForm);
closeButton.addEventListener("click", handleCloseForm);
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
