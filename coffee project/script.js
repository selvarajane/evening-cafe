// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Navigation click handler
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetSection = this.getAttribute('data-section');
            const section = document.getElementById(targetSection);
            if (section) {
                section.classList.add('active');
            }
        });
    });
});

// Login popup functionality
function openLogin() {
    document.getElementById('loginPopup').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeLogin() {
    document.getElementById('loginPopup').style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simple validation (you can add more complex validation)
    if (email && password) {
        // Close login popup
        closeLogin();
        
        // Show success animation
        showSuccessAnimation();
        
        // Hide login button and show profile
        document.querySelector('.login').style.display = 'none';
        document.getElementById('profileLink').style.display = 'block';
    } else {
        alert('Please fill in all fields');
    }
});

// Success animation
function showSuccessAnimation() {
    const successDiv = document.getElementById('successAnimation');
    successDiv.style.display = 'block';
    
    // Hide success animation after 2 seconds and redirect to home
    setTimeout(() => {
        successDiv.style.display = 'none';
        // Navigate to home section
        showSection('home');
    }, 2000);
}

// Show specific section
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show target section
    document.getElementById(sectionId).classList.add('active');
    
    // Activate corresponding nav link
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
}

// Dark mode toggle
function toggleMode() {
    const body = document.body;
    const modeBtn = document.querySelector('.mode-btn');
    
    if (body.classList.contains('light')) {
        body.classList.remove('light');
        body.classList.add('dark');
        modeBtn.textContent = '☀️ Light';
    } else {
        body.classList.remove('dark');
        body.classList.add('light');
        modeBtn.textContent = '🌙 Dark';
    }
}

// Shopping Cart functionality
let cart = [];
let cartTotal = 0;

function addToCart(itemName, price) {
    const existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: itemName,
            price: parseFloat(price),
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showCartNotification(itemName);
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
                    <button class="remove-item" onclick="removeFromCart('${item.name}')">Remove</button>
                </div>
            </div>
        `).join('');
    }
    
    // Update total
    cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = cartTotal.toFixed(2);
}

function updateQuantity(itemName, change) {
    const item = cart.find(item => item.name === itemName);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemName);
        } else {
            updateCartDisplay();
        }
    }
}

function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    updateCartDisplay();
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const orderSummary = cart.map(item => 
        `${item.name} x${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    alert(`Order Summary:\n${orderSummary}\n\nTotal: $${cartTotal.toFixed(2)}\n\nThank you for your order!`);
    
    // Clear cart
    cart = [];
    updateCartDisplay();
    toggleCart();
}

function showCartNotification(itemName) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = `${itemName} added to cart!`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

function toggleCart() {
    const cartDropdown = document.getElementById('cartDropdown');
    cartDropdown.classList.toggle('show');
}

// Contact Modal functionality
function openContactModal() {
    document.getElementById('contactModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeContactModal() {
    document.getElementById('contactModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Contact modal form submission
document.getElementById('contactModalForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('modalName').value;
    const email = document.getElementById('modalEmail').value;
    const subject = document.getElementById('modalSubject').value;
    const message = document.getElementById('modalMessage').value;
    
    if (name && email && subject && message) {
        // Send email using EmailJS or similar service
        sendEmailToOwner(name, email, subject, message);
        
        // Show success message
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = 'Message sent successfully! We will contact you soon.';
        
        document.body.appendChild(notification);
        
        // Clear form and close modal
        this.reset();
        closeContactModal();
        
        // Remove notification after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    } else {
        alert('Please fill in all fields');
    }
});

function sendEmailToOwner(name, email, subject, message) {
    // This would typically use a service like EmailJS
    // For now, we'll just log the details
    console.log('Email to: selvarajan0259@gmail.com');
    console.log('From:', name, email);
    console.log('Subject:', subject);
    console.log('Message:', message);
    
    // In a real implementation, you would use EmailJS or a backend service
    // Example with EmailJS:
    // emailjs.send('service_id', 'template_id', {
    //     to_email: 'selvarajan0259@gmail.com',
    //     from_name: name,
    //     from_email: email,
    //     subject: subject,
    //     message: message
    // });
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Close login popup when clicking outside
window.addEventListener('click', function(e) {
    const popup = document.getElementById('loginPopup');
    if (e.target === popup) {
        closeLogin();
    }
});

// Close contact modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('contactModal');
    if (e.target === modal) {
        closeContactModal();
    }
});

// WhatsApp scroll functionality
let lastScrollTop = 0;
const whatsappBtn = document.getElementById('whatsappBtn');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down - hide WhatsApp button
        whatsappBtn.classList.add('hidden');
    } else {
        // Scrolling up or at top - show WhatsApp button
        whatsappBtn.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop;
});

