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