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
  
  // Find ALL stat numbers on the page (works for any section)
  const allStatNumbers = document.querySelectorAll('.stat-number[data-target]')
  
  if (allStatNumbers.length > 0) {
    // Trigger counter animation when stats become visible
    const observerOptions = {
      threshold: 0.5 // Trigger when 50% visible
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Check if this counter hasn't been animated yet
          if (entry.target.textContent === '0') {
            animateCounter(entry.target)
          }
        }
      })
    }, observerOptions)
    
    // Observe each stat number individually
    allStatNumbers.forEach(statNumber => {
      observer.observe(statNumber)
    })
  }

  // DONATION AMOUNT BUTTON FUNCTIONALITY
  const donationButtons = document.querySelectorAll('.donation-amount-btn')
  const customAmountInput = document.getElementById('customAmount')
  
  if (donationButtons.length > 0) {
    // Handle preset amount button clicks
    donationButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        donationButtons.forEach(btn => btn.classList.remove('active'))
        
        // Add active class to clicked button
        this.classList.add('active')
        
        // Clear custom amount input
        if (customAmountInput) {
          customAmountInput.value = ''
        }
        
        // Get the amount from button text
        const amount = this.textContent.trim()
        console.log('Selected amount:', amount)
      })
    })
    
    // Handle custom amount input
    if (customAmountInput) {
      customAmountInput.addEventListener('focus', function() {
        // Remove active class from all preset buttons when custom input is focused
        donationButtons.forEach(btn => btn.classList.remove('active'))
      })
      
      customAmountInput.addEventListener('input', function() {
        // Remove active class from preset buttons when typing custom amount
        donationButtons.forEach(btn => btn.classList.remove('active'))
      })
    }
  }
})