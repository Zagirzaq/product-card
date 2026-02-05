

const emailForm = document.querySelector(".email-form");
emailForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const email = data.email?.trim();
    
    // Regex для формата
    const formatRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Проверка домена через includes
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

// Объявляем все переменные в начале
const openModalBtn = document.getElementById("openRegistration");
const closeModalBtn = document.getElementById("closeRegistration");
const modal = document.querySelector(".modal"); // Исправлено: было getElementsByClassName
const overlay = document.querySelector(".overlay");
const registrationForm = document.getElementById("registrationForm");
const body = document.body;

// Внешняя переменная user
let user = null;

// Открытие модального окна - один обработчик
openModalBtn.addEventListener('click', () => {
    modal.classList.add('modal-showed'); // Исправлено: add вместо toggle
    overlay.classList.add('active');
    body.classList.add('modal-open');
});

// Закрытие модального окна - один обработчик
closeModalBtn.addEventListener('click', () => {
    closeModal();
});

// Закрытие по клику на overlay
overlay.addEventListener('click', () => {
    closeModal();
});

// Функция для закрытия модального окна
function closeModal() {
    modal.classList.remove('modal-showed');
    overlay.classList.remove('active');
    body.classList.remove('modal-open');
    if (registrationForm) registrationForm.reset();
}

// Закрытие по ESC
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('modal-showed')) {
        closeModal();
    }
});

// Обработка формы регистрации
if (registrationForm) {
    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const form = event.target;
        
        // Проверка валидности формы
        if (!form.checkValidity()) {
            alert('Пожалуйста, заполните все обязательные поля корректно.');
            return;
        }
        
        // Проверка совпадения паролей
        const password = form.password.value;
        const confirmPassword = form.repetPassword.value; // Исправлено: name="repetPassword"
        
        if (password !== confirmPassword) {
            alert('Пароли не совпадают. Пожалуйста, проверьте введенные данные.');
            return;
        }
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Добавление времени создания
        data.createdOn = new Date();
        
        // Сохранение в переменную user
        user = data;
        
        // Вывод в консоль
        console.log('Регистрация успешна:', user);
        
        // Закрытие модального окна
        closeModal();
        
        // Оповещение пользователя
        alert(`Регистрация успешно завершена!\nДобро пожаловать, ${data.userFirstName} ${data.userLastName}!`);
    });
}