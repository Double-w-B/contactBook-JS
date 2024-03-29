import * as main from "./main.js";
import * as utils from "./utils.js";
import { logoutUser } from "./fetch/index.js";

/* Dark/Light mode */
export const themeMode = () => {
  const icon = main.menuChangeModeBtn.querySelector("i");

  function changeContent(iClass, txt) {
    setTimeout(() => {
      icon.className = `fa-solid ${iClass}`;
      main.menuChangeModeBtn.childNodes[1].textContent = txt;
    }, 250);
  }

  if (localStorage.theme === "dark-mode") {
    document.body.className = "light-mode";
    localStorage.theme = document.body.className;
    changeContent("fa-moon", "Dark theme");
  } else {
    document.body.className = "dark-mode";
    localStorage.theme = document.body.className;
    changeContent("fa-sun", "Light theme");
  }
};

export function showMenuOptions(e) {
  if (e.target.closest("li").classList.contains("active")) {
    return e.target.closest("li").classList.remove("active");
  }

  main.menuAllOptions.forEach((option) => option.classList.remove("active"));
  e.target.closest("li").classList.toggle("active");
}

/* Scroll To */
export const scrollTo = (e) => {
  e.preventDefault();

  if (e.target.hasAttribute("href")) {
    const id = e.target.getAttribute("href").slice(1);

    if (document.getElementById(id) === null) return;

    const element = document.getElementById(id);
    let position = element.offsetTop - 15;

    main.list.scrollTo({
      left: 0,
      top: position,
    });
  }
};

/* Hide scrollbar */
export const hideScrollbarThumb = () => {
  main.list.classList.add("move");
  setTimeout(() => {
    main.list.classList.remove("move");
  }, 700);
};

/* Hide menu */
export const hideMenu = (e) => {
  if (
    main.menu.classList.contains("show-menu") &&
    !e.target.closest(".nav__btn--menu") &&
    !e.target.closest(".menu__btn--select") &&
    !e.target.closest(".menu__btn--unselect") &&
    !e.target.closest(".menu__btn--account") &&
    !e.target.closest(".menu__btn--contacts") &&
    !e.target.closest(".menu__btn--remove")
  ) {
    main.menu.classList.remove("show-menu");
    main.navHintIcon.classList.remove("opacity");
    main.menuAllOptions.forEach((option) => option.classList.remove("active"));
  }
};

/* Show/Hide menu */
export const handleMenuButton = () => {
  main.menuAllOptions.forEach((option) => option.classList.remove("active"));
  main.menu.classList.toggle("show-menu");
  main.navHintIcon.classList.toggle("opacity");
};

/* Select icons */
export const selectIcons = () => {
  const contactImg = document.querySelectorAll(".contact-img");

  /* Add check icon */
  contactImg.forEach((img) =>
    img.addEventListener("click", () => {
      img.firstElementChild.classList.toggle("show-checked");
      if (img.firstElementChild.classList.contains("show-checked")) {
        img.children[1].classList.add("hide");
      } else {
        utils.deviceType() === "desktop" &&
          img.children[1].classList.remove("hide");
      }
    })
  );

  /* Show icon on hover if user not using mobile device  */
  if (utils.deviceType() === "desktop") {
    main.listOfContacts.addEventListener("mouseover", (e) => {
      if (
        e.target.classList.contains("hover") &&
        !e.target.previousElementSibling.classList.contains("show-checked")
      )
        e.target.classList.remove("hide");
    });

    /* Hide icon on mouseleave */
    contactImg.forEach((img) => {
      img.addEventListener("mouseleave", () => {
        img.children[1].classList.add("hide");
      });
    });
  }
};

/* Select all and Unselect All buttons */
export const handleSelection = (type) => {
  const contactImg = document.querySelectorAll(".contact-img");
  if (type === "selectAll") {
    contactImg.forEach((img) =>
      img.firstElementChild.classList.add("show-checked")
    );
  } else {
    contactImg.forEach((img) =>
      img.firstElementChild.classList.remove("show-checked")
    );
  }
};

/* Modal visibility */
export const handleModalVisibility = (element, boolean) => {
  main.modalBackdrop.classList.toggle("open-modal", boolean);
  element.classList.toggle("open-modal", boolean);
};

/* Open Auth modal / Logout */
export const openAuthModal = () => {
  main.navHintIcon.classList.add("hide");

  if (main.menuAuthBtn.textContent === "Log in") {
    handleModalVisibility(main.modalAuth, true);
  } else {
    logoutUser();
  }
};
/* Open UpdateData Modal */
export const openUpdateDataModal = () => {
  handleModalVisibility(main.modalUpdateData, true);
};
/* Open Remove Account Modal */
export const openRemoveAccountModal = () => {
  handleModalVisibility(main.modalAccountRemove, true);
};

/* Window resize */
export const checkWindowResize = () => {
  if (window.innerWidth <= 768 && window.innerWidth > 480) {
    main.navNewContactBtn.lastChild.textContent = "Add";
    main.navAllContactsBtn.lastChild.textContent = "List";
    return;
  }
  if (window.innerWidth <= 480) {
    main.navNewContactBtn.lastChild.textContent = "";
    main.navAllContactsBtn.lastChild.textContent = "";
    return;
  }
  main.navNewContactBtn.lastChild.textContent = "Add New";
  main.navAllContactsBtn.lastChild.textContent = "List";
};
