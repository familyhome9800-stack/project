// Карусель отзывов с автоматической загрузкой
let currentSlide = 0;
let slidesToShow = 3;
let allReviews = [];

// Загрузка отзывов при старте
async function loadReviews() {
    showLoading();
    
    try {
        allReviews = await window.reviewsLoader.loadAllReviews();
        renderReviews();
    } catch (error) {
        console.error('Ошибка загрузки отзывов:', error);
        allReviews = window.reviewsLoader.getFallbackReviews();
        renderReviews();
    }
}

// Показать загрузку
function showLoading() {
    const wrapper = document.getElementById('reviewsWrapper');
    if (wrapper) {
        wrapper.innerHTML = `
            <div style="width: 100%; text-align: center; padding: 50px;">
                <div style="font-size: 40px; margin-bottom: 20px;">⏳</div>
                <p style="color: #b76e79;">Загружаем свежие отзывы...</p>
            </div>
        `;
    }
}

// Функции для карусели
function updateSlidesToShow() {
    if (window.innerWidth <= 768) {
        slidesToShow = 1;
    } else if (window.innerWidth <= 992) {
        slidesToShow = 2;
    } else {
        slidesToShow = 3;
    }
}

function renderReviews() {
    const wrapper = document.getElementById('reviewsWrapper');
    if (!wrapper) return;
    
    wrapper.innerHTML = '';
    
    allReviews.forEach(review => {
        const card = document.createElement('div');
        card.className = 'review-card';
        
        // Добавляем метку источника
        const sourceIcon = review.source === 'yandex' ? '🇾' : (review.source === '2gis' ? '📍' : '💬');
        
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <h5 style="margin:0;">${review.title}</h5>
                <span style="font-size: 14px; color: #b76e79;" title="${review.source === 'yandex' ? 'Яндекс' : (review.source === '2gis' ? '2ГИС' : 'Наш магазин')}">${sourceIcon}</span>
            </div>
            <div class="stars">${review.stars}</div>
            <p>${review.text}</p>
            <div class="review-footer">
                <span>${review.author}</span>
                <span>${review.stars}</span>
            </div>
            ${review.date ? `<div style="font-size:12px; color:#9c7a6a; margin-top:10px;">${new Date(review.date).toLocaleDateString('ru-RU')}</div>` : ''}
        `;
        wrapper.appendChild(card);
    });

    updateDots();
    updateSlidePosition();
}

function updateDots() {
    const dotsContainer = document.getElementById('carouselDots');
    if (!dotsContainer) return;
    
    const totalSlides = Math.ceil(allReviews.length / slidesToShow);
    dotsContainer.innerHTML = '';

    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.className = `dot ${i === currentSlide ? 'active' : ''}`;
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
}

function updateSlidePosition() {
    const wrapper = document.getElementById('reviewsWrapper');
    if (!wrapper || !wrapper.children[0]) return;
    
    const cardWidth = wrapper.children[0].offsetWidth;
    const gap = 24;
    const shift = -(currentSlide * (cardWidth + gap) * slidesToShow);
    wrapper.style.transform = `translateX(${shift}px)`;
}

function goToSlide(n) {
    const maxSlide = Math.ceil(allReviews.length / slidesToShow) - 1;
    currentSlide = Math.min(Math.max(n, 0), maxSlide);
    
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
    
    updateSlidePosition();
}

window.slideReviews = function(direction) {
    const maxSlide = Math.ceil(allReviews.length / slidesToShow) - 1;
    currentSlide = currentSlide + direction;
    
    if (currentSlide < 0) {
        currentSlide = maxSlide;
    } else if (currentSlide > maxSlide) {
        currentSlide = 0;
    }
    
    goToSlide(currentSlide);
};

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    updateSlidesToShow();
    loadReviews();
});

window.addEventListener('resize', function() {
    updateSlidesToShow();
    updateSlidePosition();
    updateDots();
});