const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';


async function getProphetData() {
  const response = await fetch(url); // request
  const data = await response.json(); // parse the JSON data
  console.table(data.prophets); // temp output test of data response 
  displayProphets(data.prophets);
}

const displayProphets = (prophets) => {
  // card build code goes here
  prophets.forEach((prophet) => {
    // card build code goes here
    const cards = document.querySelector('#cards');
    const card = document.createElement("section");
    const fullName = document.createElement("h2");
    const portrait = document.createElement("img");
    let par = document.createElement("p");
    let par1 = document.createElement("p");
    // Build the h2 content out to show the prophet's full name
    fullName.textContent = `${prophet.name} ${prophet.lastname}`; // fill in the blank
    par.textContent = `Date of Birth: ${prophet.birthdate}`;
    par1.textContent = `Place of Birth: ${prophet.birthplace}`;
    
    // Build the image portrait by setting all the relevant attributes
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`); // fill in the blank
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    card.style.backgroundColor = "rgba(85, 85, 85, 0.6)";
    card.style.textAlign = "center";
    portrait.style.width = "70%";
    portrait.style.display = "flex";
    portrait.style.justifyContent = "center";
    portrait.style.alignItems = "center";
    portrait.style.borderRadius = "20px 20px 0 0";

    // Append the section(card) with the created elements
    card.appendChild(fullName); //fill in the blank
    card.appendChild(par);
    card.appendChild(par1);
    card.appendChild(portrait);

    cards.appendChild(card);
    

  });
}

getProphetData();
