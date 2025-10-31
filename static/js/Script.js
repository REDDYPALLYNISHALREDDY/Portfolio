if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.scrollTo(0, 0);

window.addEventListener('load', function() {
    window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, 0);
});

if (window.location.hash) {
    window.history.replaceState(null, null, '');
}

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        hamburger.classList.toggle('active');
    });
}

if (navLinks && navLinks.length > 0) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    });
} else {
    console.warn('⚠️ Nav links not found. Make sure you have elements with class "nav-link"');
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behaviour: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = 'var(--dark-bg)';
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
          });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.8s ease-out';
    observer.observe(section);
});

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    observer.observe(card);
});

const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach((category, index) => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(30px)';
    category.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    observer.observe(category);
});

const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = `all 0.6s ease-out ${index * 0.2}s`;
    observer.observe(item);
});

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

const socialButtons = document.querySelectorAll('.social-btn');
socialButtons.forEach(btn => {
    btn.addEventListener('click', function (e) {
        const platform = this.classList[1];
        
        console.log(`Opening ${platform} link`);
    });
});

const heroButtons = document.querySelectorAll('.hero-buttons a');
heroButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });

    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

window.addEventListener('load', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }
});

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

console.log('Portfolio website loaded successfully! 🚀');

// ========================================
// CONTACT FORM - EMAIL SENDING
// ========================================

console.log('📧 Contact form handler loaded');

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    console.log('✅ Contact form found!');
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        console.log('📤 Form submitted!');
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        console.log('📝 Form data:', formData);
        
        // Show sending message
        if (formMessage) {
            formMessage.textContent = '⏳ Sending message...';
            formMessage.className = 'form-message';
            formMessage.style.display = 'block';
        }
        
        try {
            console.log('🔄 Sending to /send-message...');
            
            const response = await fetch('/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            console.log('📡 Response received:', response.status);
            
            const result = await response.json();
            console.log('📨 Server response:', result);
            
            if (result.success) {
                formMessage.textContent = '✅ Message sent successfully! Check your email.';
                formMessage.className = 'form-message success';
                contactForm.reset();
                
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            } else {
                throw new Error(result.message);
            }
            
        } catch (error) {
            console.error('❌ Error:', error);
            formMessage.textContent = '❌ Failed to send message. Error: ' + error.message;
            formMessage.className = 'form-message error';
        }
    });
} else {
    console.error('❌ Contact form with id="contactForm" not found!');
}