const express = require('express');
const grid = require('gridjs');
const bodyParser = require('body-parser');
const supabaseClient = require('@supabase/supabase-js');
const dotenv = require('dotenv');


const app = express();

const port = 3000;
dotenv.config();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'))


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);
let watchmode = process.env.WATCHMODE_KEY;

app.get('/public', async (req, res) => {
  res.sendFile('/homepage.html', { root: __dirname });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// async function searchContent() {
//     var searchValue = document.getElementById('searchbar').value
//     await fetch(`https://api.watchmode.com/v1/search/?apiKey=${watchmode}&search_field=name&search_value=${encodeURIComponent(searchValue)}`)
//     .then((results) => results.json())
//     .then((results) => {
//         console.log(results)
//     })
// }