let currentUser = null;
let userEmail = '';
let generatedCode = '';

// Загрузка пользователей из localStorage
function loadUsersFromDB() {
  const saved = localStorage.getItem('users');
  if (!saved) {
    const defaultUsers = [
      { email: 'admin', password: 'ADMIN', name: 'Администратор', photo: '', isAdmin: true }
    ];
    localStorage.setItem('users', JSON.stringify(defaultUsers));
    return defaultUsers;
  }
  return JSON.parse(saved);
}

// Сохранение пользователей в localStorage
function saveUsersToDB(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// Авторизация
function login() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  const users = loadUsersFromDB();
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'profile.html';
  } else {
    alert("Неверный email или пароль");
  }
}

// Регистрация шаг 1 — отправка кода
function sendCode() {
  const emailInput = document.getElementById('reg-email').value.trim();
  const messageDiv = document.getElementById('message');

  if (!validateEmail(emailInput)) {
    messageDiv.innerText = 'Введите корректный email';
    return;
  }

  userEmail = emailInput;
  generatedCode = Math.floor(100000 + Math.random() * 900000).toString();

  document.getElementById('step1').classList.add('hidden');
  document.getElementById('step2').classList.remove('hidden');

  document.getElementById('sent-email').innerText = userEmail;
  document.getElementById('generated-code').innerText = 'Код: ' + generatedCode;
  messageDiv.innerText = '';
}

// Регистрация шаг 2 — проверка кода
function verifyCode() {
  const codeInput = document.getElementById('code').value.trim();
  const messageDiv = document.getElementById('message');

  if (codeInput === generatedCode) {
    document.getElementById('step2').classList.add('hidden');
    document.getElementById('step3').classList.remove('hidden');
    messageDiv.innerText = '';
  } else {
    messageDiv.innerText = 'Неверный код';
  }
}

// Регистрация шаг 3 — установка пароля
function completeRegistration() {
  const password = document.getElementById('reg-password').value.trim();
  const name = document.getElementById('reg-name').value.trim();
  const messageDiv = document.getElementById('message');

  if (password.length < 6) {
    messageDiv.innerText = 'Пароль должен быть не менее 6 символов';
    return;
  }

  if (!name) {
    messageDiv.innerText = 'Введите имя';
    return;
  }

  let users = loadUsersFromDB();
  if (users.some(u => u.email === userEmail)) {
    alert("Пользователь с таким email уже существует");
    return;
  }

  const newUser = { email: userEmail, password, name, photo: '', isAdmin: false };
  users.push(newUser);
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  saveUsersToDB(users);

  alert("Регистрация успешна");
  window.location.href = 'profile.html';
}


// Загрузка профиля
function loadProfile() {
  const currentUserStr = localStorage.getItem('currentUser');
  if (!currentUserStr) return;

  currentUser = JSON.parse(currentUserStr);
  document.getElementById('profile-name').value = currentUser.name || '';
  document.getElementById('profile-img').src = currentUser.photo || 'https://via.placeholder.com/100'; 

  const friendsList = document.getElementById('friends-list');
  friendsList.innerHTML = '';
  if (currentUser.friends?.length > 0) {
    currentUser.friends.forEach(friendEmail => {
      const li = document.createElement('li');
      li.innerText = friendEmail;
      friendsList.appendChild(li);
    });
  } else {
    const li = document.createElement('li');
    li.innerText = "Нет друзей";
    friendsList.appendChild(li);
  }

  if (currentUser.isAdmin) {
    document.getElementById('admin-panel-btn').classList.remove('hidden');
  }
}

// Сохранение профиля
function saveProfile() {
  const newName = document.getElementById('profile-name').value;
  currentUser.name = newName;

  let users = loadUsersFromDB();
  users = users.map(u => u.email === currentUser.email ? currentUser : u);
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  saveUsersToDB(users);

  alert("Имя успешно сохранено");
}

