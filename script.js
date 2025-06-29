const menuToggle = document.getElementById('menuToggle');
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const mainContent = document.getElementById('mainContent');
const modal = document.getElementById('comingSoonModal');
const modalMessage = document.getElementById('modalMessage');

function toggleSidebar() {
    const isActive = sidebar.classList.contains('active');
    
    if (isActive) {
        closeSidebar();
    } else {
        openSidebar();
    }
}

function openSidebar() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
}

menuToggle.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', closeSidebar);

document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', () => {
        closeSidebar();
    });
});

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = 70;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
    closeSidebar();
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

function openComingSoon(investmentType) {
    const messages = {
        'SIP': 'The SIP calculator is under development. Track your systematic investment plan returns soon!',
        'PPF': 'The PPF calculator is coming soon. Calculate your Public Provident Fund returns with ease!',
        'FD': 'The Fixed Deposit calculator is under development. Get accurate FD return calculations soon!',
        'Annuity': 'The Annuity calculator is coming soon. Plan your retirement income effectively!',
        'Stocks': 'The Stock Market calculator is under development. Track your equity investments soon!'
    };
    
    modalMessage.textContent = messages[investmentType] || 'This investment calculator is under development.';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 0) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.investment-card, .tool-card, .hero-stats');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeSidebar();
    }
});

function preventScroll(e) {
    if (sidebar.classList.contains('active') && window.innerWidth <= 768) {
        e.preventDefault();
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    console.log('Form submitted');
}

// Utility function to detect mobile devices
function isMobile() {
    return window.innerWidth <= 768;
}

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 0) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

console.log(`
🚀 Investment Tracker Website
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Built with vanilla HTML, CSS & JavaScript
Version: 2.0
Developer: Dharun-2k7
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
});
