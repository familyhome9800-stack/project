// Добавление скрипта вывода в консоль
document.addEventListener('DOMContentLoaded', function() {
    // Слушаем кастомное событие formValid, которое диспатчит validation.js
    document.addEventListener('formValid', function(event) {
        // Получаем данные формы из события
        const formData = event.detail;
        
        // Очищаем консоль для наглядности (опционально)
        console.clear();
        
        // Построчный вывод данных
        console.log('=== ОТПРАВКА ФОРМЫ ===');
        console.log('ФИО:', formData.fullname);
        console.log('Телефон:', formData.phone);
        console.log('Email:', formData.email);
        console.log('Сообщение:', formData.message);
        
        const timestamp = new Date().toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        console.log('Время отправки:', timestamp);
        console.log('=====================');
    });
});