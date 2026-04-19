// Общие функции для страниц каталогов

// Товары для аксессуаров
const accessoriesProducts = [
    { id: 1, name: "Сумка-шоппер", type: "bag", material: "textile", price: 899, image: "👜" },
    { id: 2, name: "Серьги с жемчугом", type: "jewelry", material: "metal", price: 499, image: "💎" },
    { id: 3, name: "Шёлковый платок", type: "scarf", material: "textile", price: 699, image: "🧣" },
    { id: 4, name: "Кожаный ремень", type: "belt", material: "leather", price: 1199, image: "⛓️" },
    { id: 5, name: "Панама летняя", type: "hat", material: "textile", price: 399, image: "🧢" },
    { id: 6, name: "Наручные часы", type: "watch", material: "metal", price: 2499, image: "⌚" },
    { id: 7, name: "Солнцезащитные очки", type: "glasses", material: "plastic", price: 899, image: "👓" },
    { id: 8, name: "Рюкзак городской", type: "bag", material: "leather", price: 1999, image: "🎒" },
    { id: 9, name: "Браслет из дерева", type: "jewelry", material: "wood", price: 299, image: "📿" },
    { id: 10, name: "Шапка-бини", type: "hat", material: "textile", price: 499, image: "🧤" }
];

// Товары для детей
const childrenProducts = [
    { id: 1, name: "Боди для новорожденного", age: "0-3", height: "56-62", gender: "unisex", price: 599, image: "👕" },
    { id: 2, name: "Ползунки хлопковые", age: "3-6", height: "62-68", gender: "unisex", price: 449, image: "👖" },
    { id: 3, name: "Платье для девочки", age: "1-2", height: "80-86", gender: "girl", price: 899, image: "👗" },
    { id: 4, name: "Комбинезон для мальчика", age: "2-3", height: "86-92", gender: "boy", price: 1299, image: "🧥" },
    { id: 5, name: "Пижама детская", age: "3-4", height: "98-104", gender: "unisex", price: 799, image: "👕" },
    { id: 6, name: "Джинсы для девочки", age: "5-6", height: "110-116", gender: "girl", price: 999, image: "👖" },
    { id: 7, name: "Свитшот с принтом", age: "6-7", height: "116-122", gender: "unisex", price: 1099, image: "👚" },
    { id: 8, name: "Школьная форма", age: "7-8", height: "122-128", gender: "unisex", price: 1899, image: "👔" },
    { id: 9, name: "Спортивный костюм", age: "8-9", height: "128-134", gender: "boy", price: 1499, image: "🏃" },
    { id: 10, name: "Платье выпускное", age: "10-11", height: "140-146", gender: "girl", price: 2499, image: "👗" },
    { id: 11, name: "Пальто зимнее", age: "11-12", height: "146-152", gender: "unisex", price: 2999, image: "🧥" }
];

// Товары для женщин
const womenProducts = [
    { id: 1, name: "Элегантное платье", type: "dress", price: 3499, image: "👗", sizes: ["XS", "S", "M"] },
    { id: 2, name: "Классические джинсы", type: "jeans", price: 2899, image: "👖", sizes: ["S", "M", "L"] },
    { id: 3, name: "Шёлковая блуза", type: "blouse", price: 1999, image: "👚", sizes: ["M", "L", "XL"] },
    { id: 4, name: "Кашемировый свитер", type: "sweater", price: 4299, image: "🧥", sizes: ["L", "XL", "XXL"] },
    { id: 5, name: "Платье-футляр", type: "dress", price: 3999, image: "👗", sizes: ["XS", "S"] },
    { id: 6, name: "Джинсы скинни", type: "jeans", price: 2599, image: "👖", sizes: ["M", "L", "XL"] },
    { id: 7, name: "Пальто двубортное", type: "coat", price: 8999, image: "🧥", sizes: ["S", "M", "L", "XL"] },
    { id: 8, name: "Блуза с воротником", type: "blouse", price: 1799, image: "👚", sizes: ["XS", "S", "M"] },
    { id: 9, name: "Свитер оверсайз", type: "sweater", price: 3499, image: "🧥", sizes: ["XL", "XXL"] },
    { id: 10, name: "Платье-макси", type: "dress", price: 4599, image: "👗", sizes: ["M", "L", "XL"] }
];

// Определяем текущую страницу
let currentProducts = [];
let products = [];

function initCatalog(productsArray) {
    products = productsArray;
    currentProducts = [...products];
    renderProducts();
}

