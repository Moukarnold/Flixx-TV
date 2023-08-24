const global = {
    currentPage: window.location.pathname,
    search : {
           term:"",
           type:"",
           page:1, 
           totalPages:1,
               },
     api:{
         APIKEY : "96f25120aeebb83ff745e00ce49a1c61",
         APIURL : "https://api.themoviedb.org/3/"
     }          
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
    const API_KEY = global.api.APIKEY;
    const API_URL = global.api.APIURL;
  
    showSpinner();
    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
   
    hideSpinner();

    return data;
  }
  
  function displayBackgroundImage(type, backgroundPath) {
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.3';
  
    if (type === 'movie') {
      document.querySelector('#movie-details').appendChild(overlayDiv);
    } else {
      document.querySelector('#show-details').appendChild(overlayDiv);
    }
  }


   // display  shows details

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

  // seach movies/show

   async function search(){
      const queryString = window.location.search;
      const urlParams =  new URLSearchParams(queryString);

      global.search.type = urlParams.get("type");
    global.search.term= urlParams.get("search-term");

     if(global.search.term !== "" && global.search.term !== null ){
         const {results, total_pages, page} = await searchAPIData();
              
         if(results.length === 0){
            showAlert("No results found");
            return;
         }
         displaysSearchResults(results);
         document.querySelector("#search-term").value= "";
     } else{
        showAlert("enter a search term","error")
     }
  }

    function displaysSearchResults(results){
const searchResultsContainer = document.querySelector("#search-results");
  searchResultsContainer.innerHTML = ""

        results.forEach((result) => {
            const div = document.createElement("div");
            div.classList.add("card");
            div.innerHTML = `
              <a href="${global.search.type}-details.html?id=${result.id}">
                ${result.poster_path
                  ? `<img src="https://image.tmdb.org/t/p/w500/${result.poster_path}" class="card-img-top" alt="${global.search.type === `movie` ? result.title : result.name}" />`
                  : `<img src="images/no-image.jpg" class="card-img-top" alt="${global.search.type === `movie` ? result.title : result.name}" />`}
              </a>
              <div class="card-body">
                <h5 class="card-title">${global.search.type === `movie` ? result.title : result.name}</h5>
                <p class="card-text">
                  <small class="text-muted">Release: ${global.search.type === `movie` ? result.release_date : result.first_air_date}</small>
                </p>
              </div>
            `;
        
            searchResultsContainer.appendChild(div);
        });

    }

  // show alert
    function showAlert(message, className="error"){
    
        const alertEl= document.createElement("div");
        alertEl.classList.add("alert", className);
        alertEl.appendChild(document.createTextNode(message));
        document.querySelector("#alert").appendChild(alertEl);

        setTimeout(()=>alertEl.remove(),3000);
    }

    // mmake a request to search

    async function searchAPIData() {
        const API_KEY = global.api.APIKEY;
        const API_URL = global.api.APIURL;
      
        showSpinner();
        const response = await fetch(`${API_URL}search/${global.search.type }?api_key=${API_KEY}&language=en-US&query=${global.search.term}`);
        const data = await response.json();
       
        hideSpinner();
    
        return data;
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
  
//display slider Movies

 async function displaySlider(){

    const {results } = await fetchAPIdata( "movie/now_playing");

    results.forEach((movie)=>{ 
        const div= document.createElement("div");
     div.classList.add("swiper-slide");
     
     div.innerHTML = `
     <a href="movie-details.html?id=${movie.id}">
     <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
   </a>
   <h4 class="swiper-rating">
     <i class="fas fa-star text-secondary"></i> ${movie.vote_average}/ 10
    </h4>
     `
     document.querySelector(".swiper-wrapper").appendChild(div);
    });

  initSwiper();

}


function initSwiper(){
    const swiper = new Swiper('.swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      freeMode: true,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      breakpoints: {
        500: {
          slidesPerView: 2,
        },
        700: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
      },
    });
  }

  // To check which page is actually opened
  function init() {
    switch (global.currentPage) {
      case "/":
        displaySlider();

        displayPopularMovies();
        break;
  
      case "/shows.html":
        displayPopularShows();
        break;
  
      case "/movie-details.html":
        displayMoviesDetails();
        break;
  
      case "/tv-details.html":
        displayShowDetails();
        break;
  
      case "/search.html":
        search();
        break;
    }
  
    highlightActiveLink();
  }
  
  document.addEventListener("DOMContentLoaded", init);
  