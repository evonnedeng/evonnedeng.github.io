/* =================================
   Skills popup
================================= */

const skillTabs = document.querySelectorAll(".skill-tab");
const skillModal = document.getElementById("skill-modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalClose = document.getElementById("modal-close");

let lastClickedSkill = null;


/* Open the popup */

function openSkillModal(skill) {
  const title = skill.dataset.title;
  const description = skill.dataset.description;

  lastClickedSkill = skill;

  modalTitle.textContent = title;
  modalDescription.textContent = description;

  skillModal.classList.add("open");
  skillModal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";

  modalClose.focus();
}


/* Close the popup */

function closeSkillModal() {
  skillModal.classList.remove("open");
  skillModal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

  if (lastClickedSkill) {
    lastClickedSkill.focus();
  }
}


/* Add click event to every skill tab */

skillTabs.forEach((skill) => {
  skill.addEventListener("click", () => {
    openSkillModal(skill);
  });
});


/* Close button */

modalClose.addEventListener("click", closeSkillModal);


/* Close when clicking outside the white popup */

skillModal.addEventListener("click", (event) => {
  if (event.target === skillModal) {
    closeSkillModal();
  }
});


/* Close when pressing Escape */

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    skillModal.classList.contains("open")
  ) {
    closeSkillModal();
  }
});


/* =================================
   Active navigation
================================= */

const sections = document.querySelectorAll(
  "main section[id]"
);

const navigationLinks = document.querySelectorAll(
  ".nav-links a"
);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const activeSection = entry.target.id;

      navigationLinks.forEach((link) => {
        const linkSection = link
          .getAttribute("href")
          .replace("#", "");

        if (linkSection === activeSection) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    });
  },
  {
    threshold: 0.35
  }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});


/* =================================
   Close mobile navigation behavior
   and smooth scrolling
================================= */

navigationLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetID = link.getAttribute("href");
    const targetSection = document.querySelector(targetID);

    if (!targetSection) {
      return;
    }

    event.preventDefault();

    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});