// Cart click functionality
document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartDropdown = document.getElementById('cartDropdown');
    
    cartIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleCart();
    });
    
    // Close cart when clicking outside
    document.addEventListener('click', function(e) {
        if (!cartIcon.contains(e.target) && !cartDropdown.contains(e.target)) {
            cartDropdown.classList.remove('show');
        }
    });
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Coffee filter functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const coffeeCards = document.querySelectorAll('.coffee-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Show/hide coffee cards based on filter
            coffeeCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// Hero button functionality
document.addEventListener('DOMContentLoaded', function() {
    const orderNowBtn = document.querySelector('.order-now-btn');
    const exploreBtn = document.querySelector('.explore-btn');
    const viewAllBtn = document.querySelector('.view-all-btn');
    
    if (orderNowBtn) {
        orderNowBtn.addEventListener('click', function() {
            showSection('menu');
        });
    }
    
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            showSection('about');
        });
    }
    
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            showSection('menu');
        });
    }
});

// Coffee card order buttons
document.addEventListener('DOMContentLoaded', function() {
    const cardOrderBtns = document.querySelectorAll('.card-order-btn');
    
    cardOrderBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const coffeeName = this.parentElement.querySelector('h3').textContent;
            addToCart(coffeeName, '4.50'); // Default price for demo
        });
    });
});

// Newsletter subscription
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    const emailInput = document.querySelector('.email-input');
    const newsletterBtn = document.querySelector('.newsletter-btn');
    
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', function() {
            const email = emailInput.value;
            if (email && email.includes('@')) {
                // Show success notification
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #4CAF50;
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    z-index: 1000;
                    animation: slideInRight 0.3s ease;
                `;
                notification.textContent = 'Successfully subscribed to newsletter!';
                
                document.body.appendChild(notification);
                
                // Clear input
                emailInput.value = '';
                
                // Remove notification after 3 seconds
                setTimeout(() => {
                    notification.style.animation = 'slideOutRight 0.3s ease';
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                }, 3000);
            } else {
                alert('Please enter a valid email address');
            }
        });
    }
});

// Navigation arrows for coffee cards
document.addEventListener('DOMContentLoaded', function() {
    const leftArrow = document.querySelector('.nav-arrow.left');
    const rightArrow = document.querySelector('.nav-arrow.right');
    const coffeeCards = document.querySelector('.coffee-cards');
    
    if (leftArrow && rightArrow && coffeeCards) {
        let currentIndex = 0;
        const cards = coffeeCards.querySelectorAll('.coffee-card');
        const cardsPerView = 3; // Adjust based on screen size
        
        function updateCardDisplay() {
            cards.forEach((card, index) => {
                if (index >= currentIndex && index < currentIndex + cardsPerView) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
        
        leftArrow.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex -= cardsPerView;
                updateCardDisplay();
            }
        });
        
        rightArrow.addEventListener('click', function() {
            if (currentIndex + cardsPerView < cards.length) {
                currentIndex += cardsPerView;
                updateCardDisplay();
            }
        });
        
        // Initialize display
        updateCardDisplay();
    }
});

// Testimonial arrow functionality
document.addEventListener('DOMContentLoaded', function() {
    const testimonialArrow = document.querySelector('.testimonial-arrow');
    
    if (testimonialArrow) {
        testimonialArrow.addEventListener('click', function() {
            // For demo purposes, just show a notification
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #8d5524;
                color: white;
                padding: 1rem 2rem;
                border-radius: 8px;
                z-index: 1000;
                animation: slideInRight 0.3s ease;
            `;
            notification.textContent = 'Loading more testimonials...';
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 2000);
        });
    }
});
