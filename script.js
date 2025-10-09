document.addEventListener("DOMContentLoaded", () => {
    // --- RESPONSIVE NAVIGATION ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    if (hamburger) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

    // --- ACCOUNT PAGE TOGGLE ---
    const loginToggle = document.getElementById('login-toggle');
    const signupToggle = document.getElementById('signup-toggle');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (loginToggle) {
        loginToggle.addEventListener('click', () => {
            loginToggle.classList.add('active');
            signupToggle.classList.remove('active');
            loginForm.classList.add('active');
            signupForm.classList.remove('active');
        });
        signupToggle.addEventListener('click', () => {
            signupToggle.classList.add('active');
            loginToggle.classList.remove('active');
            signupForm.classList.add('active');
            loginForm.classList.remove('active');
        });
    }

    // --- SHOPPING CART SIMULATION (using localStorage) ---
    const addToCartButtons = document.querySelectorAll(".btn-add-to-cart");
    
    addToCartButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const card = e.target.closest('.product-card');
            const product = {
                id: card.dataset.id || Date.now(), // Use a data-id or timestamp as a unique id
                name: card.querySelector('h3').textContent,
                price: parseFloat(card.querySelector('.price').textContent.replace('$', '')),
                image: card.querySelector('img').src,
                quantity: 1
            };
            
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProductIndex = cart.findIndex(p => p.name === product.name);

            if (existingProductIndex > -1) {
                cart[existingProductIndex].quantity += 1;
            } else {
                cart.push(product);
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${product.name} has been added to your cart.`);
        });
    });

    // --- DYNAMICALLY RENDER CART PAGE ---
    if (window.location.pathname.endsWith('cart.html')) {
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartSubtotalEl = document.getElementById('cart-subtotal');
        const cartTotalEl = document.getElementById('cart-total');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            let subtotal = 0;
            cartItemsContainer.innerHTML = cart.map(item => {
                subtotal += item.price * item.quantity;
                return `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="item-details">
                            <h4>${item.name}</h4>
                            <p>$${item.price.toFixed(2)}</p>
                            <input type="number" value="${item.quantity}" min="1" class="item-quantity">
                        </div>
                    </div>
                `;
            }).join('');
            
            cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
            cartTotalEl.textContent = `$${(subtotal + 5).toFixed(2)}`; // +5 for shipping
        }
    }
    
    // --- DYNAMICALLY RENDER CHECKOUT SUMMARY ---
    if (window.location.pathname.endsWith('checkout.html')) {
        const orderSummaryContainer = document.querySelector('.order-summary');
        const summaryTotalEl = document.getElementById('summary-total-price');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let subtotal = 0;

        cart.forEach(item => {
            subtotal += item.price * item.quantity;
            const summaryItem = document.createElement('div');
            summaryItem.className = 'summary-row';
            summaryItem.innerHTML = `<span>${item.name} x ${item.quantity}</span> <span>$${(item.price * item.quantity).toFixed(2)}</span>`;
            orderSummaryContainer.prepend(summaryItem);
        });
        summaryTotalEl.textContent = `$${(subtotal + 5).toFixed(2)}`;
    }


    // --- ADMIN DASHBOARD PANEL SWITCHING ---
    const adminSidebarLinks = document.querySelectorAll('.admin-sidebar .sidebar-menu a');
    const adminPanels = document.querySelectorAll('.admin-panel');

    adminSidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const panelId = link.getAttribute('data-panel');
            if (!panelId) return;

            // Toggle active link
            adminSidebarLinks.forEach(l => l.parentElement.classList.remove('active'));
            link.parentElement.classList.add('active');
            
            // Toggle active panel
            adminPanels.forEach(panel => {
                if (panel.id === `${panelId}-panel`) {
                    panel.classList.add('active');
                } else {
                    panel.classList.remove('active');
                }
            });
        });
    });
});
