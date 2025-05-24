document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector("header");
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Mobile menu functionality
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const nav = document.getElementById("nav");
  
  if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenuToggle.classList.toggle("active");
      nav.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenuToggle.classList.remove("active");
        nav.classList.remove("active");
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        mobileMenuToggle.classList.remove("active");
        nav.classList.remove("active");
      }
    });
  }

  // Active navigation highlighting
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav ul li a");

  window.addEventListener("scroll", () => {
    let current = "";
    
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionHeight = section.offsetHeight;
      
      if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.parentElement.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.parentElement.classList.add("active");
      }
    });
  });

  // Counter animation for statistics
  const animateCounters = () => {
    const counters = document.querySelectorAll(".estatistica-number");
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute("data-target"));
      const increment = target / 100;
      let current = 0;
      
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      updateCounter();
    });
  };

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        
        // Trigger counter animation for statistics section
        if (entry.target.classList.contains("estatisticas")) {
          animateCounters();
        }
      }
    });
  }, observerOptions);

  // Observar a seção de estatísticas
const estatisticasSection = document.querySelector(".estatisticas");

if (estatisticasSection) {
  // Observa a seção para disparar animações quando ela aparecer
  observer.observe(estatisticasSection);

  // Se já estiver visível ao carregar a página, dispara a animação imediatamente
  if (estatisticasSection.getBoundingClientRect().top < window.innerHeight) {
    animateCounters();
  }
}

  // Gallery hover effects
  const galleryItems = document.querySelectorAll(".gallery-item");
  
  galleryItems.forEach(item => {
    item.addEventListener("mouseenter", () => {
      galleryItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.style.opacity = "0.7";
        }
      });
    });
    
    item.addEventListener("mouseleave", () => {
      galleryItems.forEach(otherItem => {
        otherItem.style.opacity = "1";
      });
    });
  });

  // Lazy loading for images
  const images = document.querySelectorAll("img");
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.classList.add("fade-in");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => {
    imageObserver.observe(img);
  });

  // Form validation and enhancement (if forms are added later)
  const forms = document.querySelectorAll("form");
  
  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      // Add loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.classList.add("loading");
        submitBtn.textContent = "Enviando...";
        
        // Simulate form submission
        setTimeout(() => {
          submitBtn.classList.remove("loading");
          submitBtn.textContent = "Enviado!";
          form.reset();
          
          setTimeout(() => {
            submitBtn.textContent = "Enviar";
          }, 2000);
        }, 2000);
      }
    });
  });

  // Performance optimization: Debounce scroll events
  let scrollTimeout;
  
  const debouncedScroll = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      // Additional scroll-based animations can be added here
    }, 10);
  };

  window.addEventListener("scroll", debouncedScroll);

  // Accessibility improvements
  document.addEventListener("keydown", (e) => {
    // ESC key closes mobile menu
    if (e.key === "Escape" && nav && nav.classList.contains("active")) {
      mobileMenuToggle.classList.remove("active");
      nav.classList.remove("active");
    }
  });

  // Preload critical images
  const criticalImages = [
    "images_index/hero_bg.png",
    "images_index/logo_black.png",
    "images_index/favicon.png"
  ];

  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  console.log("Luz Estetic Center website loaded successfully!");
});