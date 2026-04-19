function renderAuth() {
    const container = document.getElementById('authContainer');
    
    container.innerHTML = `
        <div class="auth-header">
            <h1>Самая Красивая</h1>
        </div>
        <div class="tabs">
            <button class="tab-btn active" data-tab="login">ВХОД</button>
            <button class="tab-btn" data-tab="register">РЕГИСТРАЦИЯ</button>
        </div>

        <div class="tab-content active" id="tab-login">
            <a href="javascript:history.back()" class="back-link">
                <i class="fas fa-arrow-left"></i> НАЗАД
            </a>
            <div class="error-message" id="loginError"></div>
            <div class="success-message" id="loginSuccess"></div>
            <form id="loginForm">
                <div class="input-group">
                    <label>E-мейл</label>
                    <input type="email" id="loginEmail" placeholder="example@mail.ru" required>
                </div>
                <div class="input-group">
                    <label>Пароль</label>
                    <input type="password" id="loginPassword" placeholder="••••••••" required>
                </div>
                <button type="submit" class="submit-btn">ВОЙТИ</button>
            </form>
            <div class="forgot-link">
                <a href="#" onclick="switchToReset()">Забыли пароль? Вам сюда</a>
            </div>
            <div class="divider">
                <span>или войдите через</span>
            </div>
            <div class="social-buttons">
                <button class="social-btn" onclick="socialLogin('vk')">
                    <i class="fab fa-vk"></i> ВКонтакте
                </button>
                <button class="social-btn" onclick="socialLogin('google')">
                    <i class="fab fa-google"></i> Google
                </button>
            </div>
        </div>

        <div class="tab-content" id="tab-register">
            <a href="javascript:history.back()" class="back-link">
                <i class="fas fa-arrow-left"></i> НАЗАД
            </a>
            <div class="error-message" id="registerError"></div>
            <div class="success-message" id="registerSuccess"></div>
            <form id="registerForm">
                <div class="input-group">
                    <label>Е-мейл</label>
                    <input type="email" id="registerEmail" placeholder="example@mail.ru" required>
                </div>
                <div class="input-group">
                    <label>Пароль</label>
                    <input type="password" id="registerPassword" placeholder="••••••••" required>
                </div>
                <div class="input-group">
                    <label>Подтверждение пароля</label>
                    <input type="password" id="registerPasswordConfirm" placeholder="••••••••" required>
                </div>
                <div class="checkbox-group">
                    <label class="checkbox-label">
                        <input type="checkbox" id="agreeTerms" required>
                        <span>Я согласен с условиями Пользовательского соглашения</span>
                    </label>
                </div>
                <div class="checkbox-group">
                    <label class="checkbox-label">
                        <input type="checkbox" id="agreePrivacy" required>
                        <span>Я даю Согласие на обработку своих персональных данных в соответствии с Политикой Конфиденциальности</span>
                    </label>
                </div>
                <div class="checkbox-group">
                    <label class="checkbox-label">
                        <input type="checkbox" id="agreeMarketing">
                        <span>Я даю Согласие на получение рекламной и информационной рассылки</span>
                    </label>
                </div>
                <button type="submit" class="submit-btn">ПРОДОЛЖИТЬ</button>
            </form>
            <div class="divider">
                <span>или зарегистрируйтесь через</span>
            </div>
            <div class="social-buttons">
                <button class="social-btn" onclick="socialLogin('vk')">
                    <i class="fab fa-vk"></i> ВКонтакте
                </button>
                <button class="social-btn" onclick="socialLogin('google')">
                    <i class="fab fa-google"></i> Google
                </button>
            </div>
        </div>
    `;
    
    initAuthForms();
}

