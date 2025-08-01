import { places } from "../places.mjs";

document.addEventListener('DOMContentLoaded', () => {

    const currentYearElements = document.querySelector('#currentYear');
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

    // Hamburger Menu Functionality
    const navIcon = document.querySelector("#ham-btn");
    const navBar = document.querySelector('.navigation');

    navIcon.addEventListener("click", () => {
        navIcon.classList.toggle("show");
        navBar.classList.toggle('show'); 
    });

    const placesGrid = document.querySelector('.places');
    placesGrid.innerHTML = ''; 

    const selectedPlaces = places;

    selectedPlaces.forEach(place => {
                const card = document.createElement('div');
                // card.classList.add('spotlight-card');
                card.innerHTML = `
                    <img src="${place.photo}" alt="${place.name}">
                    <h3>${place.name}</h3>
                    <p class="address">${place.address}</p>
                    <p>${place.description}</p>`;
                placesGrid.appendChild(card);
            });


 let visitCount = localStorage.getItem('visitCount');
 let visitHistory = JSON.parse(localStorage.getItem('visitHistory')) || []
 let now = Date.now();
 const lastVisit = parseInt(localStorage.getItem('lastVisit'), 10);

 if (!visitCount) {
    visitCount = 1;
    visitHistory = now;
    alert('Welcome! Let us know if you have any questions.')
 }
 else if(lastVisit && (now - lastVisit < 86400000)){
    alert("Back so soon! Awesome!");
 }
 else{
    alert(`You have visited ${visitHistory} days ago`);
 }

})