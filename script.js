document.addEventListener("DOMContentLoaded", () => {
  // Static gallery functionality (no carousel rotation)
  const carousel = document.querySelector(".carousel")
  const carouselItems = document.querySelectorAll(".carousel-item")
  const prevBtn = document.querySelector(".carousel-nav.prev")
  const nextBtn = document.querySelector(".carousel-nav.next")
  const dots = document.querySelectorAll(".dot")

  // Hide navigation elements since we want static images
  if (prevBtn) prevBtn.style.display = "none"
  if (nextBtn) nextBtn.style.display = "none"

  // Hide dots since we don't need navigation
  const dotsContainer = document.querySelector(".carousel-dots")
  if (dotsContainer) dotsContainer.style.display = "none"

  // Set carousel to show all images at once
  if (carousel) {
    carousel.style.transform = "translateX(0)"
    carousel.style.display = "grid"
    carousel.style.gridTemplateColumns = "repeat(5, 1fr)"
    carousel.style.gap = "20px"
    carousel.style.width = "100%"
  }

  // Update carousel items to fit in grid
  carouselItems.forEach((item) => {
    item.style.flex = "none"
    item.style.padding = "0"
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Header scroll effect
  const header = document.querySelector("header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.95)"
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
    } else {
      header.style.background = "#fff"
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
    }
  })

  // Mobile menu toggle (for smaller screens)
  const createMobileMenu = () => {
    const header = document.querySelector("header")
    const nav = document.querySelector("nav")

    const mobileMenuBtn = document.createElement("div")
    mobileMenuBtn.classList.add("mobile-menu-btn")
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>'

    header.insertBefore(mobileMenuBtn, nav)

    mobileMenuBtn.addEventListener("click", () => {
      nav.classList.toggle("active")

      if (nav.classList.contains("active")) {
        mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>'
      } else {
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>'
      }
    })
  }

  // Only create mobile menu if screen width is below 768px
  if (window.innerWidth < 768) {
    createMobileMenu()
  }

  // Resize event listener
  window.addEventListener("resize", () => {
    if (window.innerWidth < 768 && !document.querySelector(".mobile-menu-btn")) {
      createMobileMenu()
    } else if (window.innerWidth >= 768 && document.querySelector(".mobile-menu-btn")) {
      document.querySelector(".mobile-menu-btn").remove()
      document.querySelector("nav").classList.remove("active")
    }

    // Update grid layout for mobile
    if (carousel) {
      if (window.innerWidth <= 768) {
        carousel.style.gridTemplateColumns = "repeat(2, 1fr)"
      } else if (window.innerWidth <= 1024) {
        carousel.style.gridTemplateColumns = "repeat(3, 1fr)"
      } else {
        carousel.style.gridTemplateColumns = "repeat(5, 1fr)"
      }
    }
  })
})