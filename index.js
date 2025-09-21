// ===== PARTICLES.JS CONFIGURACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
  // Solo inicializar particles.js si existe el contenedor
  if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
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
          speed: 2,
          direction: "none",
          random: true,
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
  }

  // Inicializar todas las funcionalidades
  initPage();
});

// ===== SCROLL SUAVE Y ANIMACIONES =====
function scrollToContent() {
  const target = document.querySelector('.collab-section');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

// Revelar elementos al hacer scroll
function revealOnScroll() {
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

// Efecto parallax para la sección hero
function parallaxEffect() {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector('.hero');
  
  if (parallax) {
    parallax.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
  }
}

// ===== ANIMACIÓN DE TARJETA INTERACTIVA =====
function initInteractiveCard() {
  const interactiveCard = document.querySelector('.interactive-card');
  
  if (interactiveCard) {
    interactiveCard.addEventListener('mouseenter', function() {
      this.style.transform = 'rotateY(180deg)';
    });
    
    interactiveCard.addEventListener('mouseleave', function() {
      this.style.transform = 'rotateY(0deg)';
    });
  }
}

// ===== ANIMACIÓN DE CONTADORES ESTADÍSTICAS =====
function initCounterAnimation() {
  const statItems = document.querySelectorAll('.stat-item');
  let counted = false;
  
  function animateCounters() {
    if (counted) return;
    
    const windowHeight = window.innerHeight;
    const statsSection = document.querySelector('.research-stats');
    
    if (!statsSection) return;
    
    const sectionTop = statsSection.getBoundingClientRect().top;
    
    if (sectionTop < windowHeight - 100) {
      counted = true;
      
      statItems.forEach(item => {
        const numberElement = item.querySelector('.stat-number');
        const finalValue = parseInt(numberElement.textContent);
        let currentValue = 0;
        const duration = 2000; // 2 segundos
        const increment = finalValue / (duration / 16); // 60fps
        
        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= finalValue) {
            clearInterval(timer);
            currentValue = finalValue;
          }
          numberElement.textContent = Math.floor(currentValue);
        }, 16);
      });
    }
  }
  
  window.addEventListener('scroll', animateCounters);
  // Verificar al cargar por si ya está en vista
  animateCounters();
}

// ===== EFECTO DE CARGA INICIAL =====
function initPageLoadAnimation() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 1s ease-in-out';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
}

// ===== INICIALIZAR TODO =====
function initPage() {
  initPageLoadAnimation();
  initInteractiveCard();
  initCounterAnimation();
  
  // Event listeners para scroll
  window.addEventListener('scroll', function() {
    revealOnScroll();
    parallaxEffect();
  });
  
  // Event listener para el botón de scroll
  const scrollDownBtn = document.getElementById('scrollDown');
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', scrollToContent);
  }
  
  // Ejecutar una vez al cargar para elementos ya visibles
  revealOnScroll();
}
// ===== COUNTER ANIMATION FOR STATS =====
function animateCounters() {
  const statsSection = document.querySelector('.research-stats');
  if (!statsSection) return;
  
  const sectionTop = statsSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;
  
  if (sectionTop < windowHeight - 100) {
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;
    
    if (!counted) {
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
}

// Ejecutar cuando se cargue la página y al hacer scroll
window.addEventListener('load', animateCounters);
window.addEventListener('scroll', animateCounters);
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

  // Estilos para la animación de revelado
  const style = document.createElement('style');
  style.textContent = `
    .research-section .reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: all 1s ease;
    }
    
    .research-section .reveal.active {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

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