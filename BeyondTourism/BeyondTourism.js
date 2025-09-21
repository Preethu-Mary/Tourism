const activitiesData = {
    'temple': {
        title: 'Traditional Temple Visit',
        subtitle: 'Experience the spiritual heart of Kerala village life',
        images: [
            "../Images/church.jpg",
            "../Images/hindu.jpg"
        ],
        
        highlights: [
            'Visit ancient village temples',
            'Witness traditional daily prayers',
            'Participate in ritual offerings',
            'Learn about temple architecture',
            'Meet temple priests and devotees',
            'Experience spiritual chanting',
            'Traditional temple feast',
            'Blessing ceremony participation'
        ]
    },
    'engagement': {
        title: 'Traditional Engagement Ceremony',
        subtitle: 'When families gather to exchange blessings and formally announce the match',
        images: [
            'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&h=400&fit=crop'
        ],
        price: 'USD 50 per person',
        description: 'Experience the beautiful tradition of a Kerala engagement ceremony...',
        highlights: [
            'Traditional ring exchange ceremony',
            'Family blessing rituals',
            'Cultural music and prayers',
            'Traditional sweets and refreshments',
            'Henna application demonstration',
            'Family storytelling sessions',
            'Photography with the families',
            'Ceremonial gift exchanges'
        ]
    },
    // ... (Add the rest of your data here unchanged)
};

// Global state
let modalSlideIndex = 0;
let autoSlideInterval = null;
let currentActivityType = null;


// Open modal and populate content
function openModal(activityType) {
    const modal = document.getElementById('activityModal');
    currentActivityType = activityType;
    const data = activitiesData[activityType];
    if (!data) return;

    modalSlideIndex = 0;

    // Set content
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalSubtitle').textContent = data.subtitle;

    // Images
    const slideshowContainer = document.getElementById('modalSlideshowContainer');
    slideshowContainer.innerHTML = '';

    if (data.images && data.images.length > 0) {
        data.images.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Slide ${index + 1}`;
            img.classList.add('modal-slide');
            if (index === 0) img.classList.add('active');
            slideshowContainer.appendChild(img);
        });

        // Optional: pause/resume auto slide on hover
        slideshowContainer.addEventListener('mouseenter', stopAutoSlide);
        slideshowContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // Highlights
    const highlightsList = document.getElementById('modalHighlights');
    highlightsList.innerHTML = '';
    data.highlights.forEach(highlight => {
        const li = document.createElement('li');
        li.textContent = highlight;
        highlightsList.appendChild(li);
    });

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Start auto slide
    startAutoSlide();
}

// Change slide
function changeModalSlide(n) {
    const slides = document.querySelectorAll('#modalSlideshowContainer img');
    if (!slides.length) return;

    slides[modalSlideIndex].classList.remove('active');
    modalSlideIndex = (modalSlideIndex + n + slides.length) % slides.length;
    slides[modalSlideIndex].classList.add('active');
}

// Auto slide
function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(() => {
        changeModalSlide(1);
    }, 3000); // Change every 3 seconds
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('activityModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    stopAutoSlide();
}

// Booking placeholder
function bookExperience() {
    window.location.href = '../contactPage/contact.html';
}

// View full details placeholder
function viewFullDetails() {
    window.location.href = '/wedding-details.html';
}

// Close modal when clicking outside content
document.getElementById('activityModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});


function addToCart() {
    const activity = activitiesData[currentActivityType];
    if (!activity) return;

    // Load existing cart from sessionStorage
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

    // Add the current activity to the cart
    cart.push({
        type: currentActivityType,
        title: activity.title,
      
    });

    // Save updated cart
    sessionStorage.setItem('cart', JSON.stringify(cart));

    // Optional: Confirmation
    alert(`${activity.title} has been added to your cart!`);
    
    // Optional: Redirect to cart page
    window.location.href = '../contactPage/contact.html';
}

