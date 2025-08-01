document.addEventListener('DOMContentLoaded', () => {

    // 1. **Immediate & Quick Operations:**
    //    These are fast and needed as soon as the DOM is ready.
    const currentYearElements = document.querySelector('#currentYear');
    const modifiedYearElements = document.querySelector('#lastModified');

    let today = new Date();
    let modified = new Date(document.lastModified);

    // Using getFullYear() for just the year for currentYear, as per typical footer practice.
    // If you explicitly want the full date here, that's fine, but year is common.
    currentYearElements.textContent = today.getFullYear(); // Simplified for just the year

    modifiedYearElements.innerHTML = `Last Modified ${new Intl.DateTimeFormat('en-UK', {
        year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
    }).format(modified)}`;


    // 2. **Hamburger Menu (Interactive, doesn't block):**
    //    This is an event listener, so it doesn't execute heavy code until clicked.
    const navIcon = document.querySelector("#ham-btn");
    const navBar = document.querySelector('.navigation');

    navIcon.addEventListener("click", () => {
        navIcon.classList.toggle("show");
        navBar.classList.toggle('show');
    });

    // 3. **Functions (Defined, but not called yet):**
    //    Define your functions here.
    function displayPlaces(placesData) { // Renamed 'place' to 'placesData' for clarity
        const placesGrid = document.querySelector('.places');
        if (!placesGrid) {
            console.warn("Element with class 'places' not found. Cannot display places.");
            return;
        }
        placesGrid.innerHTML = ''; // Clear existing content

        // Use a DocumentFragment for efficient DOM manipulation
        const fragment = document.createDocumentFragment();

        placesData.forEach(place => {
            const card = document.createElement('div');
            // Add a class to the card if needed, e.g., 'place-card'
            card.classList.add('place-card');
            card.innerHTML = `
                <img src="${place.photo}" alt="${place.name}">
                <h3>${place.name}</h3>
                <p class="address">${place.address}</p>
                <p>${place.description}</p>`;
            fragment.appendChild(card);
        });
        placesGrid.appendChild(fragment);
    }

    async function placeFetch() {
        try {
            const response = await fetch(`/chamber/scripts/places.json`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json(); // Use const here for scope
            displayPlaces(data);
        } catch (error) {
            console.error('Error fetching member data:', error);
        }
    }



    setTimeout(() => {
        placeFetch(); 
        let visitCount = localStorage.getItem('visitCount');
        let lastVisitTimestamp = parseInt(localStorage.getItem('lastVisitTimestamp'), 10);
        let now = Date.now();
        const MS_PER_DAY = 24 * 60 * 60 * 1000;

        if (!lastVisitTimestamp) {
            visitCount = 1;
            alert('Welcome! Let us know if you have any questions.');
        } else {
            const daysAgo = Math.floor((now - lastVisitTimestamp) / MS_PER_DAY);
            if (daysAgo < 1) {
                alert("Back so soon! Awesome!");
            } else {
                alert(`You last visited ${daysAgo} day(s) ago.`);
            }
            visitCount = parseInt(visitCount || 0) + 1; 
        }

        localStorage.setItem('visitCount', visitCount);
        localStorage.setItem('lastVisitTimestamp', now); 

    }, 0);
});