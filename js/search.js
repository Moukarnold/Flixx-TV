// seach movies/show

async function search(){
    const queryString = window.location.search;
    const urlParams =  new URLSearchParams(queryString);

    global.search.type = urlParams.get("type");
  global.search.term= urlParams.get("search-term");

   if(global.search.term !== "" && global.search.term !== null ){
       const {results, total_pages, page , total_results} = await searchAPIData();
            
       global.search.page = page;
       global.search.totalPages = total_pages;
       global.search.totalResults= total_results;


       if(results.length === 0){
          showAlert("No results found");
          return;
       }
       displaySearchResults(results);
       document.querySelector("#search-term").value= "";
   } else{
      showAlert("enter a search term","error")
   }
}

function displaySearchResults(results){

    // clear previous results
     document.querySelector("#search-results").innerHTML= "";
     document.querySelector("#search-results-heading").innerHTML= "";
     document.querySelector("#pagination").innerHTML= "";


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


    // display the numbers of shows or movie when a titel is write
         document.querySelector("#search-results-heading").innerHTML= ` 
          <h2> ${results.length} of ${global.search.totalResults} Results for ${global.search.term}<h2>`;
       
          searchResultsContainer.appendChild(div);
    });

    displayPagination();

}

 // create and display Pagination for search 
 function displayPagination(){

    const div = document.createElement("div");
    div.classList.add("pagination");
    div.innerHTML= `
              <button class="btn btn-primary" id="prev">Prev</button>
    <button class="btn btn-primary" id="next">Next</button>
    <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>

    `;
    document.querySelector("#pagination").appendChild(div);

    // disable prev button if on first page

    if(global.search.page ===1){
      document.querySelector("#prev").disabled= true;
    }


     // disable next button if on last page

     if(global.search.page ===global.search.totalPages){
      document.querySelector("#next").disabled= true;
    }

    // next page

    document.querySelector("#next").addEventListener("click", async ()=>{
       global.search.page++;
       const { results, total_pages }= await searchAPIData();
       displaySearchResults(results);

    } );


    // prev page

    document.querySelector("#prev").addEventListener("click", async ()=>{
      global.search.page--;
      const { results, total_pages }= await searchAPIData();
      displaySearchResults(results);

   } );

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
    const response = await fetch(`${API_URL}search/${global.search.type }?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page} `);
    const data = await response.json();
   
    hideSpinner();

    return data;
  }
