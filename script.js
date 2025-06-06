// --- Scroll to Top Button ---
let scrollToTopBtn = document.getElementById("scrollToTopBtn");

if (scrollToTopBtn) { // Check if the button exists
    // When the user scrolls down 200px from the top of the document, show the button
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
      if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollToTopBtn.style.display = "block";
      } else {
        scrollToTopBtn.style.display = "none";
      }
    }

    // When the user clicks on the button, smoothly scroll to the top of the document
    scrollToTopBtn.onclick = function() {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
}

// --- Scroll Animations (Fade-in effect) ---
const fadeInElements = document.querySelectorAll('.fade-in-element');

if (fadeInElements.length > 0) { // Check if there are elements to animate
    const observerOptions = {
      root: null, // relative to document viewport
      rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
      threshold: 0.1 // visible amount of item shown in screen (0.0 to 1.0)
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Stop observing once visible, so animation doesn't re-trigger
        }
      });
    }, observerOptions);

    fadeInElements.forEach(el => {
      observer.observe(el);
    });
}
