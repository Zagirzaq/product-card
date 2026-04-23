const USERS_STORAGE_KEY = 'users';
const userCardTemplate = document.getElementById('user-card-template');

const container = document.getElementById('usersContainer');
const statusDiv = document.getElementById('statusMessage');
const showAllBtn = document.getElementById('showAllBtn');
const deleteAllBtn = document.getElementById('deleteAllBtn');

let currentUsers = [];

function setStatus(text, isError = false) {
  statusDiv.textContent = text;
  statusDiv.style.color = isError ? 'red' : 'black';
}

function showTemporaryStatus(text, isError = false) {
  setStatus(text, isError);
  setTimeout(() => setStatus(''), 1500);
}

function renderUsers(usersArray) {
  container.innerHTML = '';
  if (!usersArray.length) {
    setStatus('Нет пользователей для отображения');
    return;
  }
  usersArray.forEach(user => {
    const clone = userCardTemplate.content.cloneNode(true);
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
  const rawData = localStorage.getItem(USERS_STORAGE_KEY);
  if (rawData) {
    const users = JSON.parse(rawData);
    currentUsers = users;
    renderUsers(currentUsers);
    return true;
  }
  return false;
}

function saveToLocalStorage(usersArray) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usersArray));
}

async function fetchUsers() {
  const response = await fetch('users.json');
  if (!response.ok) throw new Error('Сеть ответила с ошибкой');
  return response.json();
}

async function init() {
  const hasData = loadFromLocalStorage();
  if (hasData) return;

  setStatus('Данные загружаются...');
  try {
    const users = await fetchUsers();
    setTimeout(() => {
      saveToLocalStorage(users);
      currentUsers = users;
      renderUsers(currentUsers);
      setStatus('');
    }, 1500);
  } catch (error) {
    console.error(error);
    setStatus('Ошибка при загрузке данных', true);
    container.innerHTML = '';
  }
}

function deleteUserById(id) {
  const newUsers = currentUsers.filter(user => user.id !== id);
  if (newUsers.length === currentUsers.length) {
    showTemporaryStatus('Пользователь не найден', true);
    return;
  }
  saveToLocalStorage(newUsers);
  currentUsers = newUsers;
  renderUsers(currentUsers);
  showTemporaryStatus(`Пользователь с id ${id} удалён`);
}

function deleteAllUsers() {
  if (currentUsers.length === 0) {
    showTemporaryStatus('Нет пользователей для удаления', true);
    return;
  }
  saveToLocalStorage([]);
  currentUsers = [];
  renderUsers(currentUsers);
  showTemporaryStatus('Все пользователи удалены');
}

function showAllUsers() {
  const rawData = localStorage.getItem(USERS_STORAGE_KEY);
  if (!rawData) {
    showTemporaryStatus('Нет данных в хранилище', true);
    return;
  }
  const allUsers = JSON.parse(rawData);
  if (allUsers.length === currentUsers.length) {
    showTemporaryStatus('Все пользователи уже отображены');
  } else {
    currentUsers = allUsers;
    renderUsers(currentUsers);
    showTemporaryStatus('Отображены все пользователи');
  }
}

showAllBtn.addEventListener('click', showAllUsers);
deleteAllBtn.addEventListener('click', deleteAllUsers);

window.addEventListener('load', init);