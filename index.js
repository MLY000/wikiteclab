// ===== PARTICLES.JS CONFIGURATION =====
document.addEventListener('DOMContentLoaded', function() {
  // Configuración de particles.js para el fondo
  if (typeof particlesJS !== 'undefined') {
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
          value: '#ffffff'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
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
          color: '#ffffff',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
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
  }

  // ===== SCROLL TO SECTIONS =====
  const scrollDown = document.getElementById('scrollDown');
  if (scrollDown) {
    scrollDown.addEventListener('click', function() {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    });
  }

  // ===== REVEAL ANIMATIONS ON SCROLL =====
  function revealElements() {
    const reveals = document.querySelectorAll('.reveal');
    
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add('active');
      }
    }
  }

  window.addEventListener('scroll', revealElements);
  // Ejecutar una vez al cargar la página
  revealElements();

  // ===== PARAJES FILTERING AND SEARCH =====
  const filterButtons = document.querySelectorAll('.filter-btn');
  const parajeCards = document.querySelectorAll('.col-xl-3.col-lg-4.col-md-6.col-sm-6.col-12');
  const searchInput = document.getElementById('parajeSearch');
  const noResults = document.getElementById('noResults');

  // Filtrar por categoría
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remover clase active de todos los botones
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Agregar clase active al botón clickeado
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      filterParajes(filter);
    });
  });

  // Buscar parajes
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase().trim();
      
      // Si hay un filtro activo, usarlo junto con la búsqueda
      const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
      
      filterParajes(activeFilter, searchTerm);
    });
  }

  function filterParajes(filter, searchTerm = '') {
    let visibleCount = 0;
    
    parajeCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const searchData = card.getAttribute('data-search').toLowerCase();
      const cardText = card.textContent.toLowerCase();
      
      // Comprobar si coincide con el filtro y término de búsqueda
      const matchesFilter = filter === 'all' || category === filter;
      const matchesSearch = searchTerm === '' || 
                           searchData.includes(searchTerm) || 
                           cardText.includes(searchTerm);
      
      if (matchesFilter && matchesSearch) {
        card.style.display = 'block';
        visibleCount++;
        // Agregar animación de aparición
        card.classList.add('reveal');
        setTimeout(() => card.classList.add('active'), 50);
      } else {
        card.style.display = 'none';
        card.classList.remove('active');
      }
    });
    
    // Mostrar u ocultar mensaje de no resultados
    if (noResults) {
      if (visibleCount === 0) {
        noResults.style.display = 'block';
      } else {
        noResults.style.display = 'none';
      }
    }
  }

  // ===== INTERACTIVE CARD FLIP =====
  const interactiveCard = document.querySelector('.interactive-card');
  if (interactiveCard) {
    // Ya tiene la funcionalidad con CSS, pero añadimos un evento de click para móviles
    interactiveCard.addEventListener('touchstart', function(e) {
      if (window.innerWidth < 992) { // Solo en dispositivos móviles
        this.classList.toggle('flipped');
        e.preventDefault();
      }
    });
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId !== '#' && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Ajuste para el header
            behavior: 'smooth'
          });
          
          // Actualizar URL sin hacer saltar la página
          history.pushState(null, null, targetId);
        }
      }
    });
  });

  // ===== ACTIVE NAV LINK HIGHLIGHTING =====
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.footer-column a[href^="#"]');
  
  function highlightNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavLink);
  highlightNavLink(); // Ejecutar al cargar

  // ===== FORM VALIDATION (si hay formularios en el futuro) =====
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const inputs = this.querySelectorAll('input[required], textarea[required]');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
      });
      
      if (isValid) {
        // Aquí iría el envío del formulario
        console.log('Formulario válido, enviando...');
        // this.submit(); // Descomentar cuando se implemente el backend
      }
    });
  });

  // ===== LAZY LOADING PARA IMÁGENES (si se añaden en el futuro) =====
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  }

  // ===== BACK TO TOP BUTTON =====
  // Crear botón de volver arriba
  const backToTopButton = document.createElement('button');
  backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
  backToTopButton.classList.add('back-to-top');
  backToTopButton.setAttribute('aria-label', 'Volver arriba');
  document.body.appendChild(backToTopButton);

  // Mostrar u ocultar el botón según el scroll
  function toggleBackToTop() {
    if (window.scrollY > 500) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  }

  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('scroll', toggleBackToTop);
  toggleBackToTop(); // Ejecutar al cargar

  // ===== LOADING ANIMATION =====
  // Simular carga de recursos
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Ocultar animación de carga después de un tiempo
    setTimeout(function() {
      const loader = document.getElementById('loading');
      if (loader) loader.style.display = 'none';
    }, 1000);
  });

  // ===== INTERACTIVE TEAM CARDS =====
  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // ===== TAB FUNCTIONALITY FOR METHODOLOGY SECTION =====
  const methodTabs = document.querySelectorAll('.method-tabs .nav-link');
  if (methodTabs.length > 0) {
    methodTabs.forEach(tab => {
      tab.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remover clase active de todas las pestañas
        methodTabs.forEach(t => t.classList.remove('active'));
        // Agregar clase active a la pestaña clickeada
        this.classList.add('active');
        
        // Mostrar el contenido correspondiente
        const target = this.getAttribute('data-bs-target');
        const tabPanes = document.querySelectorAll('.method-content .tab-pane');
        
        tabPanes.forEach(pane => {
          pane.classList.remove('show', 'active');
        });
        
        document.querySelector(target).classList.add('show', 'active');
      });
    });
  }

  // ===== COUNTER ANIMATION FOR STATS =====
  const statNumbers = document.querySelectorAll('.stat-number');
  let counted = false;

  function animateCounters() {
    const statsSection = document.querySelector('.research-stats');
    if (!statsSection) return;
    
    const sectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight - 100 && !counted) {
      counted = true;
      
      statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let count = 0;
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60fps
        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            stat.textContent = target + '+';
            clearInterval(timer);
          } else {
            stat.textContent = Math.floor(count) + '+';
          }
        }, 16);
      });
    }
  }

  window.addEventListener('scroll', animateCounters);
  animateCounters(); // Ejecutar al cargar
});

