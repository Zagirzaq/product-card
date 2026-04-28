const USERS_KEY = 'users';
const userCardTemplate = document.getElementById('user-card-template');
const container = document.getElementById('usersContainer');
const statusDiv = document.getElementById('statusMessage');
const showAllBtn = document.getElementById('showAllBtn');
const deleteAllBtn = document.getElementById('deleteAllBtn');

let currentUsers = [];

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

function getDataFromLocalStorage(key) {
  const rawData = localStorage.getItem(key);
  return JSON.parse(rawData || '[]');
}

function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function renderUsers(users) {
  container.innerHTML = '';
  if (!users.length) {
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
  statusDiv.textContent = '';
}

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

function deleteAllUsers() {
  if (!currentUsers.length) {
    setStatus('Нет пользователей для удаления', true, 1500);
    return;
  }
  currentUsers = [];
  saveToLocalStorage(USERS_KEY, []);
  renderUsers([]);
  setStatus('Все пользователи удалены', false, 1500);
}

function showAllUsers() {
  const allUsers = getDataFromLocalStorage(USERS_KEY);
  if (!allUsers.length) {
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

async function fetchUsers() {
  const response = await fetch('users.json');
  if (!response.ok) {
    throw new Error('Ошибка при запросе на сервер');
  }
  return response.json();
}

async function init() {
  const localStorageData = getDataFromLocalStorage(USERS_KEY);
  if (localStorageData.length) {
    currentUsers = localStorageData;
    renderUsers(currentUsers);
    return;
  }

  setStatus('Данные загружаются...');
  try {
    const users = await fetchUsers();
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

window.addEventListener('load', init);

showAllBtn.addEventListener('click', showAllUsers);
deleteAllBtn.addEventListener('click', deleteAllUsers);