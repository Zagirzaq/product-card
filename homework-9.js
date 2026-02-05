// 4. К Форме, которая прикреплена в футере - добавить логику:
// email должен соответствовать стандартам (добавить валидацию), если он не заполнен - форма не отправляется. 
// Кнопка "Подписаться" и есть "отправкой формы", 
// при нажатии на которую мы будем выводить консоль лог в виде объекта:  { email: 'введенная почта' }

const emailForm = document.querySelector(".email-form");
emailForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const email = data.email?.trim();
    const formatRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasValidDomain = email && email.includes('@') && (
        email.includes('.com') || email.includes('.ru') || 
        email.includes('.net') || email.includes('.org') ||
        email.includes('.ua') || email.includes('.by') ||
        email.includes('.kz')
    );
    if (!email || !formatRegex.test(email) || !hasValidDomain) {
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

// 6. Создать форму для регистрации внутри модального окна. Она должна содержать поля: имя, фамилия, дата рождения, логин, пароль, повторение пароля. 
// Используйте <label> для того, что бы указать пользователю, какое поле за что отвечает. Также важно использовать placeholder 
// (обо всем этом можно будет почитать в документации в конце поста) Разрешается добавить поля на ваше усмотрение. 
// Все поля должны иметь валидацию. Если пользователь ввел два разных пароля или форма невалидна (используем метод checkValidity()) - мы должны предупредить его о том, 
// что регистрация отклонена. Если регистрация успешна - выводим значения формы в лог, как в задании №4. 
// Дополнительно мы должны добавить к этому объекту свойство createdOn и указать туда время создания (используем сущность new Date()). 
// Также создайте внешнюю переменную user и присвойте ей этот объект. После успешной регистрации - модалка должны закрыться. 

const openModalBtn = document.getElementById("openRegistration");
const closeModalBtn = document.getElementById("closeRegistration");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const registrationForm = document.getElementById("registrationForm");
const body = document.body;
r
let user = null;

openModalBtn.addEventListener('click', () => {
    modal.classList.add('modal-showed');
    overlay.classList.add('active');
    body.classList.add('modal-open');
});

closeModalBtn.addEventListener('click', () => {
    closeModal();
});

overlay.addEventListener('click', () => {
    closeModal();
});

function closeModal() {
    modal.classList.remove('modal-showed');
    overlay.classList.remove('active');
    body.classList.remove('modal-open');
    if (registrationForm) registrationForm.reset();
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('modal-showed')) {
        closeModal();
    }
});
if (registrationForm) {
    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const form = event.target;
        if (!form.checkValidity()) {
            alert('Пожалуйста, заполните все обязательные поля корректно.');
            return;
        }
        const password = form.password.value;
        const confirmPassword = form.repetPassword.value;
        if (password !== confirmPassword) {
            alert('Пароли не совпадают. Пожалуйста, проверьте введенные данные.');
            return;
        }
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data.createdOn = new Date();
        user = data;
        console.log('Регистрация успешна:', user);
        closeModal();
        alert(`Регистрация успешно завершена!\nДобро пожаловать, ${data.userFirstName} ${data.userLastName}!`);
    });
}