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
      element.style.textShadow = '0 0 2px rgba(255, 58, 36, 0.2), 0 0 4px rgba(255, 58, 36, 0.1)';
      element.style.opacity = '0.6';
      
      setTimeout(() => {
        // Recover original glowing style
        element.style.textShadow = '';
        element.style.opacity = '';
        
        // Double flicker probability
        if (Math.random() > 0.5) {
          setTimeout(() => {
            element.style.textShadow = '0 0 2px rgba(255, 58, 36, 0.2), 0 0 4px rgba(255, 58, 36, 0.1)';
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
});

// --- Menu Tab Filtering ---
function filterMenu(category) {
  // Update active button state
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => btn.classList.remove('active'));

  // Find matching button and activate it
  if (category === 'all') {
    document.getElementById('filterBtnAll').classList.add('active');
  } else if (category === 'sweet') {
    document.getElementById('filterBtnCoffee').classList.add('active');
  } else if (category === 'savory') {
    document.getElementById('filterBtnSavory').classList.add('active');
  }

  // Filter Cards
  const cards = document.querySelectorAll('.menu-item-card');
  
  cards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    
    // Smooth transition
    card.style.opacity = '0';
    card.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
      if (category === 'all' || cardCategory === category) {
        card.style.display = 'flex';
        // Force reflow
        card.offsetHeight;
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      } else {
        card.style.display = 'none';
      }
    }, 200); // match transition duration
  });
}

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
