document.addEventListener('DOMContentLoaded', () => {
  // --- Header Scroll State Change ---
  const header = document.getElementById('mainHeader');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });

  // --- Scroll-Triggered Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once revealed, we don't need to observe it anymore
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null, // Viewport
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Slightly offset trigger point
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // --- Navigation Active Link Highlighting ---
  const sections = document.querySelectorAll('section, footer');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    root: null,
    threshold: 0.5 // Trigger when 50% of the section is in view
  });

  sections.forEach(section => {
    if (section.id) navObserver.observe(section);
  });

  // --- Random Authentic Neon Flicker ---
  const neonElements = document.querySelectorAll('.neon-flicker');

  function randomFlicker(element) {
    // Generate a random duration for the flicker pause
    const timeout = Math.random() * 8000 + 2000; // between 2s and 10s
    
    setTimeout(() => {
      // Temporarily dim the element to simulate a brief brownout or drop in power
      element.style.textShadow = '0 0 2px rgba(74, 156, 93, 0.2), 0 0 4px rgba(74, 156, 93, 0.1)';
      element.style.opacity = '0.6';
      
      setTimeout(() => {
        // Recover original glowing style
        element.style.textShadow = '';
        element.style.opacity = '';
        
        // Double flicker probability
        if (Math.random() > 0.5) {
          setTimeout(() => {
            element.style.textShadow = '0 0 2px rgba(74, 156, 93, 0.2), 0 0 4px rgba(74, 156, 93, 0.1)';
            element.style.opacity = '0.6';
            setTimeout(() => {
              element.style.textShadow = '';
              element.style.opacity = '';
            }, 80);
          }, 100);
        }
        
        // Recursive call for the next flicker
        randomFlicker(element);
      }, 150);
    }, timeout);
  }

  neonElements.forEach(el => randomFlicker(el));

  // --- Mobile Navigation Toggle ---
  const menuToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('primaryNavigation');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      menuToggle.classList.toggle('open');
      navMenu.classList.toggle('nav-open');
      document.body.classList.toggle('no-scroll');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('open');
        navMenu.classList.remove('nav-open');
        document.body.classList.remove('no-scroll');
      });
    });

    // Close menu if window is resized above 900px
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) {
        if (menuToggle.classList.contains('open')) {
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.classList.remove('open');
          navMenu.classList.remove('nav-open');
          document.body.classList.remove('no-scroll');
        }
      }
    });
  }
});

