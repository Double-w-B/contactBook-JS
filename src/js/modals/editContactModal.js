import * as main from "../main.js";
import * as utils from "../utils.js";
import { validation } from "../validation.js";
import * as fetchData from "../fetch/index.js";
import { userImage } from "./addContactModal.js";
import { createEditContactModalContent } from "./constructor.js";

export const editContactModal = () => {
  main.listOfContacts.addEventListener("click", handleListClick);

  function openModal() {
    main.modalBackdrop.classList.add("open-modal");
    main.modalContactAddEdit.classList.add("open-modal");
  }
  function closeModal() {
    main.modalBackdrop.classList.remove("open-modal");
    main.modalContactAddEdit.classList.remove("open-modal");
    fetchData.removeUnsavedImageFromDB();
    fetchData.getAllContacts();
  }

  function handleListClick(e) {
    if (!e.target.className || e.target.className !== "editCon") return;

    function handleAddImage() {
      function loadLogic() {
        const inputImage = document.querySelector("input[type=file]").files[0];

        utils.addImage(reader);
        imgSrc = reader.result;
        imgName = `../${inputImage.name}`;

        const contactImage = new FormData();
        contactImage.append("image", inputImage);
        fetchData.uploadContactImage(contactImage);
      }

      imgInputLabel.classList.add("disable");
      const reader = new FileReader();
      reader.addEventListener("load", loadLogic);
      reader.readAsDataURL(imgInput.files[0]);
    }

    function handleRemoveImage() {
      if (imgCloudinaryId.startsWith("undefined")) {
        fetchData.removeContactImage(userImage.cloudinaryImgId);
      } else {
        fetchData.removeContactImage(imgCloudinaryId, contactId);
      }
      imgInputLabel.classList.remove("disable");
      utils.removeImage();
      imgSrc = "";
      imgName = "";
    }

    function saveChanges() {
      const contactsNumbers = main.data.contacts.map((person) => person._id);

      validation(inputName, inputSurname, inputPhone, inputEmail);

      if (
        inputName.value &&
        inputSurname.value &&
        !inputName.value.match(utils.textRegExp) &&
        !inputSurname.value.match(utils.textRegExp) &&
        inputPhone.value.match(/^[0-9]+$/) &&
        inputPhone.value.length >= 6 &&
        (!inputEmail.value || inputEmail.value.match(utils.emailRegExp)) &&
        ((contactsNumbers.includes(inputPhone.value) &&
          inputPhone.value === contactId) ||
          (!contactsNumbers.includes(inputPhone.value) &&
            inputPhone.value !== contactId))
      ) {
        inputPhone.classList.remove("invalid-input");
        const siblingElement = [...inputPhone.parentElement.children].find(
          (el) => el.className === "error-hint"
        );
        siblingElement.remove("invalid-input");

        const newContact = new utils.Person(
          inputName.value.toLowerCase(),
          inputSurname.value.toLowerCase(),
          inputPhone.value,
          inputEmail.value.toLowerCase(),
          inputAddress.value,
          inputNotes.value,
          imgSrc,
          imgName
        );
        fetchData.updateContact(newContact, contactId, closeModal);
      } else {
        return;
      }
    }

    const contactId = e.target.closest(".one-child").id;
    const contact = main.data.contacts.find(
      (person) => person._id === contactId
    );
    const { name, surname, phone, email, address, notes, img } = contact;

    openModal();
    createEditContactModalContent(img.name, img.src);

    const inputName = document.getElementById("name");
    const inputSurname = document.getElementById("surname");
    const inputPhone = document.getElementById("phone");
    const inputEmail = document.getElementById("email");
    const inputAddress = document.getElementById("address");
    const inputNotes = document.getElementById("notes");
    const imgInput = document.querySelector("input[type=file]");
    const imgInputLabel = document.querySelector(".avatar-container label");
    const imgRemoveBtn = document.querySelector(".avatar-container .fa-times");

    const imgIdFirstPart = img.src.split("/").at(-2);
    const imgIdSecondPart = img.src.split("/").at(-1).split(".")[0];
    const imgCloudinaryId = imgIdFirstPart + "/" + imgIdSecondPart;

    const saveButton = document.querySelector(".save");
    const cancelButton = document.querySelector(".cancel");

    let imgSrc = img.src;
    let imgName = img.name;

    inputName.value = name;
    inputSurname.value = surname;
    inputPhone.value = phone;
    inputEmail.value = email;
    inputAddress.value = address;
    inputNotes.value = notes;

    imgInput.addEventListener("change", handleAddImage);
    imgRemoveBtn.addEventListener("click", handleRemoveImage);
    saveButton.addEventListener("click", saveChanges);
    cancelButton.addEventListener("click", closeModal);
  }
};
