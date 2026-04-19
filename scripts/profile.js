// Текущий пользователь
let currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
let activeTab = 'orders';

// Данные пользователя (для профиля)
let userProfile = JSON.parse(localStorage.getItem('userProfile')) || {
    phone: '+7 (977) 906-20-05',
    email: 'family.home.98@inbox.ru',
    lastName: '',
    firstName: '',
    patronymic: '',
    birthDate: '',
    children: []
};

let addresses = JSON.parse(localStorage.getItem('addresses')) || [];

function saveProfile() {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
}

function saveAddresses() {
    localStorage.setItem('addresses', JSON.stringify(addresses));
}

function renderCabinet() {
    const container = document.getElementById('cabinetContainer');
    
    container.innerHTML = `
        <div class="sidebar">
            <div class="sidebar-header">
                <h2>Самая Красивая</h2>
                <div style="font-size: 14px; color: #7f5a5a; margin-top: 10px;">
                    <i class="fas fa-user-circle"></i> ${currentUser?.name || 'Пользователь'}
                </div>
            </div>
            <ul class="sidebar-menu">
                <li class="${activeTab === 'orders' ? 'active' : ''}" onclick="window.setActiveTab('orders')">
                    <i class="fas fa-box"></i> ЗАКАЗЫ
                </li>
                <li class="${activeTab === 'favorites' ? 'active' : ''}" onclick="window.setActiveTab('favorites')">
                    <i class="fas fa-heart"></i> ИЗБРАННОЕ
                </li>
                <li class="${activeTab === 'profile' ? 'active' : ''}" onclick="window.setActiveTab('profile')">
                    <i class="fas fa-user-edit"></i> ПРОФИЛЬ
                </li>
                <li class="${activeTab === 'discounts' ? 'active' : ''}" onclick="window.setActiveTab('discounts')">
                    <i class="fas fa-tag"></i> СКИДКИ
                </li>
                <li class="${activeTab === 'referrals' ? 'active' : ''}" onclick="window.setActiveTab('referrals')">
                    <i class="fas fa-users"></i> РЕФЕРАЛЫ
                </li>
                <li class="logout-item" onclick="window.logout()">
                    <i class="fas fa-sign-out-alt"></i> ВЫХОД
                </li>
            </ul>
        </div>
        <div class="main-content">
            ${getContentByTab()}
        </div>
    `;
}

