# Flixx-TV


This project is a web application that allows users to search for and display information about movies and TV shows using the TMDB API.
 The application features several functionalities such as displaying popular movies, popular TV shows, movie and show details, search, and more.

## Project Structure

The project is organized into multiple JavaScript files to enhance code readability and modularity.
 Here's a brief description of each JavaScript file:

- `global.js`: Defines a global object containing shared variables, including TMDB API information and search details.

- `fetchData.js`: Contains functions to make API calls to TMDB, including calls to get popular movies, popular shows, and details.

- `popular.js`: Contains functions to display popular movies and TV shows on the homepage.

- `details.js`: Contains functions to display movie and show details on their respective pages.

- `search.js`: Handles the search functionality for movies and shows based on search terms and types.

- `swiper.js`: Integrates the Swiper library to display a carousel of currently playing movies.

- `init.js`: Initializes the code based on the currently opened page and handles initial loading.

## Configuration

1. Clone this repository to your local machine.
2. Make sure you have a valid API key for the TMDB API. Get an API key from https://www.themoviedb.org/settings/api.
3. Replace the value of `global.api.APIKEY` in `global.js` with your TMDB API key.

## Usage

1. Open the `index.html` file in your browser to access the homepage.
2. Use the search bar to search for movies or shows.
3. Click on movie/show images or titles to view their corresponding details.
4. Explore different features of the application, including popular movies and TV shows.
5. visit on : https://flixx-tv.vercel.app/

## Credits

- This application uses the TMDB API to fetch movie and show data. For more information, refer to https://www.themoviedb.org/documentation/api.



