// --- Hamburger Mobile Menu Logic ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// --- Dark Mode Toggle Logic ---
const themeToggleBtn = document.getElementById('themeToggle');

if (themeToggleBtn) {
    const themeIcon = themeToggleBtn.querySelector('i');

    // Check for previously saved theme preference in localStorage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        // Save preference
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        
        // Safely swap the icon classes
        if (themeIcon) {
            if (isDarkMode) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }
    });
}

// --- Reservation Form, LocalStorage & Success Modal Logic ---
const reservationForm = document.getElementById('reservationForm');
const successModal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModal');

if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Grab values safely from the form inputs
        const nameInput = reservationForm.querySelector('input[type="text"]:not(#reservationDate)');
        const emailInput = reservationForm.querySelector('input[type="email"]');
        const dateInput = document.getElementById('reservationDate');
        const guestsInput = reservationForm.querySelector('select');

        const reservationData = {
            name: nameInput ? nameInput.value : '',
            email: emailInput ? emailInput.value : '',
            date: dateInput ? dateInput.value : '',
            guests: guestsInput ? guestsInput.value : '',
            bookedAt: new Date().toLocaleString()
        };

        // Retrieve existing reservations or start a new array
        let savedReservations = JSON.parse(localStorage.getItem('bellaVistaReservations')) || [];
        
        // Push the new reservation into the array
        savedReservations.push(reservationData);
        
        // Save back to localStorage
        localStorage.setItem('bellaVistaReservations', JSON.stringify(savedReservations));

        // Show the success modal
        if (successModal) {
            successModal.classList.add('active');
        }
        
        // Reset form and date input placeholder trick
        reservationForm.reset();
        if (dateInput) {
            dateInput.type = 'text'; 
        }
    });
}

// Modal Close Handlers
if (successModal && closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.remove('active');
        }
    });
}