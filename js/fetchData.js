async function fetchAPIdata(endpoint) {
    const API_KEY = global.api.APIKEY;
    const API_URL = global.api.APIURL;
  
    showSpinner();
    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
  
    hideSpinner();
  
    return data;
  }
  
  function showSpinner() {
    const spinner = document.querySelector(".spinner");
    spinner.classList.add("show");
  }
  
  function hideSpinner() {
    const spinner = document.querySelector(".spinner");
    spinner.classList.remove("show");
  }
  
  function addCommaToNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
  
  