// ===== RESIZE OBSERVER PARA AJUSTES RESPONSIVE =====
const resizeObserver = new ResizeObserver(entries => {
  // Ajustar altura del hero section en dispositivos móviles
  const hero = document.querySelector('.hero');
  if (hero && window.innerWidth < 768) {
    hero.style.height = `${window.innerHeight}px`;
  }
});

// Observar cambios en el tamaño de la ventana
resizeObserver.observe(document.body);
// JS/index.js - Archivo JavaScript principal
console.log("JavaScript cargado correctamente");

// Research Impact Section - Counter Animation
function initResearchSection() {
  // Animación de contadores
  const statNumbers = document.querySelectorAll('.research-section .stat-number');
  let counted = false;

  function animateCounters() {
    const researchSection = document.querySelector('.research-section');
    if (!researchSection) return;
    
    const sectionTop = researchSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight - 100 && !counted) {
      counted = true;
      
      statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let count = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            stat.textContent = target + '+';
            clearInterval(timer);
          } else {
            stat.textContent = Math.floor(count) + '+';
          }
        }, 16);
      });
    }
  }

  // Animación de revelado al hacer scroll
  function revealElements() {
    const reveals = document.querySelectorAll('.research-section .reveal');
    
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add('active');
      }
    }
  }

  // Event listeners
  window.addEventListener('scroll', () => {
    animateCounters();
    revealElements();
  });
  
  // Ejecutar al cargar
  animateCounters();
  revealElements();
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initResearchSection);
} else {
  initResearchSection();
}
/* Cargar particles.js en el div con id 'particles-js' */
particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: false },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 4,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      grab: { distance: 140, line_linked: { opacity: 1 } },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});
