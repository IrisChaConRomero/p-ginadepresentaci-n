/**
 * Portfolio Express - JavaScript Principal
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar iconos de Lucide
    lucide.createIcons();

    // 2. Lógica para el menú responsivo (Móvil)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Cambiar icono de menú a "x" cuando está abierto
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            // Re-renderizar el icono actualizado
            lucide.createIcons();
        });
    }

    // 3. Cerrar el menú móvil al hacer clic en un enlace
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    });

    // 4. Efecto sutil de Navbar al hacer scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
            navbar.style.padding = '0'; // Se puede ajustar la altura si se desea
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // 5. Animación simple de aparición al hacer scroll (Intersection Observer)
    // Seleccionamos las tarjetas para darles un efecto de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.card, .section-header, .about-text, .stat-item');
    
    animateElements.forEach((el, index) => {
        // Configuración inicial antes de la animación
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index % 4 * 0.1}s`;
        
        // Observar elemento
        observer.observe(el);
    });
});
