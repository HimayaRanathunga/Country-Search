const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-btn');
const cardContainer = document.querySelector('.container .row');

async function fetchCountryData(countryName) {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
    if (!response.ok) throw new Error('Country not found');
    const data = await response.json();
    return data[0]; 
  } catch (error) {
    alert(error.message);
    return null;
  }
}

function createCountryCard(country) {
  return `
    <div class="col-sm">
      <div class="card h-100">
        <img src="${country.flags.svg}" class="card-img-top" alt="Flag of ${country.name.common}">
        <div class="card-body">
          <h5 class="card-title">${country.name.common}</h5>
          <p class="card-text">
            <strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}<br>
            <strong>Region:</strong> ${country.region}<br>
            <strong>Population:</strong> ${country.population.toLocaleString()}
          </p>
          <a href="https://www.google.com/maps?q=${country.latlng[0]},${country.latlng[1]}" 
             target="_blank" class="btn btn-primary">View on Google Map</a>
        </div>
      </div>
    </div>
  `;
}

async function handleSearch() {
  const countryName = searchBar.value.trim();
  if (!countryName) {
    alert('Please enter a country name!');
    return;
  }

  const countryData = await fetchCountryData(countryName);
  if (countryData) {
    cardContainer.innerHTML = createCountryCard(countryData);
  }
}

searchButton.addEventListener('click', handleSearch);

searchBar.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});
