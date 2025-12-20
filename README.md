# MovieFinder
This is a class project to create a website that provides a clean interface for looking up where to watch a piece of media. Simply search a show and it will tell you where. Relies on Watchmode API

Target Browsers are anything desktop, it will work on mobile but not be ideal. You can fork with my permission and edit CSS for a mobile version.

> Developer Manual:
To run this project, you can take a look at the prerequisites on `index.js`. They are:
 - Node.js
 - ExpressJS
 - GridJS
 - watchmode/api-client
 - nodemon
 - body-parser
 - supabase
 - dotenv
You can find and install all dependencies through npm.
To run the app locally, simply cd into the cloned repo and run `npm start`

The app does GET requests to the Watchmode API(you will need to obtain a free key from <https://api.watchmode.com/docs>) when using the searchbar, and POST's to the API hosted by Supabase when users click the "I Watched!" button on specific media pages. 

Two libraries are used, simpleslider and videojs on the homepage. 
When users search using the app, a call is made to the watchmode api to do an autocomplete-search on the plaintext that they entered into the searchbar. The title_id field in the first item in the json response from watchmode is then called recursively to watchmode to get further details about the title. 

The details -
> title name
> a link to the title cover image
> the internal watchmode title id
are saved to the supabase database called 'respageelem' for response page elements via the /respageelem API mount point.

On the response page, the title name and cover art are called and dynamically made into html elements which are placed on the page. Additionally, the title id is called in a watchmode api fetch to list all possible services the user can consume the title from. This information is put into a table and the most common streaming services have logos assigned to them. 

Additionally on the response page is a button that allows users to signify that they watched a title. If they click that button, the title name and cover art link are stored in a separate table in supabase. When they go back to the homepage, they'll find that supabase was queried for the last 10 "watched" titles, and they are displayed on a simple image carousel.

The app can be tested at <https://movie-finder-taupe.vercel.app>