function getContentByTab() {
    switch(activeTab) {
        case 'orders':
            return `
                <h2 class="content-title">ВАШИ ЗАКАЗЫ</h2>
                <div class="empty-state">
                    <i class="fas fa-shopping-bag"></i>
                    <h3>Здесь пока пусто</h3>
                    <p>Со временем этот раздел заполнится историей ваших заказов.</p>
                </div>
            `;
            
        case 'favorites':
            return `
                <h2 class="content-title">ВАШЕ ИЗБРАННОЕ</h2>
                <div class="empty-state">
                    <i class="fas fa-heart"></i>
                    <h3>Здесь пока пусто</h3>
                    <p>Со временем этот раздел заполнится теми товарами, которые вам понравились.</p>
                </div>
            `;
            
        case 'profile':
            return `
                <h2 class="content-title">ПЕРСОНАЛЬНЫЕ ДАННЫЕ</h2>
                <div class="profile-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Фамилия</label>
                            <input type="text" id="lastName" placeholder="Введите фамилию" value="${userProfile.lastName || ''}">
                        </div>
                        <div class="form-group">
                            <label>Имя</label>
                            <input type="text" id="firstName" placeholder="Введите имя" value="${userProfile.firstName || ''}">
                        </div>
                        <div class="form-group">
                            <label>Отчество</label>
                            <input type="text" id="patronymic" placeholder="Введите отчество" value="${userProfile.patronymic || ''}">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Телефон</label>
                            <input type="tel" id="phone" value="${userProfile.phone || ''}">
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" id="email" value="${userProfile.email || currentUser?.email || ''}">
                        </div>
                        <div class="form-group">
                            <label>Дата рождения</label>
                            <input type="date" id="birthDate" value="${userProfile.birthDate || ''}">
                        </div>
                    </div>
                    <a href="#" class="change-password" onclick="alert('Функция смены пароля будет доступна в следующей версии'); return false;">
                        <i class="fas fa-key"></i> Изменить пароль →
                    </a>
                    
                    <div style="margin-top: 30px;">
                        <h3 style="color: #b76e79; margin-bottom: 15px;">Дети</h3>
                        <div id="childrenList"></div>
                        <button class="add-child-btn" onclick="window.addChild()">
                            <i class="fas fa-plus"></i> Добавить ребенка
                        </button>
                    </div>
                    
                    <div style="margin-top: 30px;">
                        <h3 style="color: #b76e79; margin-bottom: 15px;">АДРЕСА ДОСТАВКИ</h3>
                        <div id="addressesList"></div>
                        <button class="add-child-btn" onclick="window.addAddress()">
                            <i class="fas fa-plus"></i> Добавить адрес
                        </button>
                    </div>
                    
                    <button class="save-btn" onclick="window.saveProfileData()">СОХРАНИТЬ ИЗМЕНЕНИЯ</button>
                </div>
            `;
            
        case 'discounts':
            return `
                <h2 class="content-title">ПРОМОКОДЫ</h2>
                <div class="promo-card">
                    <i class="fas fa-gift fa-2x"></i>
                    <h3 style="margin: 15px 0;">Рады, что вы с нами!</h3>
                    <p>Вам подарок 500 ₽</p>
                    <p>Скопируйте код и примените его при оформлении заказа в корзине.</p>
                    <div class="promo-code">RHE79K</div>
                    <button class="copy-btn" onclick="window.copyPromoCode('RHE79K')">
                        <i class="fas fa-copy"></i> СКОПИРОВАТЬ КОД
                    </button>
                </div>
                
                <div style="background: #faece5; border-radius: 40px; padding: 30px; margin-top: 20px;">
                    <h3 style="color: #b76e79; margin-bottom: 20px;">Подпишитесь на наши новости</h3>
                    <p style="margin-bottom: 20px;">чтобы среди первых узнавать о новинках и акциях</p>
                    <div class="form-group">
                        <label>E-мейл</label>
                        <input type="email" id="subscribeEmail" placeholder="Ваш email" value="${currentUser?.email || ''}">
                    </div>
                    <label class="checkbox-label" style="display: flex; align-items: center; gap: 10px; margin: 15px 0;">
                        <input type="checkbox" id="agreePrivacy"> 
                        <span>Я согласен с условиями политики конфиденциальности</span>
                    </label>
                    <button class="save-btn" onclick="window.subscribeNews()">ПОДПИСАТЬСЯ</button>
                </div>
            `;
            
        case 'referrals':
            const refCode = 'W8eKP';
            return `
                <h2 class="content-title">РЕФЕРАЛЬНАЯ ПРОГРАММА</h2>
                <div class="ref-code">
                    <p>ВАШ ПЕРСОНАЛЬНЫЙ КОД:</p>
                    <span>${refCode}</span>
                    <div style="margin-top: 15px;">
                        <button class="copy-btn" onclick="window.copyRefCode('${refCode}')">
                            <i class="fas fa-copy"></i> СКОПИРОВАТЬ
                        </button>
                    </div>
                </div>
                
                <div class="stats-grid">
                    <div class="stat-card">
                        <h4>Уровень 1</h4>
                        <p>ВАШ УРОВЕНЬ</p>
                    </div>
                    <div class="stat-card">
                        <h4>0</h4>
                        <p>ЗАКАЗЫ ПО ВАШЕЙ ССЫЛКЕ</p>
                    </div>
                    <div class="stat-card">
                        <h4>0 ₽</h4>
                        <p>ВАШ БАЛАНС</p>
                    </div>
                </div>
            `;
            
        default:
            return '';
    }
}

