const form = document.querySelector("#signup-form");
const fields = [...form.querySelectorAll("input, select")];
const password = document.querySelector("#password");
const passwordConfirmation = document.querySelector("#password-confirmation");
const statusMessage = document.querySelector("#form-status");
const signupCard = document.querySelector("#signup-card");
const introPanel = document.querySelector(".intro-panel");
const formPanel = document.querySelector(".form-panel");
const showFormButton = document.querySelector("#show-form");
const showCoverButton = document.querySelector("#show-cover");

const validators = {
  email: (field) => {
    if (field.validity.valueMissing) return "Please enter your email address.";
    if (field.validity.typeMismatch) return "Please enter a valid email address.";
    return "";
  },
  country: (field) =>
    field.validity.valueMissing ? "Please select your country." : "",
  postalCode: (field) => {
    if (field.validity.valueMissing) return "Please enter your postal code.";
    if (field.validity.tooShort) return "Postal code must be at least 3 characters.";
    if (!/^[a-z0-9 -]+$/i.test(field.value)) {
      return "Use only letters, numbers, spaces, or hyphens.";
    }
    return "";
  },
  password: (field) => {
    if (field.validity.valueMissing) return "Please create a password.";
    if (field.validity.tooShort) return "Password must be at least 8 characters.";
    return "";
  },
  passwordConfirmation: (field) => {
    if (field.validity.valueMissing) return "Please confirm your password.";
    if (field.value !== password.value) return "Passwords do not match.";
    return "";
  },
};

function showForm() {
  signupCard.classList.add("form-visible");
  introPanel.inert = true;
  formPanel.inert = false;
  window.setTimeout(() => fields[0].focus(), 550);
}

function showCover() {
  signupCard.classList.remove("form-visible");
  formPanel.inert = true;
  introPanel.inert = false;
  showFormButton.focus();
}

formPanel.inert = true;
showFormButton.addEventListener("click", showForm);
showCoverButton.addEventListener("click", showCover);

function validateField(field) {
  const validator = validators[field.name];
  const message = validator ? validator(field) : "";
  const errorMessage = document.querySelector(`#${field.id}-error`);

  field.setCustomValidity(message);
  field.classList.toggle("user-invalid", Boolean(message));
  field.classList.toggle("user-valid", !message && field.value.length > 0);
  field.setAttribute("aria-invalid", String(Boolean(message)));
  errorMessage.textContent = message;
  return !message;
}

fields.forEach((field) => {
  field.addEventListener("blur", () => validateField(field));
  field.addEventListener("input", () => {
    validateField(field);
    if (field === password && passwordConfirmation.value) {
      validateField(passwordConfirmation);
    }
  });
  field.addEventListener("change", () => validateField(field));
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  statusMessage.textContent = "";

  const isValid = fields.every((field) => validateField(field));
  if (!isValid) {
    const firstInvalidField = fields.find((field) => !field.validity.valid);
    firstInvalidField.focus();
    statusMessage.textContent = "Please fix the highlighted fields and try again.";
    statusMessage.style.color = "var(--danger)";
    return;
  }

  statusMessage.textContent = "High five! Your account is ready to go.";
  statusMessage.style.color = "var(--success)";
  form.reset();
  fields.forEach((field) => {
    field.classList.remove("user-valid");
    field.setAttribute("aria-invalid", "false");
  });
});