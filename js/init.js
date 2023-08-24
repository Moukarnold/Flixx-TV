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
  