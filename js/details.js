async function displayShowDetails() {

    const showId = window.location.search.split("=")[1];
  
    const cardShowDetail = document.querySelector("#show-details");
    const show = await fetchAPIdata(`tv/${showId}`);
  
    // Overlay for background image
    displayBackgroundImage('tv', show.backdrop_path);
  
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="details-top">
        <div>
          ${show.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img-top" alt="${show.name}" />`
            : `<img src="images/no-image.jpg" class="card-img-top" alt="${show.name}" />`}
        </div>
        <div>
          <h2>${show.name}</h2>
          <p>
            <i class="fas fa-star text-primary"></i>
            ${show.vote_average}/ 10
          </p>
          <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
          <p>
            ${show.overview}
          </p>
          <h5>Genres</h5>
          <ul class="list-group">
            ${show.genres
              ? show.genres.map((genre) => `<li>${genre.name}</li>`).join("")
              : ""}
          </ul>
          <a href="${show.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
        </div>
      </div>
      <div class="details-bottom">
        <h2>Show Info</h2>
        <ul>
          <li><span class="text-secondary">Number of Episodes:</span>
            ${show.number_of_episodes ? show.number_of_episodes : "N/A"}
          </li>
          <li><span class="text-secondary">Last Episode to Air:</span>
            ${show.last_episode_to_air ? show.last_episode_to_air : "N/A"}
          </li>
          <li><span class="text-secondary">Status:</span> ${show.status}</li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group">
          ${show.production_companies
            ? show.production_companies
                .map((company) => ` <span>${company.name} </span>`)
                .join("")
            : ""}
        </div>
      </div>
    `;
    cardShowDetail.appendChild(div);
  }
  
   // display Movies details

   async function displayMoviesDetails() {

    const movieId = window.location.search.split("=")[1];
  
   
    const cardShowDetail = document.querySelector("#movie-details");
    const movie = await fetchAPIdata(`movie/${movieId}`);
  
         // Overlay for background image
    displayBackgroundImage('movie', movie.backdrop_path);
  
  
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="details-top">
        <div>
          ${movie.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}" />`
            : `<img src="images/no-image.jpg" class="card-img-top" alt="${movie.title}" />`}
        </div>
        <div>
          <h2>${movie.title}</h2>
          <p>
            <i class="fas fa-star text-primary"></i>
            ${movie.vote_average}/ 10
          </p>
          <p class="text-muted">Release Date: ${movie.release_date}</p>
          <p>
          ${movie.overview}
          </p>
          <h5>Genres</h5>
          <ul class="list-group">
          ${movie.genres.map((genre)=> `<li> ${genre.name}</li>`).join("")}
          </ul>
          <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
        </div>
      </div>
      <div class="details-bottom">
        <h2>Movie Info</h2>
        <ul>
          <li><span class="text-secondary">Budget:</span>$${ addcommaToNumber(movie.budget)}</li>
          <li><span class="text-secondary">Revenue:</span>$${ addcommaToNumber(movie.revenue)}</li>
          <li><span class="text-secondary">Runtime:</span> $${ addcommaToNumber(movie.runtime)}</li>
          <li><span class="text-secondary">Status:</span> ${movie.status}</li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group">${movie.production_companies
           .map((company)=>` <span>${company.name} </span>`)
           .join(",")}
          </div>
      </div>
    `;
    cardShowDetail.appendChild(div);
  }