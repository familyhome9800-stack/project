// Добавление валидации + модальное окно
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    const callModal = document.getElementById('callModal');
    const callForm = document.getElementById('callForm');

    // ===== ВАЛИДАЦИЯ ОСНОВНОЙ ФОРМЫ =====
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Сбрасываем предыдущие ошибки
            document.querySelectorAll('.input.is-danger, .textarea.is-danger').forEach(el => {
                el.classList.remove('is-danger');
            });
            document.querySelectorAll('.help.is-danger').forEach(el => el.remove());
            
            let isValid = true;
            
            // Проверка ФИО
            const fullname = document.getElementById('fullname');
            const fullnameValue = fullname.value.trim();
            if (fullnameValue === '') {
                showError(fullname, 'Введите фамилию и имя');
                isValid = false;
            } else if (fullnameValue.split(' ').length < 2) {
                showError(fullname, 'Введите фамилию и имя');
                isValid = false;
            }
            
            // Проверка телефона
            const phone = document.getElementById('phone');
            const phoneValue = phone.value.trim();
            const phoneDigits = phoneValue.replace(/\D/g, '');
            if (phoneValue === '') {
                showError(phone, 'Введите номер телефона');
                isValid = false;
            } else if (phoneDigits.length < 10) {
                showError(phone, 'Введите 10 цифр номера');
                isValid = false;
            }
            
            // Проверка email
            const email = document.getElementById('email');
            const emailValue = email.value.trim();
            if (emailValue === '') {
                showError(email, 'Введите email');
                isValid = false;
            } else if (!emailValue.includes('@') || !emailValue.includes('.')) {
                showError(email, 'Введите корректный email');
                isValid = false;
            }
            
            // Если всё корректно
            if (isValid) {
                const formData = {
                    fullname: fullnameValue,
                    phone: phoneValue,
                    email: emailValue,
                    message: document.getElementById('message').value.trim() || '(не заполнено)'
                };
                const event = new CustomEvent('formValid', { detail: formData });
                document.dispatchEvent(event);
                alert('Форма отправлена! Данные в консоли.');
                form.reset();
            }
        });
        
        // Функция показа ошибки
        function showError(input, message) {
            input.classList.add('is-danger');
            const help = document.createElement('p');
            help.classList.add('help', 'is-danger');
            help.textContent = message;
            input.parentNode.parentNode.appendChild(help);
        }
        
        // Сброс ошибки при вводе
        document.querySelectorAll('.input, .textarea').forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('is-danger');
                const parent = this.parentNode.parentNode;
                const errors = parent.querySelectorAll('.help.is-danger');
                errors.forEach(el => el.remove());
            });
        });
    }

    // ===== МОДАЛЬНОЕ ОКНО ЗАКАЗА ЗВОНКА =====
    window.openCallModal = function() {
        callModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    window.closeCallModal = function() {
        callModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Закрытие по клику вне модального окна
    if (callModal) {
        callModal.addEventListener('click', function(e) {
            if (e.target === callModal) {
                closeCallModal();
            }
        });
    }

    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && callModal?.classList.contains('active')) {
            closeCallModal();
        }
    });

    // Обработка отправки формы звонка
    if (callForm) {
        callForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const name = document.getElementById('callName').value;
            const phone = document.getElementById('callPhone').value;
            const time = document.getElementById('callTime').value || 'Не указано';
            
            console.log('=== ЗАКАЗ ЗВОНКА ===');
            console.log('Имя:', name);
            console.log('Телефон:', phone);
            console.log('Удобное время:', time);
            console.log('===================');
            
            alert('Спасибо! Мы перезвоним вам в ближайшее время.');
            closeCallModal();
            callForm.reset();
        });
    }
});