// --- Smooth Scrolling Helper ---
function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId);
  if (target) {
    const headerHeight = document.getElementById('mainHeader').offsetHeight;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

// --- Gallery Item Data ---
const galleryItemsData = [
  { src: 'assets/hero_patio.png', alt: 'El Patio de Noche - Cafetería Toscanos', caption: 'El Patio de Noche: Un ambiente mágico bajo las guías de luz y la copa de los árboles.', category: 'place' },
  { src: 'assets/cafe_interior.png', alt: 'Rincón Acogedor - Cafetería Toscanos', caption: 'Rincón Acogedor: Interiores de diseño rústico-industrial idóneos para una tarde de lectura.', category: 'place' },
  { src: 'assets/facade_neon.png', alt: 'Fachada de Neón - Cafetería Toscanos', caption: 'Fachada de Neón: Nuestro icónico letrero ilumina las noches históricas de Maravatío.', category: 'place' },
  { src: 'assets/brunch_dish.png', alt: 'Avocado Toast Gourmet - Cafetería Toscanos', caption: 'Avocado Toast Gourmet: Pan de masa madre artesanal con aguacate cremoso, queso feta y huevo poché.', category: 'food' },
  { src: 'assets/barista_pour.png', alt: 'Arte Latte del Barista - Cafetería Toscanos', caption: 'Arte Latte: Café de especialidad preparado a la perfección por baristas expertos.', category: 'food' },
  { src: 'assets/concha_dessert.png', alt: 'Concha con Nata & Fresas - Cafetería Toscanos', caption: 'Concha con Nata & Fresas: Pan dulce mexicano tradicional relleno de nata batida de rancho.', category: 'food' }
];

let currentFilteredItems = [...galleryItemsData];
let currentLightboxIndex = 0;

// --- Gallery Tab Filtering ---
function filterGallery(category) {
  // Update active button state
  const filterButtons = document.querySelectorAll('.gallery-section .filter-btn');
  filterButtons.forEach(btn => btn.classList.remove('active'));

  // Find matching button and activate it
  if (category === 'all') {
    document.getElementById('galleryFilterBtnAll').classList.add('active');
    currentFilteredItems = [...galleryItemsData];
  } else if (category === 'place') {
    document.getElementById('galleryFilterBtnPlace').classList.add('active');
    currentFilteredItems = galleryItemsData.filter(item => item.category === 'place');
  } else if (category === 'food') {
    document.getElementById('galleryFilterBtnFood').classList.add('active');
    currentFilteredItems = galleryItemsData.filter(item => item.category === 'food');
  }

  // Filter Cards
  const cards = document.querySelectorAll('.gallery-card');
  
  cards.forEach((card, index) => {
    const cardCategory = card.getAttribute('data-category');
    
    // Smooth transition
    card.style.opacity = '0';
    card.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
      if (category === 'all' || cardCategory === category) {
        card.style.display = 'block';
        // Force reflow
        card.offsetHeight;
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
        
        // Re-assign the correct index in currentFilteredItems to this card for lightbox opening
        const cardImgSrc = card.querySelector('img').getAttribute('src');
        const matchingIndex = currentFilteredItems.findIndex(item => item.src === cardImgSrc);
        card.setAttribute('onclick', `openLightbox(${matchingIndex})`);
      } else {
        card.style.display = 'none';
      }
    }, 200);
  });
}

// --- Lightbox Modal Logic ---
function openLightbox(index) {
  const lightbox = document.getElementById('lightboxModal');
  if (!lightbox) return;

  currentLightboxIndex = index;
  updateLightboxContent();

  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
}

function closeLightbox() {
  const lightbox = document.getElementById('lightboxModal');
  if (!lightbox) return;

  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  
  // Only remove no-scroll if mobile menu is not also open
  const menuToggle = document.getElementById('mobileMenuToggle');
  if (!menuToggle || !menuToggle.classList.contains('open')) {
    document.body.classList.remove('no-scroll');
  }
}

function updateLightboxContent() {
  const imgElement = document.getElementById('lightboxImg');
  const captionElement = document.getElementById('lightboxCaption');
  
  if (imgElement && captionElement && currentFilteredItems[currentLightboxIndex]) {
    const item = currentFilteredItems[currentLightboxIndex];
    
    // Fade out first for a smoother transition
    imgElement.style.opacity = '0';
    
    setTimeout(() => {
      imgElement.src = item.src;
      imgElement.alt = item.alt;
      captionElement.textContent = item.caption;
      imgElement.style.opacity = '1';
    }, 150);
  }
}

function nextLightboxImage() {
  if (currentFilteredItems.length === 0) return;
  currentLightboxIndex = (currentLightboxIndex + 1) % currentFilteredItems.length;
  updateLightboxContent();
}

function prevLightboxImage() {
  if (currentFilteredItems.length === 0) return;
  currentLightboxIndex = (currentLightboxIndex - 1 + currentFilteredItems.length) % currentFilteredItems.length;
  updateLightboxContent();
}

// Bind Lightbox Event Listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightboxModal');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  if (lightbox) {
    // Close on clicking close button or black backdrop background
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });

    // Navigation triggers
    if (prevBtn) prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevLightboxImage();
    });
    
    if (nextBtn) nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextLightboxImage();
    });

    // Keyboard navigation (global)
    document.addEventListener('keydown', (e) => {
      if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowRight') {
          nextLightboxImage();
        } else if (e.key === 'ArrowLeft') {
          prevLightboxImage();
        }
      }
    });
  }
});
