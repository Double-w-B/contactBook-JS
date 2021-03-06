import * as mainModule from "./main.js";
import { selectIcons } from "./selectIcons.js";
import { infoContactModal } from "./modals/infoContactModal.js";
import { removeContactModal } from "./modals/removeContactModal.js";
import { editContactModal } from "./modals/editContactModal.js";
import { showAllContacts } from "./showAllContacts.js";

const findMatches = (wordToMatch, peopleData) => {
  return peopleData.filter((person) => {
    const regex = new RegExp(wordToMatch, "gi");
    return (
      person.name.match(regex) ||
      person.surname.match(regex) ||
      person.phone.match(regex)
    );
  });
};

export const displayMatches = () => {
  const matchArray = findMatches(
    mainModule.searchInput.value,
    mainModule.peopleData
  );
  const sortedMatchArray = matchArray.sort((a, b) =>
    a.name > b.name ? 1 : -1
  );
  const matchPeople = sortedMatchArray
    .map((person) => {
      const { name, surname, phone, mail } = person;

      return `
                    <li>
                    <ul class="contact-list">
                    <li id="${phone}" class="one-child" >
                    
                    <div class='contact-img no-select'>
                    <i class='fas fa-check'></i>
                    <i class='fas fa-check hover hide'></i>
                    ${name.slice(0, 1)}${surname.slice(0, 1)}
                    </div>
                    <div class='contact'>
                    <p>${name} ${surname}</p>
                    <p><i class="fas fa-phone-alt"></i>
                    ${phone.replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, " ")}
                    </p>
                    </div>
                    <div class="submenu-icon">
                    <img src="../icons/arrowDown.svg" alt="icon" />
                    </div>
                    <div class="submenu">
                    <button class="editCon">Edit</button>
                    <a href = "mailto:${mail}">
                    <button class="sendEm">Send email</button></a>
                    <button class="deleteCon">Delete</button>
                    </div>

                    </li>
                   
                    </ul></li>`;
    })
    .join("");

  mainModule.contactsAmount.innerHTML = `<p>Contacts: ${matchArray.length}</p>`;

  if (!mainModule.searchInput.value) {
    showAllContacts();
  } else {
    matchArray.length > 0 && (mainModule.contacts.innerHTML = matchPeople);
  }

  if (matchArray.length === 0 && mainModule.peopleData.length > 0) {
    mainModule.contacts.innerHTML = `<div class="add-contact-info">
            <div class="info-img no-select"><i class="fas fa-search"></i></div>
            <div class="info-text no-select">It looks like there aren't any matches for your search</div>
            </div>`;
    mainModule.contactsAmount.innerHTML = `<p>Contacts: ${matchArray.length}</p>`;
  }

  selectIcons();
  editContactModal();
  infoContactModal();
  removeContactModal();
};