// Загрузка фото
function uploadPhoto(input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    currentUser.photo = e.target.result;

    let users = loadUsersFromDB();
    users = users.map(u => u.email === currentUser.email ? currentUser : u);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    saveUsersToDB(users);

    document.getElementById('profile-img').src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// Добавление друзей
function addFriend() {
  const email = document.getElementById('friend-email').value.trim();
  if (!email) return;

  const currentUserStr = localStorage.getItem('currentUser');
  if (!currentUserStr) return;
  const currentUser = JSON.parse(currentUserStr);

  const users = loadUsersFromDB();
  const friend = users.find(u => u.email === email);

  if (!friend) {
    alert("Пользователь не найден");
    return;
  }

  if (currentUser.friends?.includes(email)) {
    alert("Уже в друзьях");
    return;
  }

  currentUser.friends = currentUser.friends || [];
  currentUser.friends.push(email);
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  saveUsersToDB(users);
  loadProfile();
}

// Загрузка админки
function loadAdminPanel() {
  const ul = document.getElementById('user-list');
  if (!ul) return;

  const users = loadUsersFromDB();
  ul.innerHTML = '';

  users.forEach((user, index) => {
    const li = document.createElement('li');
    li.style.marginBottom = '20px';
    li.style.borderBottom = '1px solid #ccc';
    li.style.paddingBottom = '10px';

    li.innerHTML = `
      <strong>${user.name}</strong> (${user.email})<br><br>
      <img src="${user.photo || 'https://via.placeholder.com/60'}"  width="60" height="60" alt="Фото"><br><br>
      <input type="text" value="${user.name}" id="name-${index}" placeholder="Имя" />
      <input type="file" onchange="uploadUserPhoto(${index}, '${user.email}')">
      <button onclick="editUser('${user.email}', ${index})">Сохранить</button>
      <button onclick="deleteUser('${user.email}')" style="background-color: red; color: white;">Удалить</button>
    `;
    ul.appendChild(li);
  });
}

// Редактирование имени
function editUser(email, index) {
  const newName = document.getElementById(`name-${index}`).value;
  let users = loadUsersFromDB();
  users = users.map(u => u.email === email ? { ...u, name: newName } : u);
  saveUsersToDB(users);
  alert("Данные обновлены");
  loadAdminPanel();
}

// Удаление аккаунта
function deleteUser(email) {
  if (!confirm("Удалить аккаунт?")) return;

  let users = loadUsersFromDB();
  users = users.filter(u => u.email !== email);
  saveUsersToDB(users);
  alert("Аккаунт удален");
  loadAdminPanel();
}

// Загрузка фото для пользователя
function uploadUserPhoto(index, email) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
      let users = loadUsersFromDB();
      users = users.map(u => u.email === email ? { ...u, photo: event.target.result } : u);
      saveUsersToDB(users);
      alert("Фото обновлено");
      loadAdminPanel();
    };
    reader.readAsDataURL(file);
  };
  input.click();
}

// Выход
function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

// Переход в админку
function goToAdminPanel() {
  window.location.href = 'admin.html';
}

// Навигация
function showRegister() {
  document.getElementById('login-form').classList.add('hidden');
  document.getElementById('step1').classList.remove('hidden');
}

function backToLogin() {
  document.getElementById('login-form').classList.remove('hidden');
  document.getElementById('step1').classList.add('hidden');
}

function backToStep1() {
  document.getElementById('step1').classList.remove('hidden');
  document.getElementById('step2').classList.add('hidden');
}

function backToStep2() {
  document.getElementById('step2').classList.remove('hidden');
  document.getElementById('step3').classList.add('hidden');
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}


// Отображение навигации
function renderAuthNav() {
  const navContainer = document.getElementById('auth-nav');
  if (!navContainer) return;

  const currentUserStr = localStorage.getItem('currentUser');
  let html = '';

  if (currentUserStr) {
    const user = JSON.parse(currentUserStr);
    html = `
      <img src="${user.photo || 'https://via.placeholder.com/30'}"  alt="Аватар" />
      <span style="color: white;">${user.name}</span>
      <button onclick="logout()">Выход</button>
    `;
  } else {
    html = `<a href="index.html">Войти / Зарегистрироваться</a>`;
  }

  navContainer.innerHTML = html;
}

// Отправка сообщения в общий чат
function sendGlobalMessage() {
  const message = document.getElementById('global-message').value.trim();
  if (!message) return;

  const currentUserStr = localStorage.getItem('currentUser');
  if (!currentUserStr) return;
  const currentUser = JSON.parse(currentUserStr);

  let chats = JSON.parse(localStorage.getItem('chats') || '{}');
  if (!chats.global) chats.global = [];

  chats.global.push({
    user: currentUser.email,
    text: message,
    time: new Date().toLocaleString()
  });

  localStorage.setItem('chats', JSON.stringify(chats));
  loadGlobalMessages();
  document.getElementById('global-message').value = '';
}

