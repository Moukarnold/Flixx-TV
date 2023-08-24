// Fetch 20 popular movies and display them
async function displayPopularMovies() {

    const { results } = await fetchAPIdata("movie/popular");
  
    const cardContainer = document.querySelector("#popular-movies");
  
    results.forEach((movie) => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
          ${movie.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}" />`
            : `<img src="images/no-image.jpg" class="card-img-top" alt="${movie.title}" />`}
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
        </div>
      `;
  
      cardContainer.appendChild(div);
    });
  }

  // Fetch 20 popular movies tv show
  async function displayPopularShows() {
    const { results } = await fetchAPIdata("tv/popular");
  
    const cardContainershows = document.querySelector("#popular-shows");
  
    results.forEach((show) => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
        <a href="movie-details.html?id=${show.id}">
          ${show.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img-top" alt="${show.name}" />`
            : `<img src="images/no-image.jpg" class="card-img-top" alt="${show.name}" />`}
        </a>
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p class="card-text">
            <small class="text-muted">Air Date: ${show.first_air_date}</small>
          </p>
        </div>
      `;
  
      cardContainershows.appendChild(div);
    });
  }
