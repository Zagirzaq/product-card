import { Modal } from './Modal.js';
import { Form } from './Form.js';

const getFormData = (form) => {
  const formData = new FormData(form);
  return Object.fromEntries(formData.entries());
};

const validateEmail = (email) => {
  const formatRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !formatRegex.test(email)) return false;
  const domainRegex = /\.(com|ru|net|org|ua|by|kz)$/;
  return domainRegex.test(email);
};

const emailForm = document.querySelector(".email-form");
emailForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.target,
        data = getFormData(form),
        email = data.email?.trim();
  if (!validateEmail(email)) {
    alert('Пожалуйста, введите email с доменом .com, .ru, .net, .org, .ua, .by или .kz');
    return;
  }
  console.log({ email: email });
});

const registrationModal = new Modal('registrationModal');
const registrationForm = new Form('registrationForm');

const btnOpenModal = document.getElementById("openRegistration");
const overlay = document.querySelector('.overlay');

let user = null;

btnOpenModal.addEventListener('click', () => registrationModal.open());

overlay.addEventListener('click', () => registrationModal.close());

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && registrationModal.isOpen()) {
    registrationModal.close();
  }
});

const passwordInput = registrationForm.form.querySelector('#password');
const confirmPasswordInput = registrationForm.form.querySelector('#repeatPassword');

const validatePasswordMatch = () => {
  if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordInput.setCustomValidity('Пароли не совпадают');
  } else {
    confirmPasswordInput.setCustomValidity('');
  }
};

if (confirmPasswordInput) {
  confirmPasswordInput.addEventListener('input', validatePasswordMatch);
}

registrationForm.form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!registrationForm.isValid()) {
    alert('Регистрация отклонена. Проверьте правильность заполнения полей.');
    registrationForm.form.reportValidity();
    return;
  }

  const data = registrationForm.getValues();
  data.createdOn = new Date();
  user = data;

  console.log('Регистрация успешна:', user);
  registrationModal.close();
  registrationForm.reset();
  alert(`Регистрация успешно завершена!\nДобро пожаловать, ${data.userFirstName} ${data.userLastName}!`);
});