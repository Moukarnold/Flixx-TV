const global = {
    currentPage: window.location.pathname,
  };
  
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


  // Fetch data from TMDB API
  async function fetchAPIdata(endpoint) {
    const API_KEY = "96f25120aeebb83ff745e00ce49a1c61";
    const API_URL = "https://api.themoviedb.org/3/";
  
    showSpinner();
    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
   
    hideSpinner();

    return data;
  }
  
  // display Movies details

  async function displayMoviesDetails() {

  const movieId = window.location.search.split("=")[1];
  const cardShowDetail = document.querySelector("#movie-details");
  const movie = await fetchAPIdata(`movie/${movieId}`);
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
        ${movie.genres.map((genre)=> `<li> ${genre.name}<li>`).join("")}
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

 function addcommaToNumber(number){
   
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
 }


   function showSpinner(){
     const spinner = document.querySelector(".spinner");
     spinner.classList.add("show");
   }

   function hideSpinner(){
    const spinner = document.querySelector(".spinner");
    spinner.classList.remove("show");
  }



  // Highlight active link
  function highlightActiveLink() {
    const links = document.querySelectorAll(".nav-link");
    links.forEach((link) => {
      if (link.getAttribute("href") === global.currentPage) {
        link.classList.add("active");
      }
    });
  }
  
  // To check which page is actually opened
  function init() {
    switch (global.currentPage) {
      case "/":
        displayPopularMovies();
        break;
  
      case "/shows.html":
        displayPopularShows();
        break;
  
      case "/movie-details.html":
        displayMoviesDetails();
        break;
  
      case "/tv-details.html":
        console.log("TV Details");
        break;
  
      case "/search.html":
        console.log("Search");
        break;
    }
  
    highlightActiveLink();
  }
  
  document.addEventListener("DOMContentLoaded", init);
  