// Загрузка общего чата
function loadGlobalMessages() {
  const chatBox = document.getElementById('global-chat');
  chatBox.innerHTML = '';

  const chats = JSON.parse(localStorage.getItem('chats') || '{}');
  const messages = chats.global || [];

  messages.forEach(msg => {
    const div = document.createElement('div');
    div.innerHTML = `<strong>${msg.user}</strong> (${msg.time}): ${msg.text}`;
    chatBox.appendChild(div);
  });
}

// Загрузка друзей в select
function loadFriendsToSelect() {
  const select = document.getElementById('chat-users');
  select.innerHTML = '';

  const currentUserStr = localStorage.getItem('currentUser');
  if (!currentUserStr) return;
  const currentUser = JSON.parse(currentUserStr);

  const users = loadUsersFromDB();

  users.forEach(user => {
    if (user.email !== currentUser.email) {
      const option = document.createElement('option');
      option.value = user.email;
      option.text = `${user.name} (${user.email})`;
      select.appendChild(option);
    }
  });
}

// Создание приватного чата
function createPrivateChat() {
  const select = document.getElementById('chat-users');
  const selected = Array.from(select.selectedOptions).map(opt => opt.value);
  if (selected.length < 1) return;

  const currentUserStr = localStorage.getItem('currentUser');
  if (!currentUserStr) return;
  const currentUser = JSON.parse(currentUserStr);

  const chatId = [...selected, currentUser.email].sort().join('-');

  let chats = JSON.parse(localStorage.getItem('chats') || '{}');
  if (!chats.private) chats.private = {};
  if (!chats.private[chatId]) chats.private[chatId] = [];

  localStorage.setItem('chats', JSON.stringify(chats));
  loadPrivateChats();
}

// Загрузка приватных чатов
function loadPrivateChats() {
  const container = document.getElementById('private-chats');
  container.innerHTML = '';

  const currentUserStr = localStorage.getItem('currentUser');
  if (!currentUserStr) return;

  const chats = JSON.parse(localStorage.getItem('chats') || '{}');
  const privateChats = chats.private || {};

  Object.keys(privateChats).forEach(chatId => {
    if (chatId.includes(currentUserStr.split('"email":"')[1].split('"')[0])) {
      const chatDiv = document.createElement('div');
      chatDiv.style.marginBottom = '20px';
      chatDiv.innerHTML = `
        <strong>Чат: ${chatId}</strong><br>
        <textarea id="chat-${chatId}" readonly rows="5" cols="40"></textarea><br>
        <input type="text" id="input-${chatId}" placeholder="Сообщение" />
        <button onclick="sendMessage('${chatId}')">Отправить</button>
      `;
      container.appendChild(chatDiv);

      const textarea = document.getElementById(`chat-${chatId}`);
      const messages = privateChats[chatId];
      textarea.value = messages.map(m => `${m.user}: ${m.text} (${m.time})`).join('\n');
    }
  });
}

// Отправка сообщения в приватный чат
function sendMessage(chatId) {
  const input = document.getElementById(`input-${chatId}`);
  const message = input.value.trim();
  if (!message) return;

  const currentUserStr = localStorage.getItem('currentUser');
  if (!currentUserStr) return;
  const currentUser = JSON.parse(currentUserStr);

  let chats = JSON.parse(localStorage.getItem('chats') || '{}');
  if (!chats.private) chats.private = {};
  if (!chats.private[chatId]) chats.private[chatId] = [];

  chats.private[chatId].push({
    user: currentUser.email,
    text: message,
    time: new Date().toLocaleString()
  });

  localStorage.setItem('chats', JSON.stringify(chats));
  loadPrivateChats();
  input.value = '';
}




// === Переключатель формы ===
function toggleForm() {
  const isGroup = document.querySelector('input[name="type"]:checked')?.value === 'group';
  document.getElementById('group-fields').style.display = isGroup ? 'block' : 'none';
  document.getElementById('musician-fields').style.display = isGroup ? 'none' : 'block';
}

// === Отправка формы ===
document.getElementById("group-musician-form")?.addEventListener("submit", function(event) {
  event.preventDefault();
  const form = event.target;
  const type = form.type.value;
  const formData = {
    id: Date.now(),
    type: type,
    name: form.name.value.trim(),
    genreGroup: form['genre-group']?.value.trim() || '',
    membersNeeded: form['members-needed']?.value || '',
    goal: form.goal?.value.trim() || '',
    instrument: form.instrument?.value || '',
    experience: form.experience?.value || '',
    location: form.location.value.trim(),
    contact: form.contact.value.trim()
  };
  let savedData = JSON.parse(localStorage.getItem('groupMusicianForms')) || [];
  savedData.push(formData);
  localStorage.setItem('groupMusicianForms', JSON.stringify(savedData));
  form.reset();
  document.getElementById("success-message-group").classList.remove("hidden");
  toggleForm();
});