function initAuthForms() {
    // Переключение вкладок
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(`tab-${tabId}`).classList.add('active');
            clearMessages();
        });
    });
    
    // ВХОД
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (!email || !password) {
                showMessage(document.getElementById('loginError'), 'Заполните все поля');
                return;
            }
            
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify({ email: user.email, name: user.name || email.split('@')[0] }));
                showMessage(document.getElementById('loginSuccess'), 'Вход выполнен!', false);
                setTimeout(() => {
                    window.location.href = 'profile.html';
                }, 1000);
            } else {
                const emailExists = users.some(u => u.email === email);
                if (emailExists) {
                    showMessage(document.getElementById('loginError'), 'Неверный пароль');
                } else {
                    showMessage(document.getElementById('loginError'), 'Пользователь не найден. Зарегистрируйтесь');
                }
            }
        });
    }
    
    // РЕГИСТРАЦИЯ
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const passwordConfirm = document.getElementById('registerPasswordConfirm').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;
            const agreePrivacy = document.getElementById('agreePrivacy').checked;
            
            if (!email || !password || !passwordConfirm) {
                showMessage(document.getElementById('registerError'), 'Заполните все поля');
                return;
            }
            if (password !== passwordConfirm) {
                showMessage(document.getElementById('registerError'), 'Пароли не совпадают');
                return;
            }
            if (password.length < 6) {
                showMessage(document.getElementById('registerError'), 'Пароль должен содержать минимум 6 символов');
                return;
            }
            if (!agreeTerms || !agreePrivacy) {
                showMessage(document.getElementById('registerError'), 'Необходимо согласие с условиями и политикой конфиденциальности');
                return;
            }
            
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            if (users.some(u => u.email === email)) {
                showMessage(document.getElementById('registerError'), 'Пользователь с таким email уже существует');
                return;
            }
            
            users.push({
                email: email,
                password: password,
                name: email.split('@')[0],
                marketing: document.getElementById('agreeMarketing').checked,
                registeredAt: new Date().toISOString()
            });
            localStorage.setItem('users', JSON.stringify(users));
            
            showMessage(document.getElementById('registerSuccess'), 'Регистрация успешна!', false);
            registerForm.reset();
            
            setTimeout(() => {
                document.querySelector('.tab-btn[data-tab="login"]').click();
            }, 1500);
        });
    }
}

function switchToReset() {
    const resetHtml = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; border-radius: 60px; padding: 40px; z-index: 1001; width: 90%; max-width: 450px;">
            <a href="javascript:closeResetModal()" class="back-link">
                <i class="fas fa-arrow-left"></i> НАЗАД
            </a>
            <h2 class="form-title">ВОССТАНОВИТЬ ПАРОЛЬ</h2>
            <div class="error-message" id="resetError"></div>
            <div class="success-message" id="resetSuccess"></div>
            <form id="resetForm">
                <div class="input-group">
                    <label>E-мейл</label>
                    <input type="email" id="resetEmail" placeholder="example@mail.ru" required>
                </div>
                <button type="submit" class="submit-btn">ВОССТАНОВИТЬ</button>
            </form>
        </div>
        <div id="resetOverlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000;" onclick="closeResetModal()"></div>
    `;
    document.body.insertAdjacentHTML('beforeend', resetHtml);
    document.body.style.overflow = 'hidden';
    
    const resetForm = document.getElementById('resetForm');
    if (resetForm) {
        resetForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('resetEmail').value;
            if (!email) {
                showMessage(document.getElementById('resetError'), 'Введите email');
                return;
            }
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email);
            if (user) {
                const newPassword = Math.random().toString(36).slice(-8);
                user.password = newPassword;
                localStorage.setItem('users', JSON.stringify(users));
                showMessage(document.getElementById('resetSuccess'), `Новый пароль: ${newPassword}`, false);
                setTimeout(() => {
                    closeResetModal();
                }, 3000);
            } else {
                showMessage(document.getElementById('resetError'), 'Пользователь с таким email не найден');
            }
        });
    }
}

function closeResetModal() {
    const modal = document.querySelector('#resetOverlay')?.parentElement;
    if (modal) modal.remove();
    const overlay = document.getElementById('resetOverlay');
    if (overlay) overlay.remove();
    document.body.style.overflow = '';
}

window.closeResetModal = closeResetModal;
window.switchToReset = switchToReset;

function socialLogin(provider) {
    alert(`Авторизация через ${provider.toUpperCase()} будет доступна в следующей версии!`);
}

window.socialLogin = socialLogin;

function clearMessages() {
    document.querySelectorAll('.error-message, .success-message').forEach(msg => {
        msg.style.display = 'none';
        msg.textContent = '';
    });
}

function showMessage(element, message, isError = true) {
    element.textContent = message;
    element.style.display = 'block';
    setTimeout(() => {
        element.style.display = 'none';
    }, 3000);
}

// Инициализация
renderAuth();