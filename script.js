document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    const dots = document.querySelectorAll('.dot');
    
    let currentIndex = 0;
    const itemWidth = carouselItems[0].offsetWidth;
    const itemCount = carouselItems.length;
    
    // Initialize carousel
    updateCarousel();
    
    // Event listeners for navigation
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        updateCarousel();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % itemCount;
        updateCarousel();
    });
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100 / 3}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Auto-rotate carousel
    setInterval(() => {
        currentIndex = (currentIndex + 1) % itemCount;
        updateCarousel();
    }, 5000);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = '#fff';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Mobile menu toggle (for smaller screens)
    const createMobileMenu = () => {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        const mobileMenuBtn = document.createElement('div');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        
        header.insertBefore(mobileMenuBtn, nav);
        
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            
            if (nav.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    };
    
    // Only create mobile menu if screen width is below 768px
    if (window.innerWidth < 768) {
        createMobileMenu();
    }
    
    // Resize event listener
    window.addEventListener('resize', () => {
        if (window.innerWidth < 768 && !document.querySelector('.mobile-menu-btn')) {
            createMobileMenu();
        } else if (window.innerWidth >= 768 && document.querySelector('.mobile-menu-btn')) {
            document.querySelector('.mobile-menu-btn').remove();
            document.querySelector('nav').classList.remove('active');
        }
    });
});