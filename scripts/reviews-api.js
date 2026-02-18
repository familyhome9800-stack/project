// Загрузка отзывов из API
class ReviewsLoader {
    constructor() {
        this.apiKeys = {
            yandex: 'ЯНДЕКС_API_КЛЮЧ',
            dgis: '2GIS_API_КЛЮЧ'     
        };
        
        // ID вашей организации
        this.orgIds = {
            yandex: '1234567890',
            dgis: '1234567890'     
        };
    }

    // Загрузка из Яндекс.Карт
    async loadFromYandex() {
        try {
            const response = await fetch(
                `https://api.yandex.ru/business/reviews/v1/reviews?businessId=${this.orgIds.yandex}`,
                {
                    headers: {
                        'Authorization': `Api-Key ${this.apiKeys.yandex}`
                    }
                }
            );
            
            if (!response.ok) throw new Error('Ошибка загрузки из Яндекс');
            
            const data = await response.json();
            return this.formatYandexReviews(data.reviews || []);
        } catch (error) {
            console.error('Яндекс отзывы временно недоступны', error);
            return [];
        }
    }

    // Загрузка из 2ГИС
    async loadFrom2GIS() {
        try {
            const response = await fetch(
                `https://catalog.api.2gis.ru/review/list?org_id=${this.orgIds.dgis}&key=${this.apiKeys.dgis}`
            );
            
            if (!response.ok) throw new Error('Ошибка загрузки из 2ГИС');
            
            const data = await response.json();
            return this.format2GISReviews(data.result?.items || []);
        } catch (error) {
            console.error('2ГИС отзывы временно недоступны', error);
            return [];
        }
    }

    // Форматирование отзывов Яндекса
    formatYandexReviews(reviews) {
        return reviews.map(review => ({
            title: this.generateTitle(review.text),
            text: review.text,
            author: review.author?.name || 'Аноним',
            stars: '⭐'.repeat(review.rating || 5),
            source: 'yandex',
            date: review.date
        }));
    }

    // Форматирование отзывов 2ГИС
    format2GISReviews(reviews) {
        return reviews.map(review => ({
            title: this.generateTitle(review.text),
            text: review.text,
            author: review.user?.name || 'Аноним',
            stars: '⭐'.repeat(review.rating || 5),
            source: '2gis',
            date: review.date
        }));
    }

    // Генерация заголовка из текста
    generateTitle(text) {
        if (!text) return 'Отзыв';
        const words = text.split(' ').slice(0, 5).join(' ');
        return words.length > 50 ? words.slice(0, 50) + '...' : words;
    }

    // Загрузка всех отзывов
    async loadAllReviews() {
        const [yandexReviews, gisReviews] = await Promise.all([
            this.loadFromYandex(),
            this.loadFrom2GIS()
        ]);

        // Объединяем и сортируем по дате (новые сверху)
        const allReviews = [...yandexReviews, ...gisReviews]
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        // Если отзывов нет, показываем заглушку
        if (allReviews.length === 0) {
            return this.getFallbackReviews();
        }

        return allReviews;
    }

    // Заглушка, если API недоступны
    getFallbackReviews() {
        return [
            {
                title: "Чудеса случаются!",
                text: "Искала идеальное платье на мероприятие. Как только зашла в магазин и рассказала о своих предпочтениях, мне сразу принесли ЕГО. То самое платье, о котором я так давно мечтала! Спасибо))",
                author: "Маргарита Семёнова",
                stars: "⭐⭐⭐⭐⭐",
                source: "local"
            },
            {
                title: "Долго искала, нашла здесь!",
                text: "Нужны были платья для подружек невесты, обошла все магазины, но не нашла ничего подходящего. А здесь отличный выбор, есть все размеры да ещё и ценник приятный. Обязательно загляну ещё!",
                author: "Анна Смирнова",
                stars: "⭐⭐⭐⭐⭐",
                source: "local"
            },
            {
                title: "Спасибо Позже",
                text: "Отличный магазин. Наконец-то нашла идеально подходящие джинсы! Ещё и скидку сделали 15% на первую покупку в магазине. Очень довольна. Рекомендую!",
                author: "Олеся Иванова",
                stars: "⭐⭐⭐⭐⭐",
                source: "local"
            }
        ];
    }
}