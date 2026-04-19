// Корзина товаров
class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.updateCartIcon();
    }

    loadCart() {
        const saved = localStorage.getItem('shoppingCart');
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
        this.updateCartIcon();
    }

    addItem(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image || '🛍️',
                quantity: 1
            });
        }
        
        this.saveCart();
        return this.getTotalCount();
    }

    removeItem(id) {
        this.cart = this.cart.filter(item => item.id !== id);
        this.saveCart();
    }

    updateQuantity(id, quantity) {
        const item = this.cart.find(item => item.id === id);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
        }
    }

    getTotalCount() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    getTotalPrice() {
        return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
    }

    getItems() {
        return [...this.cart];
    }

    updateCartIcon() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const count = this.getTotalCount();
            cartCount.textContent = count;
            cartCount.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    openCartModal() {
        const modal = document.getElementById('cartModal');
        if (modal) {
            this.renderCartModal();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeCartModal() {
        const modal = document.getElementById('cartModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    renderCartModal() {
        const cartItemsContainer = document.getElementById('cartItems');
        const cartTotalSpan = document.getElementById('cartTotal');
        
        if (!cartItemsContainer) return;
        
        const items = this.getItems();
        
        if (items.length === 0) {
            cartItemsContainer.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <i class="fas fa-shopping-bag fa-3x" style="color: #edd7cb;"></i>
                    <p style="color: #7f5a5a; margin-top: 20px;">Корзина пуста</p>
                </div>
            `;
            if (cartTotalSpan) cartTotalSpan.textContent = '0';
            return;
        }
        
        cartItemsContainer.innerHTML = items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price}₽</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="cart-qty-btn" onclick="window.cartManager.updateQuantityItem(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="cart-qty-btn" onclick="window.cartManager.updateQuantityItem(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <div class="cart-item-total">${item.price * item.quantity}₽</div>
                <button class="cart-remove-btn" onclick="window.cartManager.removeItemFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
        
        if (cartTotalSpan) cartTotalSpan.textContent = this.getTotalPrice();
    }

    updateQuantityItem(id, newQuantity) {
        if (newQuantity < 1) {
            this.removeItem(id);
        } else {
            this.updateQuantity(id, newQuantity);
        }
        this.renderCartModal();
        this.updateCartIcon();
    }

    removeItemFromCart(id) {
        this.removeItem(id);
        this.renderCartModal();
        this.updateCartIcon();
    }
}

// Глобальный экземпляр
window.cartManager = new CartManager();

// Функции для глобального вызова
window.addToCart = function(product) {
    const count = window.cartManager.addItem(product);
    const cartIcon = document.querySelector('.icon-wrapper i.fa-shopping-bag')?.parentElement;
    if (cartIcon) {
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 200);
    }
    alert(`Товар "${product.name}" добавлен в корзину!`);
    return count;
};

window.openCart = function() {
    window.cartManager.openCartModal();
};

window.closeCart = function() {
    window.cartManager.closeCartModal();
};