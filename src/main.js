// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// Import Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css'
// Import Bootstrap JS
import * as bootstrap from 'bootstrap'
// Import custom styles
import './style.css'

// Auto-update copyright year
document.addEventListener('DOMContentLoaded', () => {
  const yearElement = document.getElementById('year')
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear()
  }
  
  // Simple counter animation for impact stats
  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'))
    const duration = 2000 // 2 seconds
    const increment = target / (duration / 16) // 60fps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        element.textContent = target
        clearInterval(timer)
      } else {
        element.textContent = Math.floor(current)
      }
    }, 16)
  }
  
  // Trigger counter animation when stats section is visible
  const observerOptions = {
    threshold: 0.5
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.stat-number[data-target]')
        counters.forEach(counter => {
          if (counter.textContent === '0') {
            animateCounter(counter)
          }
        })
      }
    })
  }, observerOptions)
  
  // Observe the impact section
  const impactSection = document.getElementById('impact')
  if (impactSection) {
    observer.observe(impactSection)
  }
})