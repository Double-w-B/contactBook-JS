import * as main from "../main.js";
import { deleteSingleContactFromDB } from "../fetch/index.js";
import { createRemoveSingleContactModal } from "./constructor.js";
import * as ui from "../ui.js";

export const removeSingleContactModal = () => {
  main.listOfContacts.addEventListener("click", handleListClick);

  function openModal() {
    ui.handleModalVisibility(main.modalContactRemove, true);
  }
  function closeModal() {
    ui.handleModalVisibility(main.modalContactRemove, false);
  }

  function handleListClick(e) {
    if (!e.target.className || e.target.className !== "deleteCon") return;

    const contactId = e.target.closest(".one-child").id;
    const contact = main.data.contacts.find(
      (person) => person._id === contactId
    );
    const { name, surname } = contact;
    const contactFullName = name + " " + surname;

    function deleteContact() {
      const methods = { handleIsLoading, closeModal };
      deleteSingleContactFromDB(contactId, methods);
    }

    function handleIsLoading(boolean) {
      loadingIcon.classList.toggle("show", boolean);
      deleteButton.classList.toggle("disable", boolean);
    }

    openModal();
    createRemoveSingleContactModal(contactFullName);

    const deleteButton = document.querySelector(".confirm-delete");
    const cancelButton = document.querySelector(".confirm-cancel");
    const loadingIcon = document.querySelector(".confirm-btns .loadingIcon");

    deleteButton.addEventListener("click", deleteContact);
    cancelButton.addEventListener("click", closeModal);
  }
};
