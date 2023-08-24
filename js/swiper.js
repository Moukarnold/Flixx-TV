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
