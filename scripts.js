const API_KEY ='your_api_key_here'; // Replace with your OMDb API key
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');
searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    searchMovies(query);
  }
});

async function searchMovies(query) {
  resultsContainer.innerHTML = 'Loading...';
   try{
    const response = await fetch(`https://www.omdbapi.com/?apikey=9583a5f0 &s=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      resultsContainer.innerHTML = `<p>No results found for "${query}"</p>`;
    }
  } catch (error) {
    console.error(error);
    resultsContainer.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
  }
}

function displayMovies(movies) {
  resultsContainer.innerHTML = '';
  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie');
    movieCard.innerHTML = `
      <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    `;
    resultsContainer.appendChild(movieCard);
  });
}
