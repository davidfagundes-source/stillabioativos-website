document.addEventListener("DOMContentLoaded", () => {
  // Add base reveal classes to major sections (excluding hero which has its own entry animation)
  const elementsToReveal = document.querySelectorAll(
    ".section-heading, .info-card, .feature-card, .benefit-card, .timeline-item, .problem-solution article, .result-card, .pricing-options article, .video-link-card, .bio-card, .instagram-item, .cta-card"
  );
  
  elementsToReveal.forEach((el, index) => {
    el.classList.add("reveal");
    // Add small delay staggering for grid items
    el.style.transitionDelay = `${(index % 4) * 0.1}s`;
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
  });
  
  // Header shrink on scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.padding = '0.2rem 0';
      header.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
      header.style.padding = '0';
      header.style.background = 'rgba(255, 255, 255, 0.8)';
    }
  });

  // Slideshow Logic
  const initSlideshow = () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    if (!slides.length) return;

    let currentSlide = 0;

    const showSlide = (n) => {
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      
      currentSlide = (n + slides.length) % slides.length;
      
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => showSlide(index));
    });

    // Auto-advance every 5 seconds
    setInterval(() => showSlide(currentSlide + 1), 5000);
  };

  initSlideshow();
});
