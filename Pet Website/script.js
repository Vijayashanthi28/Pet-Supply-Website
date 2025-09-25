//Cart
 // Product data
        const cartProducts = [
            {
                id: 0,
                name: "Turkey, Chickpea & Sweet Potato Small Breed 2Kg",
                price: 1899,
                quantity: 3
            }
        ];

        // Shipping cost
        const shippingCost = 99;

        // Function to increase quantity
        function increaseQuantity(productId) {
            const product = cartProducts.find(p => p.id === productId);
            if (product) {
                product.quantity++;
                updateProductDisplay(productId);
                updateCartTotals();
            }
        }

        // Function to decrease quantity
        function decreaseQuantity(productId) {
            const product = cartProducts.find(p => p.id === productId);
            if (product && product.quantity > 1) {
                product.quantity--;
                updateProductDisplay(productId);
                updateCartTotals();
            }
        }

        // Function to remove product
        function removeProduct(productId) {
            const productIndex = cartProducts.findIndex(p => p.id === productId);
            if (productIndex > -1) {
                cartProducts.splice(productIndex, 1);
                document.querySelector('.cart-product-row').remove();
                updateCartTotals();
            }
        }

        // Function to update product display
        function updateProductDisplay(productId) {
            const product = cartProducts.find(p => p.id === productId);
            if (product) {
                const quantityInput = document.getElementById(`quantity-${productId}`);
                const subtotalElement = document.getElementById(`subtotal-${productId}`);
                
                quantityInput.value = product.quantity;
                subtotalElement.textContent = `₹ ${(product.price * product.quantity).toLocaleString()}`;
            }
        }

        // Function to update cart totals
        function updateCartTotals() {
            const subtotal = cartProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0);
            const total = subtotal + shippingCost;
            
            document.getElementById('cart-subtotal').textContent = `₹ ${subtotal.toLocaleString()}`;
            document.getElementById('cart-total').textContent = `₹ ${total.toLocaleString()}`;
        }

        // Initialize cart on page load
        document.addEventListener('DOMContentLoaded', function() {
            updateCartTotals();
        });

        // Coupon functionality
        document.querySelector('.apply-coupon-btn').addEventListener('click', function() {
            const couponCode = document.querySelector('.coupon-input').value;
            if (couponCode.trim()) {
                alert(`Coupon "${couponCode}" applied successfully!`);
                // Add coupon logic here
            }
        });

        // Checkout functionality
        document.querySelector('.checkout-btn').addEventListener('click', function() {
            if (cartProducts.length > 0) {
                alert('Proceeding to checkout...');
                // Add checkout logic here
            } else {
                alert('Your cart is empty!');
            }
        });

        //Navbar
          // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchSuggestions = document.getElementById('searchSuggestions');
        const clearSearchBtn = document.getElementById('clearSearch');
        const closeSuggestionsBtn = document.getElementById('closeSuggestions');

        searchInput.addEventListener('focus', function() {
            if (this.value.length > 0) {
                searchSuggestions.classList.add('show');
            }
        });

        searchInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                clearSearchBtn.style.display = 'block';
                searchSuggestions.classList.add('show');
            } else {
                clearSearchBtn.style.display = 'none';
                searchSuggestions.classList.remove('show');
            }
        });

        clearSearchBtn.addEventListener('click', function() {
            searchInput.value = '';
            this.style.display = 'none';
            searchSuggestions.classList.remove('show');
            searchInput.focus();
        });

        closeSuggestionsBtn.addEventListener('click', function() {
            searchSuggestions.classList.remove('show');
        });

        // Close suggestions when clicking outside
        document.addEventListener('click', function(event) {
            if (!searchInput.contains(event.target) && !searchSuggestions.contains(event.target)) {
                searchSuggestions.classList.remove('show');
            }
        });

        // Dropdown functionality
        const categoryTriggers = document.querySelectorAll('.category-trigger[data-dropdown]');
        let activeDropdown = null;

        categoryTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                const dropdownId = this.getAttribute('data-dropdown');
                const dropdown = document.getElementById(dropdownId);
                
                // Close any currently active dropdown
                if (activeDropdown && activeDropdown !== dropdown) {
                    activeDropdown.classList.remove('show');
                    activeDropdown.previousElementSibling.classList.remove('active');
                }
                
                // Toggle current dropdown
                if (dropdown.classList.contains('show')) {
                    dropdown.classList.remove('show');
                    this.classList.remove('active');
                    activeDropdown = null;
                } else {
                    dropdown.classList.add('show');
                    this.classList.add('active');
                    activeDropdown = dropdown;
                }
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', function(event) {
            const isDropdownTrigger = event.target.closest('.category-trigger[data-dropdown]');
            const isDropdownContent = event.target.closest('.dropdown-content');
            
            if (!isDropdownTrigger && !isDropdownContent && activeDropdown) {
                activeDropdown.classList.remove('show');
                activeDropdown.previousElementSibling.classList.remove('active');
                activeDropdown = null;
            }
        });

        // Handle suggestion item clicks
        document.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                searchInput.value = this.textContent;
                searchSuggestions.classList.remove('show');
                // Here you would typically perform the search or redirect
                console.log('Searching for:', this.textContent);
            });
        });

        // Prevent dropdown from closing when clicking inside
        document.querySelectorAll('.dropdown-content').forEach(dropdown => {
            dropdown.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        });

        // Handle mobile responsiveness
        function handleResize() {
            if (window.innerWidth <= 768) {
                // Close all dropdowns on mobile resize
                if (activeDropdown) {
                    activeDropdown.classList.remove('show');
                    activeDropdown.previousElementSibling.classList.remove('active');
                    activeDropdown = null;
                }
            }
        }

        window.addEventListener('resize', handleResize);
        //Customer Review Form
         document.addEventListener('DOMContentLoaded', function() {
            // Star Rating Functionality
            const starRatingContainer = document.getElementById('userStarRating');
            const ratingStars = starRatingContainer.querySelectorAll('.user-rating-star');
            const ratingDisplay = document.getElementById('ratingDisplay');
            let currentRating = 0;

            // Star rating event handlers
            ratingStars.forEach((star, index) => {
                // Mouse enter - highlight stars up to this one
                star.addEventListener('mouseenter', function() {
                    highlightStars(index + 1, 'hover');
                });

                // Click - set rating
                star.addEventListener('click', function() {
                    currentRating = index + 1;
                    setRating(currentRating);
                    updateRatingDisplay(currentRating);
                });
            });

            // Mouse leave container - reset to current rating
            starRatingContainer.addEventListener('mouseleave', function() {
                if (currentRating > 0) {
                    setRating(currentRating);
                } else {
                    clearStarHighlight();
                }
            });

            function highlightStars(rating, type = 'active') {
                ratingStars.forEach((star, index) => {
                    star.classList.remove('star-active', 'star-hovered');
                    if (index < rating) {
                        if (type === 'hover') {
                            star.classList.add('star-hovered');
                        } else {
                            star.classList.add('star-active');
                        }
                    }
                });
            }

            function setRating(rating) {
                currentRating = rating;
                highlightStars(rating, 'active');
            }

            function clearStarHighlight() {
                ratingStars.forEach(star => {
                    star.classList.remove('star-active', 'star-hovered');
                });
            }

            function updateRatingDisplay(rating) {
                const ratingTexts = {
                    1: 'Poor (1 star)',
                    2: 'Fair (2 stars)', 
                    3: 'Good (3 stars)',
                    4: 'Very Good (4 stars)',
                    5: 'Excellent (5 stars)'
                };
                ratingDisplay.textContent = ratingTexts[rating] || 'Click to rate this product';
            }

            // Form Submission
            const reviewForm = document.getElementById('reviewForm');
            const submitButton = document.getElementById('submitButton');

            reviewForm.addEventListener('submit', function(e) {
                e.preventDefault();

                // Validate rating
                if (currentRating === 0) {
                    alert('Please select a rating before submitting your review.');
                    return;
                }

                // Get form data
                const reviewData = {
                    rating: currentRating,
                    review: document.getElementById('reviewText').value.trim(),
                    name: document.getElementById('reviewerName').value.trim(),
                    email: document.getElementById('reviewerEmail').value.trim(),
                    saveInfo: document.getElementById('saveInfo').checked
                };

                // Basic validation
                if (!reviewData.review || !reviewData.name || !reviewData.email) {
                    alert('Please fill in all required fields.');
                    return;
                }

                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(reviewData.email)) {
                    alert('Please enter a valid email address.');
                    return;
                }

                // Simulate form submission
                submitButton.textContent = 'Submitting...';
                submitButton.disabled = true;

                setTimeout(() => {
                    alert(`Review Submitted Successfully!\n\nRating: ${reviewData.rating} stars\nName: ${reviewData.name}\nEmail: ${reviewData.email}\nReview: ${reviewData.review.substring(0, 100)}...`);
                    
                    // Reset form
                    reviewForm.reset();
                    currentRating = 0;
                    clearStarHighlight();
                    updateRatingDisplay(0);
                    
                    submitButton.textContent = 'Submit';
                    submitButton.disabled = false;
                }, 1500);
            });

            // Real-time form validation
            const requiredFields = [
                document.getElementById('reviewText'),
                document.getElementById('reviewerName'),
                document.getElementById('reviewerEmail')
            ];

            function validateForm() {
                const isFormValid = requiredFields.every(field => field.value.trim() !== '') && currentRating > 0;
                submitButton.disabled = !isFormValid;
            }

            requiredFields.forEach(field => {
                field.addEventListener('input', validateForm);
            });

            // Initialize form state
            validateForm();
        });

        //Payment
          // Payment method selection
        function selectPayment(method) {
            const options = document.querySelectorAll('.payment-option');
            options.forEach(option => option.classList.remove('selected'));
            
            if (method === 'online') {
                document.getElementById('onlinePayment').checked = true;
                options[0].classList.add('selected');
            } else if (method === 'cod') {
                document.getElementById('codPayment').checked = true;
                options[1].classList.add('selected');
            }
        }

        // Discount code application
        function applyDiscount() {
            const discountCode = document.getElementById('discountCode').value.trim();
            
            if (!discountCode) {
                alert('Please enter a discount code!');
                return;
            }

            // Simple discount validation (you can customize this)
            const validCodes = ['SAVE10', 'FIRST20', 'WELCOME15'];
            
            if (validCodes.includes(discountCode.toUpperCase())) {
                alert(`Discount code "${discountCode}" applied successfully!`);
                // Here you would typically update the total price
            } else {
                alert('Invalid discount code. Please try again.');
            }
        }

        // Save customer information to local storage
        function saveCustomerInfo() {
            const customerData = {
                email: document.getElementById('customerEmail').value,
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                address: document.getElementById('streetAddress').value,
                apartment: document.getElementById('apartment').value,
                city: document.getElementById('cityName').value,
                state: document.getElementById('stateName').value,
                pincode: document.getElementById('postalCode').value,
                phone: document.getElementById('phoneNumber').value,
                emailUpdates: document.getElementById('emailUpdates').checked,
                savedAt: new Date().toISOString()
            };

            // Store in multiple storage types as requested
            localStorage.setItem('petFoodCustomerData', JSON.stringify(customerData));
            sessionStorage.setItem('petFoodCheckoutSession', JSON.stringify(customerData));
            
            console.log('Customer data saved:', customerData);
            alert('Your information has been saved successfully!');
        }

        // Load saved information
        function loadSavedInfo() {
            const savedData = localStorage.getItem('petFoodCustomerData');
            if (savedData) {
                const customerData = JSON.parse(savedData);
                
                // Fill form with saved data
                document.getElementById('customerEmail').value = customerData.email || '';
                document.getElementById('firstName').value = customerData.firstName || '';
                document.getElementById('lastName').value = customerData.lastName || '';
                document.getElementById('streetAddress').value = customerData.address || '';
                document.getElementById('apartment').value = customerData.apartment || '';
                document.getElementById('cityName').value = customerData.city || '';
                document.getElementById('stateName').value = customerData.state || '';
                document.getElementById('postalCode').value = customerData.pincode || '';
                document.getElementById('phoneNumber').value = customerData.phone || '';
                document.getElementById('emailUpdates').checked = customerData.emailUpdates || false;
                
                console.log('Loaded customer data:', customerData);
            }
        }

        // Form submission handler
        document.getElementById('checkoutForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const requiredFields = ['customerEmail', 'firstName', 'lastName', 'streetAddress', 'cityName', 'stateName', 'postalCode', 'phoneNumber'];
            let isValid = true;
            
            requiredFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ef4444';
                } else {
                    field.style.borderColor = '#ddd';
                }
            });

            // Check if payment method is selected
            const paymentMethod = document.querySelector('input[name="payment"]:checked');
            if (!paymentMethod) {
                isValid = false;
                alert('Please select a payment method!');
                return;
            }

            if (!isValid) {
                alert('Please fill in all required fields!');
                return;
            }

            // Save info if checkbox is checked
            if (document.getElementById('saveInfo').checked) {
                saveCustomerInfo();
            }

            // Process order
            const orderData = {
                customer: {
                    email: document.getElementById('customerEmail').value,
                    firstName: document.getElementById('firstName').value,
                    lastName: document.getElementById('lastName').value,
                    phone: document.getElementById('phoneNumber').value
                },
                delivery: {
                    address: document.getElementById('streetAddress').value,
                    apartment: document.getElementById('apartment').value,
                    city: document.getElementById('cityName').value,
                    state: document.getElementById('stateName').value,
                    pincode: document.getElementById('postalCode').value
                },
                paymentMethod: paymentMethod.value,
                orderTotal: '₹ 1,998',
                orderDate: new Date().toISOString()
            };

            console.log('Order submitted:', orderData);
            
            alert(`Thank you ${orderData.customer.firstName}! Your order has been placed successfully. You will receive a confirmation email shortly.`);
            
            // Store order in session for confirmation page
            sessionStorage.setItem('latestOrder', JSON.stringify(orderData));
        });

        // Save info checkbox handler
        document.getElementById('saveInfo').addEventListener('change', function() {
            if (this.checked) {
                alert('Your information will be saved when you place the order.');
            }
        });

        // Load saved information on page load
        window.addEventListener('load', function() {
            loadSavedInfo();
            
            // Set default payment method
            selectPayment('online');
            
            console.log('Checkout page loaded. Check localStorage and sessionStorage for saved data.');
        });

        // Input field focus effects
        document.querySelectorAll('.input-field').forEach(field => {
            field.addEventListener('focus', function() {
                this.style.borderColor = '#2563eb';
            });
            
            field.addEventListener('blur', function() {
                if (this.value.trim() === '' && this.hasAttribute('required')) {
                    this.style.borderColor = '#ef4444';
                } else {
                    this.style.borderColor = '#ddd';
                }
            });
        });

        //Login
         // Predefined user data for demonstration
        const predefinedUserData = {
            email: 'Narmatha',
            password: 'XXXXXX'
        };

        // Auto-fill functionality for login form
        function setupAutoFillFeature() {
            const emailField = document.getElementById('userEmailInput');
            const passwordField = document.getElementById('userPasswordInput');

            emailField.addEventListener('focus', function() {
                if (this.value === '') {
                    this.value = predefinedUserData.email;
                    console.log('Auto-filled email:', predefinedUserData.email);
                }
            });

            passwordField.addEventListener('focus', function() {
                if (this.value === '') {
                    this.value = predefinedUserData.password;
                    console.log('Auto-filled password');
                }
            });

            // Clear on blur if it's the predefined value
            emailField.addEventListener('blur', function() {
                if (this.value === predefinedUserData.email) {
                    // Keep the value for demo purposes
                }
            });

            passwordField.addEventListener('blur', function() {
                if (this.value === predefinedUserData.password) {
                    // Keep the value for demo purposes
                }
            });
        }

        // Modal functionality
        function openSignupModal() {
            const modalOverlay = document.getElementById('signupModalOverlay');
            modalOverlay.classList.add('modal-visible');
            document.body.style.overflow = 'hidden';
            console.log('Signup modal opened');
        }

        function closeSignupModal(event) {
            if (event && event.target !== event.currentTarget && !event.target.classList.contains('modal-close-button')) {
                return;
            }
            
            const modalOverlay = document.getElementById('signupModalOverlay');
            modalOverlay.classList.remove('modal-visible');
            document.body.style.overflow = 'auto';
            console.log('Signup modal closed');
        }

        // Form submission handlers
        function handleLoginSubmission() {
            document.getElementById('customerLoginForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('userEmailInput').value;
                const password = document.getElementById('userPasswordInput').value;
                
                if (!email || !password) {
                    alert('Please fill in both email and password fields!');
                    return;
                }

                const loginData = {
                    email: email,
                    password: password,
                    loginTime: new Date().toISOString()
                };

                // Store login attempt in localStorage
                localStorage.setItem('petpaloozaLoginAttempt', JSON.stringify(loginData));
                console.log('Login attempt:', loginData);
                
                alert(`Welcome back! Logging in as: ${email}`);
                
                // Simulate successful login
                setTimeout(() => {
                    alert('Login successful! Redirecting to your account dashboard...');
                }, 1000);
            });
        }

        function handleSignupSubmission() {
            document.getElementById('signupRegistrationForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const firstName = document.getElementById('newUserFirstName').value;
                const lastName = document.getElementById('newUserLastName').value;
                const email = document.getElementById('newUserEmail').value;
                const password = document.getElementById('newUserPassword').value;
                
                if (!firstName || !lastName || !email || !password) {
                    alert('Please fill in all required fields!');
                    return;
                }

                if (password.length < 6) {
                    alert('Password must be at least 6 characters long!');
                    return;
                }

                const newUserData = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    registrationDate: new Date().toISOString()
                };

                // Store new user data
                localStorage.setItem('petpaloozaNewUser', JSON.stringify(newUserData));
                sessionStorage.setItem('currentSignupSession', JSON.stringify(newUserData));
                console.log('New user registered:', newUserData);
                
                alert(`Account created successfully for ${firstName} ${lastName}! Welcome to Petpalooza!`);
                
                // Close modal and show success
                closeSignupModal();
                
                setTimeout(() => {
                    alert('Registration complete! You can now log in with your new account.');
                }, 500);
            });
        }

        // Keyboard event handlers
        function setupKeyboardNavigation() {
            // Close modal with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeSignupModal();
                }
            });

            // Enter key submission for login form
            document.getElementById('userPasswordInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    document.getElementById('customerLoginForm').dispatchEvent(new Event('submit'));
                }
            });
        }

        // Input field enhancements
        function enhanceInputFields() {
            const inputFields = document.querySelectorAll('.text-input-field');
            
            inputFields.forEach(field => {
                field.addEventListener('focus', function() {
                    this.parentElement.style.transform = 'scale(1.02)';
                    this.parentElement.style.transition = 'transform 0.2s ease';
                });
                
                field.addEventListener('blur', function() {
                    this.parentElement.style.transform = 'scale(1)';
                });

                // Real-time validation feedback
                field.addEventListener('input', function() {
                    if (this.value.trim() !== '') {
                        this.style.borderColor = '#10b981';
                    } else {
                        this.style.borderColor = '#d1d5db';
                    }
                });
            });
        }

        // Initialize all functionality
        document.addEventListener('DOMContentLoaded', function() {
            setupAutoFillFeature();
            handleLoginSubmission();
            handleSignupSubmission();
            setupKeyboardNavigation();
            enhanceInputFields();
            
            console.log('Petpalooza Account Page Initialized');
            console.log('Available functions: openSignupModal(), closeSignupModal()');
            
            // Load any existing user data
            const existingUser = localStorage.getItem('petpaloozaNewUser');
            if (existingUser) {
                console.log('Found existing user data:', JSON.parse(existingUser));
            }
        });

        // Utility function to clear all stored data (for testing)
        function clearAllStoredData() {
            localStorage.removeItem('petpaloozaLoginAttempt');
            localStorage.removeItem('petpaloozaNewUser');
            sessionStorage.removeItem('currentSignupSession');
            console.log('All stored data cleared');
            alert('All stored data has been cleared!');
        }

        // Make functions available globally for testing
        window.openSignupModal = openSignupModal;
        window.closeSignupModal = closeSignupModal;
        window.clearAllStoredData = clearAllStoredData;

        //Filter
         // Global variables
        let selectedFilters = {
            brand: [],
            size: [],
            category: []
        };

        // Toggle filter panel visibility
        function toggleFilterPanel() {
            const filterPanel = document.getElementById('filterPanel');
            filterPanel.classList.toggle('active');
        }

        // Toggle filter section expand/collapse
        function toggleFilterOptions(sectionName) {
            const options = document.getElementById(sectionName + '-options');
            const arrow = options.parentElement.querySelector('.expand-arrow');
            
            options.classList.toggle('expanded');
            arrow.classList.toggle('rotated');
        }

        // Handle filter selection
        function selectFilter(filterType, value) {
            const checkbox = document.getElementById(filterType + '-' + value);
            const isSelected = checkbox.classList.contains('selected');

            if (isSelected) {
                // Remove from selected filters
                checkbox.classList.remove('selected');
                const index = selectedFilters[filterType].indexOf(value);
                if (index > -1) {
                    selectedFilters[filterType].splice(index, 1);
                }
            } else {
                // Add to selected filters
                checkbox.classList.add('selected');
                selectedFilters[filterType].push(value);
            }

            // Apply filters
            applyFilters();
        }

        // Apply filters to products
        function applyFilters() {
            const products = document.querySelectorAll('.product-item');

            products.forEach(product => {
                let shouldShow = true;

                // Check each filter type
                Object.keys(selectedFilters).forEach(filterType => {
                    if (selectedFilters[filterType].length > 0) {
                        const productValue = product.getAttribute('data-' + filterType);
                        if (!selectedFilters[filterType].includes(productValue)) {
                            shouldShow = false;
                        }
                    }
                });

                // Show/hide product
                if (shouldShow) {
                    product.classList.remove('hidden');
                } else {
                    product.classList.add('hidden');
                }
            });
        }

        // Handle sorting
        function handleSorting(sortType) {
            const productsContainer = document.getElementById('productsGrid');
            const products = Array.from(productsContainer.children);

            products.sort((a, b) => {
                switch (sortType) {
                    case 'price-low':
                        return parseInt(a.getAttribute('data-price')) - parseInt(b.getAttribute('data-price'));
                    case 'price-high':
                        return parseInt(b.getAttribute('data-price')) - parseInt(a.getAttribute('data-price'));
                    case 'rating':
                        // For demo purposes, all products have same rating
                        return 0;
                    case 'newest':
                        // For demo purposes, maintain original order
                        return 0;
                    default:
                        return 0;
                }
            });

            // Clear and re-append sorted products
            productsContainer.innerHTML = '';
            products.forEach(product => {
                productsContainer.appendChild(product);
            });
        }

        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            // Initially expand brand section for better UX
            toggleFilterOptions('brand');

            // Add click handlers for pagination
            document.querySelectorAll('.page-item').forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Remove current class from all items
                    document.querySelectorAll('.page-item').forEach(p => {
                        p.classList.remove('current');
                    });
                    
                    // Add current class to clicked item
                    this.classList.add('current');
                });
            });

            // Add to cart functionality
            document.querySelectorAll('.cart-button').forEach(button => {
                button.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    // Add animation feedback
                    const originalText = this.textContent;
                    const originalColor = this.style.backgroundColor;
                    
                    this.style.transform = 'scale(0.95)';
                    this.textContent = 'Added!';
                    this.style.backgroundColor = '#28a745';
                    
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                        this.textContent = originalText;
                        this.style.backgroundColor = originalColor;
                    }, 1000);
                });
            });

            // Add hover effects to promotional sections
            document.querySelectorAll('.promo-section').forEach(section => {
                section.addEventListener('click', function() {
                    // Add click animation
                    this.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        this.style.transform = 'translateY(-2px)';
                    }, 100);
                });
            });
        });

        //Hero Carousel
          let currentSlideIndex = 0;
        const totalSlides = 3;
        const carouselContainer = document.getElementById('bannerCarouselContainer');
        const dotButtons = document.querySelectorAll('.dot-indicator-btn');
        let autoSlideInterval;

        function showSlide(slideIndex) {
            // Update current slide index
            currentSlideIndex = slideIndex;
            
            // Move carousel to the correct position
            const translateX = -slideIndex * 100;
            carouselContainer.style.transform = `translateX(${translateX}%)`;
            
            // Update dot indicators
            dotButtons.forEach((dot, index) => {
                if (index === slideIndex) {
                    dot.classList.add('active-dot');
                } else {
                    dot.classList.remove('active-dot');
                }
            });
        }

        function nextSlide() {
            const nextIndex = (currentSlideIndex + 1) % totalSlides;
            showSlide(nextIndex);
        }

        function previousSlide() {
            const prevIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
            showSlide(prevIndex);
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        // Initialize carousel
        document.addEventListener('DOMContentLoaded', function() {
            showSlide(0);
            startAutoSlide();
            
            // Pause auto-slide when user hovers over carousel
            const carouselWrapper = document.querySelector('.banner-carousel-wrapper');
            carouselWrapper.addEventListener('mouseenter', stopAutoSlide);
            carouselWrapper.addEventListener('mouseleave', startAutoSlide);
        });

        // Add keyboard navigation
        document.addEventListener('keydown', function(event) {
            if (event.key === 'ArrowLeft') {
                previousSlide();
            } else if (event.key === 'ArrowRight') {
                nextSlide();
            }
        });

        // Add touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        carouselContainer.addEventListener('touchstart', function(event) {
            touchStartX = event.changedTouches[0].screenX;
        });

        carouselContainer.addEventListener('touchend', function(event) {
            touchEndX = event.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const swipeDistance = touchEndX - touchStartX;
            
            if (Math.abs(swipeDistance) > swipeThreshold) {
                if (swipeDistance > 0) {
                    // Swiped right - go to previous slide
                    previousSlide();
                } else {
                    // Swiped left - go to next slide
                    nextSlide();
                }
            }
        }

        //Pet Slider
                class PetCategoryMainSlider {
            constructor() {
                this.track = document.getElementById('petItemsMainTrack');
                this.prevBtn = document.getElementById('petPrevMainBtn');
                this.nextBtn = document.getElementById('petNextMainBtn');
                this.indicators = document.querySelectorAll('.indicator-main-dot');
                
                this.itemWidth = 220; // Card width + gap
                this.visibleItems = this.getVisibleItems();
                this.currentIndex = 0;
                this.totalItems = 10;
                this.maxIndex = Math.max(0, this.totalItems - this.visibleItems);
                this.animationDirection = 'right';
                
                this.init();
                this.updateButtons();
                this.updateIndicators();
            }

            getVisibleItems() {
                const containerWidth = this.track.parentElement.offsetWidth;
                return Math.floor(containerWidth / this.itemWidth);
            }

            init() {
                // Event listeners for navigation buttons
                this.prevBtn.addEventListener('click', () => this.slide('prev'));
                this.nextBtn.addEventListener('click', () => this.slide('next'));
                
                // Event listeners for indicators
                this.indicators.forEach((indicator, index) => {
                    indicator.addEventListener('click', () => this.goToSection(index));
                });
                
                // Touch/swipe support
                this.initTouchSupport();
                
                // Keyboard navigation
                this.initKeyboardSupport();
                
                // Resize handler
                window.addEventListener('resize', () => this.handleResize());
                
                // Auto-scroll
                this.startAutoSlide();
            }

            slide(direction) {
                if (direction === 'next' && this.currentIndex < this.maxIndex) {
                    this.currentIndex++;
                    this.animationDirection = 'left';
                } else if (direction === 'prev' && this.currentIndex > 0) {
                    this.currentIndex--;
                    this.animationDirection = 'right';
                }
                
                this.updateSliderPosition();
                this.updateButtons();
                this.updateIndicators();
                this.addSlideAnimation();
                this.restartAutoSlide();
            }

            goToSection(sectionIndex) {
                const itemsPerSection = Math.ceil(this.totalItems / this.indicators.length);
                const targetIndex = Math.min(sectionIndex * itemsPerSection, this.maxIndex);
                
                this.animationDirection = targetIndex > this.currentIndex ? 'left' : 'right';
                this.currentIndex = targetIndex;
                this.updateSliderPosition();
                this.updateButtons();
                this.updateIndicators();
                this.addSlideAnimation();
                this.restartAutoSlide();
            }

            updateSliderPosition() {
                const translateX = -this.currentIndex * this.itemWidth;
                this.track.style.transform = `translateX(${translateX}px)`;
            }

            addSlideAnimation() {
                // Remove existing animation classes
                this.track.classList.remove('slide-in-left', 'slide-in-right');
                
                // Add animation class based on direction
                if (this.animationDirection === 'left') {
                    this.track.classList.add('slide-in-left');
                } else {
                    this.track.classList.add('slide-in-right');
                }
                
                // Remove animation class after animation completes
                setTimeout(() => {
                    this.track.classList.remove('slide-in-left', 'slide-in-right');
                }, 500);
            }

            updateButtons() {
                // Update previous button
                if (this.currentIndex === 0) {
                    this.prevBtn.classList.add('disabled');
                } else {
                    this.prevBtn.classList.remove('disabled');
                }
                
                // Update next button
                if (this.currentIndex >= this.maxIndex) {
                    this.nextBtn.classList.add('disabled');
                } else {
                    this.nextBtn.classList.remove('disabled');
                }
            }

            updateIndicators() {
                const activeSection = Math.floor(this.currentIndex / Math.ceil(this.totalItems / this.indicators.length));
                
                this.indicators.forEach((indicator, index) => {
                    if (index === activeSection) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
            }

            initTouchSupport() {
                let touchStartX = 0;
                let touchEndX = 0;
                let touchStartTime = 0;
                
                this.track.addEventListener('touchstart', (e) => {
                    touchStartX = e.changedTouches[0].screenX;
                    touchStartTime = Date.now();
                });
                
                this.track.addEventListener('touchend', (e) => {
                    touchEndX = e.changedTouches[0].screenX;
                    const touchDuration = Date.now() - touchStartTime;
                    this.handleSwipe(touchStartX, touchEndX, touchDuration);
                });
            }

            handleSwipe(startX, endX, duration) {
                const swipeThreshold = 50;
                const maxDuration = 500; // Maximum duration for a valid swipe
                const swipeDistance = endX - startX;
                
                if (Math.abs(swipeDistance) > swipeThreshold && duration < maxDuration) {
                    if (swipeDistance > 0) {
                        this.slide('prev');
                    } else {
                        this.slide('next');
                    }
                }
            }

            initKeyboardSupport() {
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') {
                        e.preventDefault();
                        this.slide('prev');
                    } else if (e.key === 'ArrowRight') {
                        e.preventDefault();
                        this.slide('next');
                    }
                });
            }

            handleResize() {
                this.visibleItems = this.getVisibleItems();
                this.maxIndex = Math.max(0, this.totalItems - this.visibleItems);
                
                if (this.currentIndex > this.maxIndex) {
                    this.currentIndex = this.maxIndex;
                }
                
                this.updateSliderPosition();
                this.updateButtons();
                this.updateIndicators();
            }

            startAutoSlide() {
                this.autoSlideInterval = setInterval(() => {
                    if (this.currentIndex >= this.maxIndex) {
                        this.currentIndex = 0;
                        this.animationDirection = 'right';
                    } else {
                        this.currentIndex++;
                        this.animationDirection = 'left';
                    }
                    this.updateSliderPosition();
                    this.updateButtons();
                    this.updateIndicators();
                    this.addSlideAnimation();
                }, 4000);
            }

            stopAutoSlide() {
                clearInterval(this.autoSlideInterval);
            }

            restartAutoSlide() {
                this.stopAutoSlide();
                this.startAutoSlide();
            }
        }

        // Initialize slider when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            const petMainSlider = new PetCategoryMainSlider();
            
            // Pause auto-slide on hover
            const sliderContainer = document.querySelector('.pet-slider-main-container');
            sliderContainer.addEventListener('mouseenter', () => petMainSlider.stopAutoSlide());
            sliderContainer.addEventListener('mouseleave', () => petMainSlider.startAutoSlide());
        });

        // Add click animations and interactions to pet cards
        document.addEventListener('DOMContentLoaded', () => {
            const petMainCards = document.querySelectorAll('.pet-category-main-card');
            
            petMainCards.forEach(card => {
                card.addEventListener('click', (e) => {
                    const petType = card.dataset.pet;
                    
                    // Add click animation
                    card.style.transform = 'translateY(-8px) scale(0.95)';
                    card.style.transition = 'all 0.1s ease';
                    
                    setTimeout(() => {
                        card.style.transform = 'translateY(-8px) scale(1)';
                        card.style.transition = 'all 0.3s ease';
                    }, 100);
                    
                    // Add pulse effect to the image container
                    const imageContainer = card.querySelector('.pet-image-main-container');
                    imageContainer.style.animation = 'pulse 0.3s ease-in-out';
                    
                    setTimeout(() => {
                        imageContainer.style.animation = '';
                    }, 300);
                    
                    // Simulate navigation (replace with actual navigation logic)
                    console.log(`Navigating to ${petType} category`);
                    
                    // Optional: Show a temporary feedback
                    const petName = card.querySelector('.pet-category-main-name');
                    const originalText = petName.textContent;
                    petName.textContent = 'Selected!';
                    petName.style.color = '#e74c3c';
                    
                    setTimeout(() => {
                        petName.textContent = originalText;
                        petName.style.color = '';
                    }, 1000);
                });

                // Add hover sound effect simulation
                card.addEventListener('mouseenter', () => {
                    card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                });

                card.addEventListener('mouseleave', () => {
                    card.style.boxShadow = '';
                });
            });
        });

        // Add pulse animation to CSS dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);

        //Claiming Products Slide
         class CalmingProductsCarousel {
            constructor() {
                this.carouselContainer = document.getElementById('productCarouselContainer');
                this.prevButton = document.getElementById('prevButton');
                this.nextButton = document.getElementById('nextButton');
                this.currentIndex = 0;
                this.itemsToShow = this.calculateItemsToShow();
                this.totalItems = document.querySelectorAll('.product-display-card').length;
                this.maxIndex = Math.max(0, this.totalItems - this.itemsToShow);
                
                this.initializeCarousel();
                this.bindEvents();
                this.handleResize();
            }

            calculateItemsToShow() {
                const containerWidth = this.carouselContainer.parentElement.offsetWidth;
                if (containerWidth <= 480) return 1;
                if (containerWidth <= 768) return 2;
                if (containerWidth <= 1024) return 3;
                return 4;
            }

            initializeCarousel() {
                this.updateCarouselPosition();
                this.updateButtonStates();
            }

            bindEvents() {
                this.prevButton.addEventListener('click', () => this.slidePrevious());
                this.nextButton.addEventListener('click', () => this.slideNext());
                
                // Touch/Swipe support
                let startX = 0;
                let endX = 0;
                
                this.carouselContainer.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                });
                
                this.carouselContainer.addEventListener('touchend', (e) => {
                    endX = e.changedTouches[0].clientX;
                    this.handleSwipe(startX, endX);
                });
            }

            handleSwipe(startX, endX) {
                const threshold = 50;
                const difference = startX - endX;
                
                if (Math.abs(difference) > threshold) {
                    if (difference > 0) {
                        this.slideNext();
                    } else {
                        this.slidePrevious();
                    }
                }
            }

            slidePrevious() {
                if (this.currentIndex > 0) {
                    this.currentIndex--;
                    this.updateCarouselPosition();
                    this.updateButtonStates();
                }
            }

            slideNext() {
                if (this.currentIndex < this.maxIndex) {
                    this.currentIndex++;
                    this.updateCarouselPosition();
                    this.updateButtonStates();
                }
            }

            updateCarouselPosition() {
                const cardWidth = 250; // Base card width
                const gap = 20; // Gap between cards
                const translateX = -(this.currentIndex * (cardWidth + gap));
                this.carouselContainer.style.transform = `translateX(${translateX}px)`;
            }

            updateButtonStates() {
                this.prevButton.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
                this.prevButton.style.pointerEvents = this.currentIndex === 0 ? 'none' : 'auto';
                
                this.nextButton.style.opacity = this.currentIndex >= this.maxIndex ? '0.5' : '1';
                this.nextButton.style.pointerEvents = this.currentIndex >= this.maxIndex ? 'none' : 'auto';
            }

            handleResize() {
                window.addEventListener('resize', () => {
                    this.itemsToShow = this.calculateItemsToShow();
                    this.maxIndex = Math.max(0, this.totalItems - this.itemsToShow);
                    
                    // Reset position if current index exceeds new max
                    if (this.currentIndex > this.maxIndex) {
                        this.currentIndex = this.maxIndex;
                    }
                    
                    this.updateCarouselPosition();
                    this.updateButtonStates();
                });
            }

            // Auto-play functionality (optional)
            startAutoPlay(interval = 3000) {
                this.autoPlayInterval = setInterval(() => {
                    if (this.currentIndex >= this.maxIndex) {
                        this.currentIndex = 0;
                    } else {
                        this.currentIndex++;
                    }
                    this.updateCarouselPosition();
                    this.updateButtonStates();
                }, interval);
            }

            stopAutoPlay() {
                if (this.autoPlayInterval) {
                    clearInterval(this.autoPlayInterval);
                }
            }
        }

        // Initialize the carousel when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            const carousel = new CalmingProductsCarousel();
            
            // Optional: Start auto-play (uncomment to enable)
            // carousel.startAutoPlay(4000);
            
            // Pause auto-play on hover (if auto-play is enabled)
            const carouselWrapper = document.querySelector('.product-carousel-main-wrapper');
            carouselWrapper.addEventListener('mouseenter', () => {
                // carousel.stopAutoPlay();
            });
            
            carouselWrapper.addEventListener('mouseleave', () => {
                // carousel.startAutoPlay(4000);
            });
        });

        //Turkey Produc Details
         // Product images data
        const productImages = [
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f8f9fa'/%3E%3Ctext x='200' y='180' text-anchor='middle' fill='%23666' font-size='14' font-family='Arial'%3EZoe Dog Food%3C/text%3E%3Ctext x='200' y='200' text-anchor='middle' fill='%23666' font-size='12' font-family='Arial'%3ETurkey, Chickpea %26 Sweet Potato%3C/text%3E%3Ctext x='200' y='220' text-anchor='middle' fill='%23666' font-size='12' font-family='Arial'%3ESmall Breed 2Kg%3C/text%3E%3C/svg%3E",
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23fff8e1'/%3E%3Ctext x='200' y='180' text-anchor='middle' fill='%23666' font-size='16' font-family='Arial'%3EIngredients List%3C/text%3E%3Ctext x='200' y='200' text-anchor='middle' fill='%23666' font-size='12' font-family='Arial'%3ETurkey, Chickpea, Sweet Potato%3C/text%3E%3Ctext x='200' y='220' text-anchor='middle' fill='%23666' font-size='12' font-family='Arial'%3EQuinoa, Oats, Barley%3C/text%3E%3C/svg%3E",
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f3e5f5'/%3E%3Ctext x='200' y='180' text-anchor='middle' fill='%23666' font-size='16' font-family='Arial'%3EHappy Pet%3C/text%3E%3Ctext x='200' y='200' text-anchor='middle' fill='%23666' font-size='12' font-family='Arial'%3EHealthy %26 Nutritious%3C/text%3E%3Ctext x='200' y='220' text-anchor='middle' fill='%23666' font-size='12' font-family='Arial'%3ESmall Breed Formula%3C/text%3E%3C/svg%3E",
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23e8f5e8'/%3E%3Ctext x='200' y='180' text-anchor='middle' fill='%23666' font-size='16' font-family='Arial'%3ENutrition Facts%3C/text%3E%3Ctext x='200' y='200' text-anchor='middle' fill='%23666' font-size='12' font-family='Arial'%3EHigh Protein Content%3C/text%3E%3Ctext x='200' y='220' text-anchor='middle' fill='%23666' font-size='12' font-family='Arial'%3ERich in Antioxidants%3C/text%3E%3C/svg%3E"
        ];

        // Initialize functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Quantity controls
            const decreaseBtn = document.getElementById('decreaseQty');
            const increaseBtn = document.getElementById('increaseQty');
            const quantityInput = document.getElementById('quantityInput');

            // Decrease quantity function
            decreaseBtn.addEventListener('click', function() {
                let currentValue = parseInt(quantityInput.value);
                if (currentValue > 1) {
                    quantityInput.value = currentValue - 1;
                }
            });

            // Increase quantity function
            increaseBtn.addEventListener('click', function() {
                let currentValue = parseInt(quantityInput.value);
                quantityInput.value = currentValue + 1;
            });

            // Size selection
            const sizeButtons = document.querySelectorAll('.size-option-button');
            sizeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all size buttons
                    sizeButtons.forEach(btn => btn.classList.remove('selected-size'));
                    // Add active class to clicked button
                    this.classList.add('selected-size');
                });
            });

            // Thumbnail image functionality
            const thumbnailItems = document.querySelectorAll('.thumbnail-image-item');
            const mainImage = document.getElementById('mainProductImage');
            const imageDots = document.querySelectorAll('.image-dot-indicator');

            // Function to update main image
            function updateMainImage(imageIndex) {
                // Update main image
                mainImage.src = productImages[imageIndex];
                
                // Update active thumbnail
                thumbnailItems.forEach(item => item.classList.remove('active-thumbnail'));
                thumbnailItems[imageIndex].classList.add('active-thumbnail');
                
                // Update active dot
                imageDots.forEach(dot => dot.classList.remove('active-dot'));
                imageDots[imageIndex].classList.add('active-dot');
            }

            // Add click event to thumbnails
            thumbnailItems.forEach((item, index) => {
                item.addEventListener('click', function() {
                    updateMainImage(index);
                });
            });

            // Add click event to dots
            imageDots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    updateMainImage(index);
                });
            });

            // Action buttons
            const addToCartBtn = document.querySelector('.add-cart-button');
            const buyNowBtn = document.querySelector('.buy-now-button');

            addToCartBtn.addEventListener('click', function() {
                const selectedSize = document.querySelector('.size-option-button.selected-size').dataset.size;
                const quantity = quantityInput.value;
                alert(`Added ${quantity} x ${selectedSize} Turkey, Chickpea & Sweet Potato to cart!`);
            });

            buyNowBtn.addEventListener('click', function() {
                const selectedSize = document.querySelector('.size-option-button.selected-size').dataset.size;
                const quantity = quantityInput.value;
                alert(`Proceeding to buy ${quantity} x ${selectedSize} Turkey, Chickpea & Sweet Potato!`);
            });
        });
        