// === Показ списка музыкантов ===
function showMusicianList() {
  const container = document.getElementById("musician-list-container");
  if (!container) return;
  const data = JSON.parse(localStorage.getItem('groupMusicianForms')) || [];
  const filteredData = data.filter(entry => entry.type === 'musician');
  container.innerHTML = "";
  if (filteredData.length === 0) {
    container.innerHTML = "<p>Нет заполненных анкет</p>";
    return;
  }
  filteredData.forEach(entry => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <strong>${entry.name}</strong><br>
      Инструмент: ${entry.instrument}<br>
      Опыт: ${entry.experience}<br>
      Локация: ${entry.location}<br>
      Контакт: ${entry.contact}
    `;
    const actions = document.createElement("div");
    actions.className = "actions";
    const editBtn = document.createElement("button");
    editBtn.textContent = "Изменить";
    editBtn.onclick = () => openEditModal(entry, 'musician');
    const delBtn = document.createElement("button");
    delBtn.textContent = "Удалить";
    delBtn.style.background = "#a52a2a";
    delBtn.onclick = () => deleteEntry(entry.id, 'musician');
    actions.appendChild(editBtn);
    actions.appendChild(delBtn);
    card.appendChild(actions);
    container.appendChild(card);
  });
}

// === Показ списка групп ===
function showGroupList() {
  const container = document.getElementById("group-list-container");
  if (!container) return;
  const data = JSON.parse(localStorage.getItem('groupMusicianForms')) || [];
  const filteredData = data.filter(entry => entry.type === 'group');
  container.innerHTML = "";
  if (filteredData.length === 0) {
    container.innerHTML = "<p>Нет заполненных анкет</p>";
    return;
  }
  filteredData.forEach(entry => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <strong>${entry.name}</strong><br>
      Жанр: ${entry.genreGroup}<br>
      Ищем: ${entry.membersNeeded}<br>
      Цель: ${entry.goal}<br>
      Локация: ${entry.location}<br>
      Контакт: ${entry.contact}
    `;
    const actions = document.createElement("div");
    actions.className = "actions";
    const editBtn = document.createElement("button");
    editBtn.textContent = "Изменить";
    editBtn.onclick = () => openEditModal(entry, 'group');
    const delBtn = document.createElement("button");
    delBtn.textContent = "Удалить";
    delBtn.style.background = "#a52a2a";
    delBtn.onclick = () => deleteEntry(entry.id, 'group');
    actions.appendChild(editBtn);
    actions.appendChild(delBtn);
    card.appendChild(actions);
    container.appendChild(card);
  });
}

// === Открытие модального окна редактирования ===
window.openEditModal = function(data, listType) {
  document.getElementById("edit-id").value = data.id;
  document.getElementById("edit-type").value = data.type;
  document.getElementById("edit-name").value = data.name || "";
  document.getElementById("edit-instrument").value = data.instrument || "";
  document.getElementById("edit-genre-group").value = data.genreGroup || "";
  document.getElementById("edit-members-needed").value = data.membersNeeded || "";
  document.getElementById("edit-goal").value = data.goal || "";
  document.getElementById("edit-experience").value = data.experience || "";
  document.getElementById("edit-location").value = data.location || "";
  document.getElementById("edit-contact").value = data.contact || "";
  document.getElementById("edit-modal").classList.remove("hidden");
  window.currentListType = listType;
};

// === Удаление анкеты ===
window.deleteEntry = function(id, listType) {
  const key = 'groupMusicianForms';
  const savedData = JSON.parse(localStorage.getItem(key)) || [];
  const newData = savedData.filter(entry => entry.id !== id);
  localStorage.setItem(key, JSON.stringify(newData));
  showMusicianList();
  showGroupList();
};

