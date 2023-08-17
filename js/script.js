const global = {

    currentPage: window.location.pathname,

};

//Highlight active link
 function HighlightactiveLink(){
     const links = document.querySelectorAll(".nav-link");
     links.forEach((link)=>{
        if(link.getAttribute("href") === global.currentPage){
            link.classList.add("active");
        }
     })

 }

 

// to check with page is actually opened
function init(){
  
     switch( global.currentPage){

        case "/":
            console.log("Home");
            break;

        case "/shows.html":
             console.log("Shows");
                break;      
                
        case "/movie-details.html":
             console.log("Movie Details");
              break; 

        case "/tv-details.html":
                console.log("TV Details");
                 break; 
        
         case "/search.html":
            console.log("Search");
              break; 
     }

     HighlightactiveLink();
}

document.addEventListener("DOMContentLoaded", init);