function renderChildren() {
    const container = document.getElementById('childrenList');
    if (!container) return;
    
    if (userProfile.children.length === 0) {
        container.innerHTML = '<p style="color: #7f5a5a; padding: 10px 0;">Данные о детях не добавлены</p>';
    } else {
        container.innerHTML = userProfile.children.map((child, index) => `
            <div class="child-block">
                <div class="form-row">
                    <div class="form-group">
                        <label>Имя ребенка</label>
                        <input type="text" value="${child.name}" onchange="window.updateChild(${index}, 'name', this.value)">
                    </div>
                    <div class="form-group">
                        <label>Дата рождения</label>
                        <input type="date" value="${child.birthDate}" onchange="window.updateChild(${index}, 'birthDate', this.value)">
                    </div>
                    <button onclick="window.removeChild(${index})" style="background: none; border: none; color: #f14668; cursor: pointer;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
}

function renderAddresses() {
    const container = document.getElementById('addressesList');
    if (!container) return;
    
    if (addresses.length === 0) {
        container.innerHTML = '<p style="color: #7f5a5a; padding: 10px 0;">Адреса не добавлены</p>';
    } else {
        container.innerHTML = addresses.map((addr, index) => `
            <div class="child-block">
                <div class="form-row">
                    <div class="form-group">
                        <label>Адрес</label>
                        <input type="text" value="${addr.address}" onchange="window.updateAddress(${index}, 'address', this.value)">
                    </div>
                    <div class="form-group">
                        <label>Квартира</label>
                        <input type="text" value="${addr.apartment || ''}" onchange="window.updateAddress(${index}, 'apartment', this.value)">
                    </div>
                    <button onclick="window.removeAddress(${index})" style="background: none; border: none; color: #f14668; cursor: pointer;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
}

// Глобальные функции
window.addChild = function() {
    userProfile.children.push({ name: '', birthDate: '' });
    saveProfile();
    renderChildren();
}

window.updateChild = function(index, field, value) {
    userProfile.children[index][field] = value;
    saveProfile();
}

window.removeChild = function(index) {
    userProfile.children.splice(index, 1);
    saveProfile();
    renderChildren();
}

window.addAddress = function() {
    addresses.push({ address: '', apartment: '' });
    saveAddresses();
    renderAddresses();
}

window.updateAddress = function(index, field, value) {
    addresses[index][field] = value;
    saveAddresses();
}

window.removeAddress = function(index) {
    addresses.splice(index, 1);
    saveAddresses();
    renderAddresses();
}

window.saveProfileData = function() {
    userProfile.lastName = document.getElementById('lastName')?.value || '';
    userProfile.firstName = document.getElementById('firstName')?.value || '';
    userProfile.patronymic = document.getElementById('patronymic')?.value || '';
    userProfile.phone = document.getElementById('phone')?.value || '';
    userProfile.email = document.getElementById('email')?.value || '';
    userProfile.birthDate = document.getElementById('birthDate')?.value || '';
    saveProfile();
    alert('Данные сохранены!');
}

window.copyPromoCode = function(code) {
    navigator.clipboard.writeText(code);
    alert('Промокод скопирован: ' + code);
}

window.copyRefCode = function(code) {
    navigator.clipboard.writeText(code);
    alert('Реферальный код скопирован: ' + code);
}

window.subscribeNews = function() {
    const email = document.getElementById('subscribeEmail')?.value;
    const agree = document.getElementById('agreePrivacy')?.checked;
    if (!email) {
        alert('Введите email');
        return;
    }
    if (!agree) {
        alert('Подтвердите согласие с политикой конфиденциальности');
        return;
    }
    alert('Вы успешно подписались на новости!');
}

window.setActiveTab = function(tab) {
    activeTab = tab;
    renderCabinet();
    if (tab === 'profile') {
        setTimeout(() => {
            renderChildren();
            renderAddresses();
        }, 50);
    }
}

window.logout = function() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Проверка авторизации
if (!currentUser) {
    window.location.href = 'login.html';
} else {
    renderCabinet();
}