document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    const cartCountElement = document.getElementById('cart-count');
    const cartButton = document.getElementById('cart-button');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartStorageKey = 'bookstoreCartItems';

    navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });

    const escapeHtml = (value = '') => String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    const parsePrice = (priceText = '') => {
        const normalized = String(priceText).replace(/[^0-9.]/g, '');
        const price = Number.parseFloat(normalized);
        return Number.isFinite(price) ? price : 0;
    };

    const formatPrice = (price) => new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2
    }).format(price);

    const getCartItems = () => {
        try {
            const saved = window.localStorage.getItem(cartStorageKey);
            const parsed = JSON.parse(saved || '[]');
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            return [];
        }
    };

    const saveCartItems = (items) => {
        window.localStorage.setItem(cartStorageKey, JSON.stringify(items));
    };

    const getCartCount = (items) => items.reduce((total, item) => total + item.quantity, 0);

    const syncCartCount = () => {
        const cartItems = getCartItems();
        const cartCount = getCartCount(cartItems);

        if (cartCountElement) {
            cartCountElement.textContent = String(cartCount);
        }

        window.localStorage.setItem('cartCount', String(cartCount));
    };

    const addBookToCart = (book) => {
        const cartItems = getCartItems();
        const existingBook = cartItems.find((item) => item.id === book.id);

        if (existingBook) {
            existingBook.quantity += 1;
        } else {
            cartItems.push({
                ...book,
                quantity: 1
            });
        }

        saveCartItems(cartItems);
        syncCartCount();
    };

    const getCartSummaryMarkup = (cartItems) => {
        const listMarkup = cartItems.map((item) => `
            <div style="display:flex;justify-content:space-between;gap:1rem;padding:0.85rem 0;border-bottom:1px solid #e5e7eb;text-align:left;">
                <div>
                    <div style="font-weight:700;color:#111827;">${escapeHtml(item.title)}</div>
                    <div style="font-size:0.9rem;color:#6b7280;">Qty: ${item.quantity}</div>
                </div>
                <div style="font-weight:700;color:#c2410c;">${formatPrice(item.price * item.quantity)}</div>
            </div>
        `).join('');

        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        return `
            <div style="max-height:280px;overflow:auto;padding-right:0.25rem;">
                ${listMarkup}
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:1rem;padding-top:0.75rem;border-top:2px solid #fed7aa;">
                <strong style="color:#111827;">Total</strong>
                <strong style="font-size:1.1rem;color:#c2410c;">${formatPrice(total)}</strong>
            </div>
        `;
    };

    const showOrderForm = async (cartItems) => {
        const result = await Swal.fire({
            title: 'Enter your details',
            html: `
                <input id="order-name" class="swal2-input" placeholder="Full name">
                <input id="order-phone" class="swal2-input" placeholder="Phone number">
                <textarea id="order-address" class="swal2-textarea" placeholder="Delivery address"></textarea>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Place order',
            confirmButtonColor: '#c2410c',
            cancelButtonText: 'Back',
            preConfirm: () => {
                const name = document.getElementById('order-name').value.trim();
                const phone = document.getElementById('order-phone').value.trim();
                const address = document.getElementById('order-address').value.trim();

                if (!name || !phone || !address) {
                    Swal.showValidationMessage('Please fill in your name, phone number, and address.');
                    return false;
                }

                return { name, phone, address };
            }
        });

        if (!result.isConfirmed) {
            return;
        }

        const totalItems = getCartCount(cartItems);
        saveCartItems([]);
        syncCartCount();

        await Swal.fire({
            icon: 'success',
            title: 'Your order is placed',
            html: `
                <p style="margin-bottom:0.5rem;">Thank you, <strong>${escapeHtml(result.value.name)}</strong>.</p>
                <p style="margin-bottom:0;">Your order for ${totalItems} book${totalItems === 1 ? '' : 's'} has been placed successfully.</p>
            `,
            confirmButtonText: 'OK',
            confirmButtonColor: '#15803d'
        });
    };

    const openCart = async () => {
        const cartItems = getCartItems();

        if (!cartItems.length) {
            await Swal.fire({
                icon: 'info',
                title: 'Your cart is empty',
                text: 'Add some books first, then open the cart to place your order.',
                confirmButtonColor: '#c2410c'
            });
            return;
        }

        const result = await Swal.fire({
            title: 'Your cart',
            html: getCartSummaryMarkup(cartItems),
            width: 640,
            showCancelButton: true,
            confirmButtonText: 'Checkout',
            confirmButtonColor: '#c2410c',
            cancelButtonText: 'Continue shopping'
        });

        if (result.isConfirmed) {
            await showOrderForm(cartItems);
        }
    };

    syncCartCount();

    addToCartButtons.forEach((button) => {
        button.addEventListener('click', async () => {
            const book = {
                id: button.dataset.bookId || button.dataset.bookTitle || `book-${Date.now()}`,
                title: button.dataset.bookTitle || 'Book',
                price: parsePrice(button.dataset.bookPrice || '')
            };

            addBookToCart(book);

            if (typeof Swal !== 'undefined') {
                await Swal.fire({
                    icon: 'success',
                    title: 'Added to cart',
                    text: `${book.title} has been added to your cart.`,
                    confirmButtonText: 'Continue browsing',
                    confirmButtonColor: '#c2410c'
                });
            } else {
                window.alert(`${book.title} added to cart.`);
            }
        });
    });

    if (cartButton) {
        cartButton.addEventListener('click', async () => {
            if (typeof Swal !== 'undefined') {
                await openCart();
            }
        });
    }
});
