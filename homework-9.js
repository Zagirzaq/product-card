// 4. К Форме, которая прикреплена в футере - добавить логику:
// email должен соответствовать стандартам (добавить валидацию), если он не заполнен - форма не отправляется.
// Кнопка "Подписаться" и есть "отправкой формы",
// при нажатии на которую мы будем выводить консоль лог в виде объекта: { email: 'введенная почта' }

const getFormData = (form) => {
  const formData = new FormData(form);
  return Object.fromEntries(formData.entries());
};

const validateEmail = (email) => {
  const formatRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email || !formatRegex.test(email)) {
    return false;
  }
  
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

// 5. Создать кнопку "Регистрация". Создать модальное окно, используя классы "modal, modal-showed".
// Логика такая: при нажатии на кнопку у нас открывается модальное окно путем добавления modal-showed к div с классом modal.
// Не забываем добавить кнопку для закрытия модалки (крестик в углу).
// Важные правила создания модалки:
// 1) Задний фон должен быть затемнён, но не полностью черный (Создаем класс overlay, который будет затемнять всю страницу)
// 2) Модальное окно находиться ровно по центру страницы, независимо от масштаба
// 6. Создать форму для регистрации внутри модального окна.
// Она должна содержать поля: имя, фамилия, дата рождения, логин, пароль, повторение пароля.
// Используйте <label> для того, что бы указать пользователю, какое поле за что отвечает.
// Также важно использовать placeholder. Разрешается добавить поля на ваше усмотрение.
// Все поля должны иметь валидацию. Если пользователь ввел два разных пароля или форма невалидна
// (используем метод checkValidity()) - мы должны предупредить его о том, что регистрация отклонена.
// Если регистрация успешна - выводим значения формы в лог, как в задании №4.
// Дополнительно мы должны добавить к этому объекту свойство createdOn и указать туда время создания
// (используем сущность new Date()). Также создайте внешнюю переменную user и присвойте ей этот объект.
// После успешной регистрации - модалка должны закрыться.

const btnOpenModal = document.getElementById("openRegistration"),
      btnCloseModal = document.getElementById("closeRegistration"),
      modal = document.querySelector(".modal"),
      overlay = document.querySelector(".overlay"),
      registrationForm = document.getElementById("registrationForm"),
      body = document.body;

let user = null;

const openModal = () => {
  modal.classList.add('modal-showed');
  overlay.classList.add('active');
  body.classList.add('modal-open');
};

const closeModal = () => {
  modal.classList.remove('modal-showed');
  overlay.classList.remove('active');
  body.classList.remove('modal-open');
  
  if (registrationForm) registrationForm.reset();
};

btnOpenModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('modal-showed')) {
    closeModal();
  }
});

if (registrationForm) {
  registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.target;
    
    let isFormValid = true;
    
    const inputs = form.querySelectorAll('input[required]');
    inputs.forEach(input => {
      if (!input.checkValidity()) {
        isFormValid = false;
        input.setCustomValidity('Пожалуйста, заполните это поле корректно');
      } else {
        input.setCustomValidity('');
      }
    });
    
    const password = form.password.value;
    const confirmPassword = form.repetPassword.value;
    
    if (password !== confirmPassword) {
      form.repetPassword.setCustomValidity('Пароли не совпадают');
      isFormValid = false;
    } else {
      form.repetPassword.setCustomValidity('');
    }
    
    if (!isFormValid) {
      alert('Регистрация отклонена. Проверьте правильность заполнения полей.');
      
      form.reportValidity();
      return;
    }
    
    const data = getFormData(form);
    data.createdOn = new Date();
    user = data;
    
    console.log('Регистрация успешна:', user);
    closeModal();
    alert(`Регистрация успешно завершена!\nДобро пожаловать, ${data.userFirstName} ${data.userLastName}!`);
  });
}