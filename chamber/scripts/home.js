// chamber/scripts.js
document.addEventListener('DOMContentLoaded', () => {
    // Current Year for Footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Last Modified Date for Footer
    const lastModifiedSpan = document.getElementById('lastModified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }

    // Hamburger Menu Functionality
    const navIcon = document.querySelector("#ham-btn");
const navBar = document.querySelector('.navigation');

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

    // Home Page Specific Logic
    if (document.querySelector('.home-main')) {
        // Use a string for the API key, not a full URL
        const OPENWEATHER_API_KEY_STRING = '5071297ee1335c91dacb2564bdc298cf'; // Your actual API key
        const WEATHER_LAT = 5.55; 
        const WEATHER_LON = 5.77;
        // Fetch Weather Data
        async function fetchWeatherData() {
            // Construct correct URLs for current weather and forecast
            const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${WEATHER_LAT}&lon=${WEATHER_LON}&units=metric&appid=${OPENWEATHER_API_KEY_STRING}`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${WEATHER_LAT}&lon=${WEATHER_LON}&units=metric&appid=${OPENWEATHER_API_KEY_STRING}`;

            try {
                // Current Weather
                const currentWeatherResponse = await fetch(currentWeatherUrl);
                if (!currentWeatherResponse.ok) throw new Error(`HTTP error! status: ${currentWeatherResponse.status} from current weather`);
                const currentWeatherData = await currentWeatherResponse.json();
                document.getElementById('current-temp').textContent = currentWeatherData.main.temp.toFixed(0);
                document.getElementById('weather-desc').textContent = currentWeatherData.weather[0].description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

                // 3-Day Forecast
                const forecastResponse = await fetch(forecastUrl);
                if (!forecastResponse.ok) throw new Error(`HTTP error! status: ${forecastResponse.status} from forecast`);
                const forecastData = await forecastResponse.json();
                displayForecast(forecastData); // Pass forecastData to displayForecast

            } catch (error) {
                console.error('Error fetching weather data:', error);
                document.getElementById('current-temp').textContent = 'N/A';
                document.getElementById('weather-desc').textContent = 'Failed to load weather';
                document.getElementById('forecast-container').innerHTML = '<p>Failed to load forecast.</p>';
            }
        }

        function displayForecast(data) {
            const forecastContainer = document.getElementById('forecast-container');
            forecastContainer.innerHTML = '<h4>3-Day Forecast:</h4>'; // Clear previous content

            const dailyForecasts = {}; // To store one forecast per day

            // Iterate through the 3-hour forecast data from data.list
            // Check if data.list exists and is an array
            if (data && Array.isArray(data.list)) {
                data.list.forEach(item => {
                    const date = new Date(item.dt * 1000);
                    const day = date.toDateString(); // Get date string to group by day

                    // Only take the first forecast for each day to represent the daily temp
                    if (!dailyForecasts[day]) {
                        dailyForecasts[day] = {
                            temp: item.main.temp,
                            description: item.weather[0].description,
                            icon: item.weather[0].icon
                        };
                    }
                });
            } else {
                console.warn('Forecast data list is missing or not an array:', data);
                forecastContainer.innerHTML += '<p>No forecast data available.</p>';
                return; // Exit if no valid list
            }

            const forecastDays = Object.keys(dailyForecasts).slice(0, 3); // Get the next 3 days

            forecastDays.forEach(day => {
                const forecast = dailyForecasts[day];
                const dayElement = document.createElement('div');
                dayElement.classList.add('forecast-day');

                const dateObj = new Date(day);
                dayElement.innerHTML = `
                    <p><strong>${dateObj.toLocaleDateString('en-US', { weekday: 'short' })}</strong></p>
                    <img src="https://openweathermap.org/img/wn/${forecast.icon}.png" alt="${forecast.description}">
                    <p>${forecast.temp.toFixed(0)}°C</p>
                    <p class="description">${forecast.description}</p>
                `;
                forecastContainer.appendChild(dayElement);
            });
        }

        fetchWeatherData(); // Call weather function on page load

        // Fetch Member Data for Spotlights
        let membersData = []; // Declare membersData at a scope accessible by displaySpotlights

        async function fetchMembers() {
            try {
                const response = await fetch('members.json'); // Assumes members.json is in a 'data' folder
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                membersData = await response.json(); // Assign fetched data to membersData
                displaySpotlights(membersData); // Pass the fetched data to displaySpotlights
            } catch (error) {
                console.error('Error fetching member data:', error);
                document.getElementById('spotlight-grid').innerHTML = '<p>Failed to load member spotlights. Please try again later.</p>';
            }
        }

        function displaySpotlights(members) { // 'members' here is the array of member objects
            const spotlightGrid = document.getElementById('spotlight-grid');
            spotlightGrid.innerHTML = ''; // Clear existing spotlights

            // CORRECTED LINE: Access 'member.membership' directly within the filter callback
            // Assuming your JSON uses "membership" (as in the sample provided previously: "membership": "Gold")
            const qualifiedMembers = members.filter(member => member.membershipLevel === "Gold" || member.membershipLevel === "Silver");

            // Handle case where there aren't enough qualified members
            if (qualifiedMembers.length < 2) {
                spotlightGrid.innerHTML = '<p>Not enough Gold or Silver members to display spotlights.</p>';
                return;
            }

            // // Shuffle qualified members and pick 2 or 3
            // const shuffledMembers = qualifiedMembers.sort(() => 0.5 - Math.random());
            // // Ensure numberOfSpotlights doesn't exceed the number of available qualified members
            // const numberOfSpotlights = Math.min(Math.floor(Math.random() * 2) + 2, qualifiedMembers.length);
            // const selectedSpotlights = shuffledMembers.slice(0, numberOfSpotlights);

            qualifiedMembers.forEach(member => {
                const card = document.createElement('div');
                card.classList.add('spotlight-card');
                card.innerHTML = `
                    <img src="${member.image}" alt="${member.name} Logo">
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <p><a href="${member.website}" target="_blank">${member.website.replace(/(^\w+:|^)\/\//, '')}</a></p>
                    <p class="membership-level">${member.membershipLevel} Member</p>`;
                spotlightGrid.appendChild(card);
            });
        }

        fetchMembers();

    }
});