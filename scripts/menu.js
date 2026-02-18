// Бургер-меню
document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.getElementById('burgerMenu');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const menuOverlay = document.getElementById('menuOverlay');

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
        if (e.key === 'Escape' && dropdownMenu?.classList.contains('active')) {
            toggleMenu();
        }
    });
});