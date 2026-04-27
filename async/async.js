const USERS_KEY = 'users';
const userCardTemplate = document.getElementById('user-card-template');
const container = document.getElementById('usersContainer');
const statusDiv = document.getElementById('statusMessage');
const showAllBtn = document.getElementById('showAllBtn');
const deleteAllBtn = document.getElementById('deleteAllBtn');

let currentUsers = [];

// Установка статуса (опционально с автоочисткой через duration мс)
function setStatus(text, isError = false, duration = 0) {
  statusDiv.textContent = text;
  statusDiv.style.color = isError ? 'red' : 'black';
  if (duration > 0) {
    setTimeout(() => {
      if (statusDiv.textContent === text) {
        statusDiv.textContent = '';
      }
    }, duration);
  }
}

// Получаем данные из localStorage (всегда массив, без try/catch)
function getDataFromLocalStorage(key) {
  const rawData = localStorage.getItem(key);
  if (!rawData) return [];
  return JSON.parse(rawData) ?? [];   // Если вдруг null после parse
}

// Чистое сохранение в localStorage
function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Рендер карточек
function renderUsers(users) {
  container.innerHTML = '';
  if (users.length === 0) {
    setStatus('Нет пользователей для отображения', false, 2000);
    return;
  }
  users.forEach(user => {
    const clone = userCardTemplate.content.cloneNode(true);
    clone.querySelector('.user-name').textContent = `${user.name} ${user.surname}`;
    clone.querySelector('.user-email').textContent = `Email: ${user.email}`;
    clone.querySelector('.user-age').textContent = `Возраст: ${user.age}`;
    const deleteBtn = clone.querySelector('.delete-user-btn');
    deleteBtn.dataset.id = user.id;
    deleteBtn.addEventListener('click', () => deleteUserById(user.id));
    container.appendChild(clone);
  });
  statusDiv.textContent = ''; // сброс статуса после успешного рендера
}

// Удаление одной карточки
function deleteUserById(id) {
  const newUsers = currentUsers.filter(user => user.id !== id);
  if (newUsers.length === currentUsers.length) {
    setStatus('Пользователь не найден', true, 1500);
    return;
  }
  currentUsers = newUsers;
  saveToLocalStorage(USERS_KEY, currentUsers);
  renderUsers(currentUsers);
  setStatus(`Пользователь с id ${id} удалён`, false, 1500);
}

// Удаление всех
function deleteAllUsers() {
  if (currentUsers.length === 0) {
    setStatus('Нет пользователей для удаления', true, 1500);
    return;
  }
  currentUsers = [];
  saveToLocalStorage(USERS_KEY, []);
  renderUsers([]);
  setStatus('Все пользователи удалены', false, 1500);
}

// Показать всех из хранилища
function showAllUsers() {
  const allUsers = getDataFromLocalStorage(USERS_KEY);
  if (allUsers.length === 0) {
    setStatus('Нет данных в хранилище', true, 1500);
    return;
  }
  if (allUsers.length === currentUsers.length) {
    setStatus('Все пользователи уже отображены', false, 1500);
    return;
  }
  currentUsers = allUsers;
  renderUsers(currentUsers);
  setStatus('Отображены все пользователи', false, 1500);
}

// Запрос к серверу (без искусственной задержки)
async function fetchUsers() {
  const response = await fetch('users.json');
  if (!response.ok) {
    throw new Error('Ошибка при запросе на сервер');
  }
  return response.json();
}

// Инициализация
async function init() {
  const stored = getDataFromLocalStorage(USERS_KEY);
  if (stored.length > 0) {
    currentUsers = stored;
    renderUsers(currentUsers);
    return;
  }

  setStatus('Данные загружаются...');
  try {
    const users = await fetchUsers();
    // Искусственная задержка 1.5 секунды перед рендером (имитация долгой загрузки)
    setTimeout(() => {
      saveToLocalStorage(USERS_KEY, users);
      currentUsers = users;
      renderUsers(currentUsers);
    }, 1500);
  } catch (error) {
    console.error(error);
    setStatus('Ошибка при загрузке данных', true);
    container.innerHTML = '';
  }
}

// Запуск после полной загрузки страницы
window.addEventListener('load', init);

// Обработчики кнопок
showAllBtn.addEventListener('click', showAllUsers);
deleteAllBtn.addEventListener('click', deleteAllUsers);