const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75047143854418&lon=6.638098549539262&appid=5071297ee1335c91dacb2564bdc298cf&units=imperial';


async function apiFetch() {
        try {
            // Correct path assuming 'data' folder
            const response = await fetch(url); // Changed path to 'data/members.json'

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse JSON. membersData will directly be the array from members.json
            data = await response.json();
            console.table(data); // Use this to check the structure if it errors again
            displayResults(data); // Pass the array directly
        } catch (error) {
            console.error('Error fetching member data:', error);
        }
    }


function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp}&deg;F`;
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.03d.png`;
  let desc = data.weather[0].description;
  weatherIcon.setAttribute('weather', data.main.name);
  captionDesc.textContent = `${desc}`;

  const main = document.querySelector("main");
  
}

apiFetch();