// script.js para el portafolio de Mikel Garduño

document.addEventListener("DOMContentLoaded", function () {
    // ===== ANIMACIÓN DE SECCIONES =====
    const sections = document.querySelectorAll(".section-animated");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));

    // ===== CONFIGURACIÓN DE PARTÍCULAS PARA EL HERO =====
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#ffffff"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });

    // ===== ANIMACIÓN DE LA BARRA DE NAVEGACIÓN =====
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-shrink');
        } else {
            navbar.classList.remove('navbar-shrink');
        }
    });

    // ===== DESPLAZAMIENTO SUAVE =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== ANIMACIÓN DE BARRAS DE HABILIDADES =====
    const animateSkills = () => {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            const skillLevel = item.querySelector('.skill-level');
            skillLevel.style.animation = 'skillProgress 1.5s ease-out forwards';
        });
    };

    // Iniciar animación de habilidades cuando la sección es visible
    const skillsSection = document.querySelector('#habilidades');
    const skillsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // ===== VALIDACIÓN DEL FORMULARIO DE CONTACTO =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            let isValid = true;
            
            if (!name) {
                showError('name', 'Por favor, introduce tu nombre');
                isValid = false;
            } else {
                removeError('name');
            }
            
            if (!email || !isValidEmail(email)) {
                showError('email', 'Por favor, introduce un email válido');
                isValid = false;
            } else {
                removeError('email');
            }
            
            if (!subject) {
                showError('subject', 'Por favor, introduce un asunto');
                isValid = false;
            } else {
                removeError('subject');
            }
            
            if (!message) {
                showError('message', 'Por favor, introduce un mensaje');
                isValid = false;
            } else {
                removeError('message');
            }
            
            if (isValid) {
                // Aquí iría el código para enviar el formulario
                // Por ahora, simularemos un envío exitoso
                contactForm.reset();
                showSuccessMessage();
            }
        });
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function showError(inputId, message) {
        const input = document.getElementById(inputId);
        let errorElement = input.nextElementSibling;
        
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message text-danger mt-1';
            input.parentNode.insertBefore(errorElement, input.nextElementSibling);
        }
        
        errorElement.textContent = message;
        input.classList.add('is-invalid');
    }

    function removeError(inputId) {
        const input = document.getElementById(inputId);
        const errorElement = input.nextElementSibling;
        
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
        
        input.classList.remove('is-invalid');
    }

    function showSuccessMessage() {
        const formContainer = contactForm.parentElement;
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success mt-3';
        successMessage.textContent = '¡Mensaje enviado con éxito! Te responderé lo antes posible.';
        
        formContainer.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    }

    // ===== CARRUSEL DE TECNOLOGÍAS EN TEXTO =====
    const techList = [
        "HTML", "CSS", "JavaScript", "Django", "Python", "Java",
        "Spring Boot", "C", "C++", "Swagger", "MongoDB",
        "Agile Scrum", "CRM SAP", "ERP Salesforce", "Figma", "GitHub"
    ];

    const typingSpeed = 100; // Velocidad de escritura (ms)
    const pauseBetween = 2000; // Pausa entre palabras (ms)
    const typingElement = document.getElementById('typing-effect');
    
    if (typingElement) {
        let currentWordIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingTimeout;

        function typeEffect() {
            const currentWord = techList[currentWordIndex];
            
            if (isDeleting) {
                // Borrar caracteres
                typingElement.textContent = currentWord.substring(0, currentCharIndex - 1);
                currentCharIndex--;
            } else {
                // Escribir caracteres
                typingElement.textContent = currentWord.substring(0, currentCharIndex + 1);
                currentCharIndex++;
            }
            
            // Determinar la siguiente acción
            if (!isDeleting && currentCharIndex === currentWord.length) {
                // Palabra completa - esperar y luego borrar
                isDeleting = true;
                typingTimeout = setTimeout(typeEffect, pauseBetween);
            } else if (isDeleting && currentCharIndex === 0) {
                // Palabra borrada - pasar a la siguiente
                isDeleting = false;
                currentWordIndex = (currentWordIndex + 1) % techList.length;
                typingTimeout = setTimeout(typeEffect, 500);
            } else {
                // Continuar escribiendo o borrando
                const typingDelay = isDeleting ? typingSpeed / 2 : typingSpeed;
                typingTimeout = setTimeout(typeEffect, typingDelay);
            }
        }
        
        // Iniciar el efecto de escritura
        typeEffect();
    }

    // ===== CONTADOR DE PROYECTOS Y EXPERIENCIA =====
    function animateCounter(element, target, duration, prefix = '', suffix = '') {
        let start = 0;
        const increment = target > 0 ? Math.ceil(target / (duration / 16)) : 0;
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = prefix + target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = prefix + start + suffix;
            }
        }, 16);
    }

    // Iniciar contadores cuando son visibles
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    const prefix = entry.target.getAttribute('data-prefix') || '';
                    const suffix = entry.target.getAttribute('data-suffix') || '';
                    animateCounter(entry.target, target, 2000, prefix, suffix);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
});