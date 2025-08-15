// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mainMenu = document.getElementById('mainMenu');

menuToggle.addEventListener('click', () => {
    mainMenu.classList.toggle('show');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (mainMenu.classList.contains('show')) {
            mainMenu.classList.remove('show');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !phone || !message) {
        alert('Silakan lengkapi semua kolom!');
        return;
    }
    
    // In a real application, you would send this data to your server
    // Here we'll just show a success message
    alert(`Terima kasih ${name}! Pesan Anda telah terkirim. Kami akan menghubungi Anda segera melalui ${phone} atau ${email}.`);
    
    // Reset form
    contactForm.reset();
});

// Video Play Button
const videoPlayBtn = document.querySelector('.video-play-btn');
videoPlayBtn.addEventListener('click', () => {
    alert('Video "Sehari di Afia Farm" akan diputar. Dalam implementasi sebenarnya, ini akan membuka video YouTube atau pemutar video.');
});
