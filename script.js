const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");
const navigationLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");
const currentYear = document.getElementById("current-year");
const resumeItems = document.querySelectorAll(".resume-item");
const resumeModal = document.getElementById("resume-modal");
const resumeModalTitle = document.getElementById("resume-modal-title");
const resumeModalDate = document.getElementById("resume-modal-date");
const resumeModalCompany = document.getElementById("resume-modal-company");
const resumeModalLocation = document.getElementById("resume-modal-location");
const resumeModalCopy = document.getElementById("resume-modal-copy");
const resumeModalClose = resumeModal ? resumeModal.querySelector(".resume-modal-close") : null;
const interestItems = document.querySelectorAll(".interest-item");
const interestModal = document.getElementById("interest-modal");
const interestModalTitle = document.getElementById("interest-modal-title");
const interestModalCopy = document.getElementById("interest-modal-copy");
const interestModalClose = interestModal ? interestModal.querySelector(".interest-modal-close") : null;

let lastFocusedResumeItem = null;
let lastFocusedInterestItem = null;

function closeMenu() {
  if (!menuToggle || !navigation) return;

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  navigation.classList.remove("open");
  document.body.classList.remove("menu-open");
}

function openResumeModal(item) {
  if (!resumeModal) return;

  lastFocusedResumeItem = item;
  resumeModalTitle.textContent = item.dataset.resumeTitle;
  resumeModalDate.textContent = item.dataset.resumeDate;
  resumeModalCompany.textContent = item.dataset.resumeCompany;
  resumeModalLocation.textContent = item.dataset.resumeLocation;
  resumeModalCopy.innerHTML = item.querySelector(".resume-modal-description").innerHTML;

  resumeModal.classList.add("open");
  resumeModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  resumeModalClose?.focus();
}

function closeResumeModal() {
  if (!resumeModal) return;

  resumeModal.classList.remove("open");
  resumeModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  lastFocusedResumeItem?.focus();
}

function openInterestModal(item) {
  if (!interestModal) return;

  lastFocusedInterestItem = item;
  interestModalTitle.textContent = item.dataset.interestTitle;
  interestModalCopy.innerHTML = `<p>${item.querySelector("p")?.textContent || ""}</p>`;

  interestModal.classList.add("open");
  interestModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  interestModalClose?.focus();
}

function closeInterestModal() {
  if (!interestModal) return;

  interestModal.classList.remove("open");
  interestModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  lastFocusedInterestItem?.focus();
}

resumeItems.forEach((item) => {
  item.addEventListener("click", () => openResumeModal(item));

  item.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openResumeModal(item);
  });
});

resumeModal?.addEventListener("click", (event) => {
  if (event.target.closest("[data-resume-close]")) closeResumeModal();
});

interestItems.forEach((item) => {
  item.addEventListener("click", () => openInterestModal(item));

  item.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openInterestModal(item);
  });
});

interestModal?.addEventListener("click", (event) => {
  if (event.target.closest("[data-interest-close]")) closeInterestModal();
});

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });
}

navigationLinks.forEach((link) => link.addEventListener("click", closeMenu));

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navigationLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-30% 0px -60%", threshold: 0 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeMenu();
  closeResumeModal();
  closeInterestModal();
});

if (currentYear) currentYear.textContent = String(new Date().getFullYear());