// === Редактирование анкеты ===
document.getElementById("edit-form")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const id = parseInt(document.getElementById("edit-id").value);
  const updatedData = {
    name: document.getElementById("edit-name").value.trim(),
    instrument: document.getElementById("edit-instrument").value,
    genreGroup: document.getElementById("edit-genre-group").value.trim(),
    membersNeeded: document.getElementById("edit-members-needed").value,
    goal: document.getElementById("edit-goal").value.trim(),
    experience: document.getElementById("edit-experience").value,
    location: document.getElementById("edit-location").value.trim(),
    contact: document.getElementById("edit-contact").value.trim()
  };

  const savedData = JSON.parse(localStorage.getItem('groupMusicianForms')) || [];
  const index = savedData.findIndex(entry => entry.id === id);
  if (index !== -1) {
    savedData[index] = { ...savedData[index], ...updatedData };
    localStorage.setItem('groupMusicianForms', JSON.stringify(savedData));
    document.getElementById("edit-modal").classList.add("hidden");
    alert("Данные обновлены");
    showMusicianList();
    showGroupList();
  }
});

// === Закрытие модального окна ===
document.getElementById("close-modal")?.addEventListener("click", () => {
  document.getElementById("edit-modal").classList.add("hidden");
});
document.getElementById("edit-modal")?.addEventListener("click", (e) => {
  if (e.target === document.getElementById("edit-modal")) {
    document.getElementById("edit-modal").classList.add("hidden");
  }
});

// === Фильтрация ===
let filteredMusicianData = [];
let filteredGroupData = [];

function applyFilters() {
  const name = document.getElementById("filter-name").value.trim().toLowerCase();
  const genre = document.getElementById("filter-genre").value.trim().toLowerCase();
  const location = document.getElementById("filter-location").value.trim().toLowerCase();
  const typeFilter = document.getElementById("filter-type").value;

  const data = JSON.parse(localStorage.getItem('groupMusicianForms')) || [];

  filteredMusicianData = data.filter(entry =>
    entry.type === 'musician' &&
    entry.name.toLowerCase().includes(name) &&
    entry.instrument?.toLowerCase().includes(genre) &&
    entry.location.toLowerCase().includes(location)
  );

  filteredGroupData = data.filter(entry =>
    entry.type === 'group' &&
    entry.name.toLowerCase().includes(name) &&
    entry.genreGroup?.toLowerCase().includes(genre) &&
    entry.location.toLowerCase().includes(location) &&
    (!typeFilter || entry.type === typeFilter)
  );

  const musicianBlock = document.querySelector("#musician-list-container").closest(".form-container");
  const groupBlock = document.querySelector("#group-list-container").closest(".form-container");

  musicianBlock.style.display = typeFilter === 'group' ? 'none' : 'block';
  groupBlock.style.display = typeFilter === 'musician' ? 'none' : 'block';

  showFilteredLists();
}

function resetFilters() {
  document.getElementById("filter-name").value = "";
  document.getElementById("filter-genre").value = "";
  document.getElementById("filter-location").value = "";
  document.getElementById("filter-type").value = "";
  showMusicianList();
  showGroupList();
}

function showFilteredLists() {
  const musicianContainer = document.getElementById("musician-list-container");
  const groupContainer = document.getElementById("group-list-container");

  renderCardList(musicianContainer, filteredMusicianData, 'musician');
  renderCardList(groupContainer, filteredGroupData, 'group');
}

function renderCardList(container, data, listType) {
  container.innerHTML = "";
  if (data.length === 0) {
    container.innerHTML = "<p>Нет данных</p>";
    return;
  }

  data.forEach(entry => {
    const card = document.createElement("div");
    card.classList.add("card");
    let content = `<strong>${entry.name}</strong><br>`;
    content += `<em>${entry.type === 'group' ? 'Группа' : 'Музыкант'}</em><br>`;
    if (entry.type === 'group') {
      content += `Жанр: ${entry.genreGroup}<br>`;
      content += `Ищем: ${entry.membersNeeded}<br>`;
      content += `Цель: ${entry.goal}<br>`;
    } else {
      content += `Инструмент: ${entry.instrument}<br>`;
      content += `Опыт: ${entry.experience}<br>`;
    }
    content += `Локация: ${entry.location}<br>`;
    content += `Контакт: ${entry.contact}`;

    const actions = document.createElement("div");
    actions.className = "actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Изменить";
    editBtn.onclick = () => openEditModal(entry, listType);

    const delBtn = document.createElement("button");
    delBtn.textContent = "Удалить";
    delBtn.style.background = "#a52a2a";
    delBtn.onclick = () => deleteEntry(entry.id, listType);

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);
    card.appendChild(actions);
    container.appendChild(card);
  });
}