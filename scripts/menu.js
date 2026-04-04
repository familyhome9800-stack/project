// Бургер-меню + модальное окно звонка
document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.getElementById('burgerMenu');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const callModal = document.getElementById('callModal');
    const callForm = document.getElementById('callForm');

    function toggleMenu() {
        burgerMenu.classList.toggle('active');
        dropdownMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = dropdownMenu.classList.contains('active') ? 'hidden' : '';
    }

    if (burgerMenu) {
        burgerMenu.addEventListener('click', toggleMenu);
    }
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', toggleMenu);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (dropdownMenu?.classList.contains('active')) {
                toggleMenu();
            }
            if (callModal?.classList.contains('active')) {
                closeCallModal();
            }
        }
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.dropdown-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (dropdownMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // ===== ФУНКЦИИ МОДАЛЬНОГО ОКНА ЗВОНКА =====
    window.openCallModal = function() {
        if (callModal) {
            callModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    window.closeCallModal = function() {
        if (callModal) {
            callModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Закрытие по клику вне модального окна
    if (callModal) {
        callModal.addEventListener('click', function(e) {
            if (e.target === callModal) {
                closeCallModal();
            }
        });
    }

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