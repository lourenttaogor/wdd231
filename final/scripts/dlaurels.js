document.addEventListener('DOMContentLoaded', () => {
    const navIcon = document.querySelector("#ham-btn");
    const navBar = document.querySelector('#nav-bar');

    navIcon.addEventListener("click", () => {
    navIcon.classList.toggle("show");
    navBar.classList.toggle('show'); 
})


window.addEventListener('scroll', () => {
    if (window.innerWidth >= 608) { // Only for large screens
        if (window.scrollY > 0) {
            navBar.classList.add('fixed');
        } else {
            navBar.classList.remove('fixed');
        }
    } else {
        navBar.classList.remove('fixed'); // Remove fixed on small screens
    }
});

const currentYearElements = document.querySelector('#currentyear');
const modifiedYearElements = document.querySelector('#lastModified');

let today = new Date();
let modified = new Date(document.lastModified);

currentYearElements.innerHTML = `${new Intl.DateTimeFormat('en-UK', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
}
).format(today)}`;


modifiedYearElements.innerHTML = `Last Modified ${new Intl.DateTimeFormat('en-UK', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
}
).format(modified)}`;




    const slideWrapper = document.querySelector('.carousel-slide-wrapper');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentIndex = 0;
    const totalSlides = slides.length;
    const intervalTime = 3000; // Time in milliseconds (5 seconds)

    // Function to move to the next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }

    // Function to update the carousel's position
    function updateCarousel() {
        const slideWidth = slides[0].clientWidth;
        slideWrapper.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
    }

    // Auto-play interval
    let autoPlay = setInterval(nextSlide, intervalTime);

    // Stop auto-play on hover
    slideWrapper.addEventListener('mouseenter', () => {
        clearInterval(autoPlay);
    });

    slideWrapper.addEventListener('mouseleave', () => {
        autoPlay = setInterval(nextSlide, intervalTime);
    });

    // Manual navigation buttons
    nextBtn.addEventListener('click', () => {
        clearInterval(autoPlay); // Stop animation when user interacts
        nextSlide();
        autoPlay = setInterval(nextSlide, intervalTime); // Restart after interaction
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(autoPlay); // Stop animation when user interacts
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
        autoPlay = setInterval(nextSlide, intervalTime); // Restart after interaction
    });

    // Optional: Add event listener for window resize to recalculate slideWidth
    window.addEventListener('resize', () => {
        updateCarousel();
    });

    function openTab(evt, tabName) {
  // Declare all variables
  var i, tabContent, tabButtons;

  // Get all elements with class="tab-content" and hide them
  tabContent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  // Get all elements with class="tab-button" and remove the "active" class
  tabButtons = document.getElementsByClassName("tab-button");
  for (i = 0; i < tabButtons.length; i++) {
    tabButtons[i].className = tabButtons[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
});