function toggleFilter(header) {
    header.classList.toggle('active');
    const content = header.nextElementSibling;
    content.classList.toggle('active');
}

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const noProducts = document.getElementById('noProducts');
    
    if (!grid) return;
    
    if (currentProducts.length === 0) {
        grid.style.display = 'none';
        if (noProducts) noProducts.style.display = 'block';
        return;
    }
    
    grid.style.display = 'grid';
    if (noProducts) noProducts.style.display = 'none';
    
    grid.innerHTML = currentProducts.map(product => {
        // Определяем, какие дополнительные поля показывать
        let sizeInfo = '';
        if (product.sizes) {
            sizeInfo = `<div class="product-size">Размеры: ${product.sizes.join(', ')}</div>`;
        } else if (product.age) {
            sizeInfo = `<div class="product-size">Возраст: ${product.age} мес / Рост: ${product.height} см</div>`;
        } else if (product.material) {
            sizeInfo = `<div class="product-size">Материал: ${product.material}</div>`;
        }
        
        return `
            <div class="product-card">
                <div class="product-image">${product.image}</div>
                <h3 class="product-title">${product.name}</h3>
                ${sizeInfo}
                <div class="product-price">${product.price}₽</div>
                <button class="add-to-cart" onclick="window.addToCart({id: ${product.id}, name: '${product.name}', price: ${product.price}, image: '${product.image}'})">
                    <i class="fas fa-shopping-cart"></i> В корзину
                </button>
            </div>
        `;
    }).join('');
}

function applyFilters() {
    const selectedTypes = Array.from(document.querySelectorAll('.type-filter:checked')).map(cb => cb.value);
    const selectedMaterials = Array.from(document.querySelectorAll('.material-filter:checked')).map(cb => cb.value);
    const selectedAges = Array.from(document.querySelectorAll('.age-filter:checked')).map(cb => cb.value);
    const selectedHeights = Array.from(document.querySelectorAll('.height-filter:checked')).map(cb => cb.value);
    const selectedGenders = Array.from(document.querySelectorAll('.gender-filter:checked')).map(cb => cb.value);
    const selectedSizes = Array.from(document.querySelectorAll('.size-filter:checked')).map(cb => cb.value);
    const minPrice = document.getElementById('minPrice')?.value;
    const maxPrice = document.getElementById('maxPrice')?.value;
    
    currentProducts = products.filter(product => {
        if (selectedTypes.length > 0 && !selectedTypes.includes(product.type)) return false;
        if (selectedMaterials.length > 0 && !selectedMaterials.includes(product.material)) return false;
        if (selectedAges.length > 0 && !selectedAges.includes(product.age)) return false;
        if (selectedHeights.length > 0 && !selectedHeights.includes(product.height)) return false;
        if (selectedGenders.length > 0 && !selectedGenders.includes(product.gender)) return false;
        if (selectedSizes.length > 0 && !selectedSizes.some(s => product.sizes?.includes(s))) return false;
        if (minPrice && product.price < parseInt(minPrice)) return false;
        if (maxPrice && product.price > parseInt(maxPrice)) return false;
        return true;
    });
    
    applySort();
}

function applySort() {
    const sortSelect = document.getElementById('sortSelect');
    if (!sortSelect) return;
    
    const sortValue = sortSelect.value;
    if (sortValue === 'price-asc') currentProducts.sort((a, b) => a.price - b.price);
    else if (sortValue === 'price-desc') currentProducts.sort((a, b) => b.price - a.price);
    else if (sortValue === 'name-asc') currentProducts.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortValue === 'name-desc') currentProducts.sort((a, b) => b.name.localeCompare(a.name));
    renderProducts();
}

function resetFilters() {
    document.querySelectorAll('.type-filter:checked, .material-filter:checked, .age-filter:checked, .height-filter:checked, .gender-filter:checked, .size-filter:checked').forEach(cb => cb.checked = false);
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    if (minPrice) minPrice.value = '';
    if (maxPrice) maxPrice.value = '';
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) sortSelect.value = 'default';
    currentProducts = [...products];
    renderProducts();
}

// Определяем, какая страница загружена, и инициализируем соответствующие товары
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    
    if (path.includes('catalog-accessories')) {
        initCatalog(accessoriesProducts);
    } else if (path.includes('catalog-children')) {
        initCatalog(childrenProducts);
    } else if (path.includes('catalog-women')) {
        initCatalog(womenProducts);
    }
    
    // Навешиваем обработчики фильтров
    const resetBtn = document.getElementById('resetFilters');
    if (resetBtn) resetBtn.addEventListener('click', resetFilters);
    
    const applyPriceBtn = document.getElementById('applyPrice');
    if (applyPriceBtn) applyPriceBtn.addEventListener('click', applyFilters);
    
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) sortSelect.addEventListener('change', applyFilters);
    
    document.querySelectorAll('.type-filter, .material-filter, .age-filter, .height-filter, .gender-filter, .size-filter').forEach(cb => {
        cb.addEventListener('change', applyFilters);
    });
});