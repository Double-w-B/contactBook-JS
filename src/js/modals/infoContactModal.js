import * as main from "../main.js";
import * as ui from "../ui.js";
import { createContactInfoModal } from "./constructor.js";

export const infoContactModal = () => {
  main.listOfContacts.addEventListener("click", handleListClick);

  function openModal() {
    ui.handleModalVisibility(main.modalContactInfo, true);
  }
  function closeModal() {
    ui.handleModalVisibility(main.modalContactInfo, false);
  }

  function handleListClick(e) {
    if (!e.target.className || e.target.className !== "fullName") return;

    function copyEmail(e) {
      const email = e.target.previousSibling.textContent.trim();
      navigator.clipboard.writeText(email);
      copyInfo.classList.add("show");

      setTimeout(() => {
        copyInfo.classList.remove("show");
      }, 700);
    }

    const contactId = e.target.closest("li").id;
    const contact = main.data.contacts.find(
      (person) => contactId === person._id
    );

    openModal();
    createContactInfoModal(contact);

    const copyInfo = document.querySelector(".copied");
    const copyButton = document.querySelector(".fa-copy");
    const closeButton = document.querySelector(".bottom_info-close-btn");

    copyButton?.addEventListener("click", copyEmail);
    closeButton.addEventListener("click", closeModal);
  }
};
