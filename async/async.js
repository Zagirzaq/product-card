const STORAGE_KEY = 'users';

const container = document.getElementById('usersContainer');
const statusDiv = document.getElementById('statusMessage');
const showAllBtn = document.getElementById('showAllBtn');
const deleteAllBtn = document.getElementById('deleteAllBtn');

let currentUsers = [];

function setStatus(text, isError = false) {
  statusDiv.textContent = text;
  statusDiv.style.color = isError ? 'red' : 'black';
}

function renderUsers(usersArray) {
  const template = document.getElementById('user-card-template');
  container.innerHTML = '';

  if (!usersArray.length) {
    setStatus('Нет пользователей для отображения');
    return;
  }

  usersArray.forEach(user => {
    const clone = template.content.cloneNode(true);
    clone.querySelector('.user-name').textContent = `${user.name} ${user.surname}`;
    clone.querySelector('.user-email').textContent = `Email: ${user.email}`;
    clone.querySelector('.user-age').textContent = `Возраст: ${user.age}`;
    const deleteBtn = clone.querySelector('.delete-user-btn');
    deleteBtn.dataset.id = user.id;
    deleteBtn.addEventListener('click', () => deleteUserById(user.id));
    container.appendChild(clone);
  });
  setStatus('');
}

function loadFromLocalStorage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      currentUsers = JSON.parse(stored);
      renderUsers(currentUsers);
      return true;
    } catch (e) {
      console.error('Ошибка парсинга localStorage', e);
      return false;
    }
  }
  return false;
}

function saveToLocalStorage(usersArray) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usersArray));
  currentUsers = usersArray;
  renderUsers(currentUsers);
}

function fetchUsersWithDelay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch('users.json')
        .then(response => {
          if (!response.ok) throw new Error('Сеть ответила с ошибкой');
          return response.json();
        })
        .then(data => resolve(data))
        .catch(err => reject(err));
    }, 1500);
  });
}

async function init() {
  const hasData = loadFromLocalStorage();
  if (hasData) return;

  setStatus('Данные загружаются...');
  try {
    const users = await fetchUsersWithDelay();
    saveToLocalStorage(users);
    setStatus('');
  } catch (error) {
    console.error(error);
    setStatus('Ошибка при загрузке данных', true);
    container.innerHTML = '';
  }
}

function deleteUserById(id) {
  const newUsers = currentUsers.filter(user => user.id !== id);
  if (newUsers.length === currentUsers.length) {
    setStatus('Пользователь не найден', true);
    setTimeout(() => setStatus(''), 1500);
    return;
  }
  saveToLocalStorage(newUsers);
  setStatus(`Пользователь с id ${id} удалён`);
  setTimeout(() => setStatus(''), 1500);
}

function deleteAllUsers() {
  if (currentUsers.length === 0) {
    setStatus('Нет пользователей для удаления', true);
    setTimeout(() => setStatus(''), 1500);
    return;
  }
  saveToLocalStorage([]);
  setStatus('Все пользователи удалены');
  setTimeout(() => setStatus(''), 1500);
}

function showAllUsers() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    setStatus('Нет данных в хранилище', true);
    return;
  }
  const allUsers = JSON.parse(stored);
  if (allUsers.length === currentUsers.length) {
    setStatus('Все пользователи уже отображены');
    setTimeout(() => setStatus(''), 1500);
  } else {
    saveToLocalStorage(allUsers);
    setStatus('Отображены все пользователи');
    setTimeout(() => setStatus(''), 1500);
  }
}

showAllBtn.addEventListener('click', showAllUsers);
deleteAllBtn.addEventListener('click', deleteAllUsers);

init();

localStorage.clear()