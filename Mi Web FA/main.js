// Funciones de utilidad
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Animación de typed text en el hero
function initTypedText() {
    const typed = new Typed('#typed-text', {
        strings: [
            'Espacios reales.',
            'Diseño funcional.',
            'Resultados que se viven.'
        ],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

// Animaciones de reveal al hacer scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Modal de imagen
function openModal(imageSrc) {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    
    modalImage.src = imageSrc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('image-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Modal de contacto
function openContactModal() {
    const modal = document.getElementById('contact-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeContactModal() {
    const modal = document.getElementById('contact-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Cerrar modales al hacer clic fuera
document.addEventListener('click', (e) => {
    const imageModal = document.getElementById('image-modal');
    const contactModal = document.getElementById('contact-modal');
    
    if (e.target === imageModal) closeModal();
    if (e.target === contactModal) closeContactModal();
});

// Cerrar modales con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeContactModal();
    }
});

// WhatsApp
function openWhatsApp() {
    const phone = '+34600000000';
    const message = 'Hola, me interesa solicitar una asesoría para mi proyecto de interiorismo.';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Manejo de formularios
document.addEventListener('DOMContentLoaded', function() {
    // Formulario principal de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) contactForm.addEventListener('submit', handleFormSubmit);
    
    // Formulario rápido del modal
    const quickContactForm = document.getElementById('quick-contact-form');
    if (quickContactForm) quickContactForm.addEventListener('submit', handleFormSubmit);

    // Inicializar componentes
    initTypedText();
    initScrollAnimations();
    initTestimonialSlider();
    initMobileMenu();
    initSmoothScroll();
    initParallax();
    initLazyLoading();
    setTimeout(initAnimations, 500);

    // Manejo de imágenes con error
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Error al cargar imagen:', this.src);
        });
    });
});

// Función de envío del formulario con pop-up
async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');

    // Deshabilitar botón mientras se envía
    submitBtn.disabled = true;
    submitBtn.classList.add("opacity-50", "cursor-not-allowed");

    try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        });

        if (response.ok) {
            form.reset();
            showNotification("Consulta enviada correctamente. Te contactaré pronto.", "success");
            closeContactModal();
        } else {
            showNotification("Hubo un error al enviar el formulario. Intenta de nuevo.", "error");
        }

    } catch (err) {
        console.error("Error capturado:", err);
        showNotification("Hubo un error al enviar el formulario. Intenta de nuevo.", "error");
    } finally {
        submitBtn.disabled = false;
        submitBtn.classList.remove("opacity-50", "cursor-not-allowed");
    }
}

// Sistema de notificaciones tipo pop-up
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed bottom-80 right-6 z-50 p-4 rounded-lg shadow-lg max-w-sm transform translate-y-10 opacity-0 transition-all duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' : 
        type === 'error' ? 'bg-red-500 text-white' : 
        'bg-warm-stone text-white'
    }`;
    
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white/80 hover:text-white">
                ✕
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    requestAnimationFrame(() => notification.classList.remove('translate-y-10', 'opacity-0'));
    
    setTimeout(() => {
        notification.classList.add('translate-y-10', 'opacity-0');
        notification.addEventListener('transitionend', () => notification.remove());
    }, 5000);
}

// Slider de testimonios
function initTestimonialSlider() {
    const slider = document.getElementById('testimonials-slider');
    if (slider) {
        new Splide(slider, {
            type: 'loop',
            perPage: 1,
            perMove: 1,
            autoplay: true,
            interval: 5000,
            pauseOnHover: true,
            arrows: false,
            pagination: true,
            breakpoints: { 768: { perPage: 1 } }
        }).mount();
    }
}

// Menú móvil
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            let mobileMenu = document.getElementById('mobile-menu');
            if (!mobileMenu) {
                mobileMenu = document.createElement('div');
                mobileMenu.id = 'mobile-menu';
                mobileMenu.className = 'md:hidden bg-warm-white border-t border-warm-beige/50';
                mobileMenu.innerHTML = `
                    <div class="px-6 py-4 space-y-4">
                        <a href="#inicio" class="block hover:text-warm-stone transition-colors">Inicio</a>
                        <a href="#sobre-mi" class="block hover:text-warm-stone transition-colors">Sobre mí</a>
                        <a href="#servicios" class="block hover:text-warm-stone transition-colors">Servicios</a>
                        <a href="#proceso" class="block hover:text-warm-stone transition-colors">Proceso</a>
                        <a href="#portfolio" class="block hover:text-warm-stone transition-colors">Portfolio</a>
                        <a href="#contacto" class="block hover:text-warm-stone transition-colors">Contacto</a>
                    </div>
                `;
                nav.appendChild(mobileMenu);
            }
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Smooth scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);

            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) mobileMenu.classList.add('hidden');
        });
    });
}

// Animaciones con Anime.js
function initAnimations() {
    anime({ targets: '.hero-bg', opacity: [0,1], duration: 2000, easing: 'easeOutQuart' });
    anime({ targets: '.service-card', translateY: [30,0], opacity: [0,1], delay: anime.stagger(200), duration: 800, easing: 'easeOutQuart' });
    anime({ targets: '.process-step', scale: [0.8,1], opacity: [0,1], delay: anime.stagger(150), duration: 600, easing: 'easeOutBack' });
}

// Optimización: debounce
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const later = () => { clearTimeout(timeout); func(...args); };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    images.forEach(img => observer.observe(img));
}

// Parallax
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-bg');
    const handleScroll = debounce(() => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(element => element.style.transform = `translateY(${scrolled * -0.5}px)`);
    }, 10);
    window.addEventListener('scroll', handleScroll);
}

// Manejo de errores global
window.addEventListener('error', function(e) {
    console.error('Error capturado:', e.error);
    showNotification('Ha ocurrido un error. Por favor, intenta de nuevo.', 'error');
});
