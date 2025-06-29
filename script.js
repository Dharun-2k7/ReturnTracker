
// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const mainContent = document.getElementById('mainContent');
const modal = document.getElementById('comingSoonModal');
const modalMessage = document.getElementById('modalMessage');
const themeToggle = document.getElementById('themeToggle');
const sidebarThemeToggle = document.getElementById('sidebarThemeToggle');
const themeIcon = document.getElementById('themeIcon');
const sidebarThemeIcon = document.getElementById('sidebarThemeIcon');

// Theme functionality
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcons(newTheme);
}

function updateThemeIcons(theme) {
    const isDark = theme === 'dark';
    const iconClass = isDark ? 'fas fa-sun' : 'fas fa-moon';
    const text = isDark ? 'Light Mode' : 'Dark Mode';
    
    themeIcon.className = iconClass;
    sidebarThemeIcon.className = iconClass;
    
    // Update sidebar theme toggle text
    const sidebarText = sidebarThemeToggle.querySelector('span');
    if (sidebarText) {
        sidebarText.textContent = text;
    }
}

// Mobile menu functionality
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

// Event listeners
menuToggle.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', closeSidebar);
themeToggle.addEventListener('click', toggleTheme);
sidebarThemeToggle.addEventListener('click', toggleTheme);

// Close sidebar when clicking on sidebar links
document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', () => {
        closeSidebar();
    });
});

// Smooth scrolling for navigation links
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

// Handle all navigation links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Coming Soon Modal functionality
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

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Header scroll effect
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow to header when scrolled
    if (scrollTop > 0) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initializeTheme();
    
    const animatedElements = document.querySelectorAll('.investment-card, .tool-card, .hero-stats');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Resize handler
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeSidebar();
    }
});

// Prevent scroll when sidebar is open on mobile
function preventScroll(e) {
    if (sidebar.classList.contains('active') && window.innerWidth <= 768) {
        e.preventDefault();
    }
}

// Form submission handler (if you add contact forms later)
function handleFormSubmit(e) {
    e.preventDefault();
    // Add form submission logic here
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

