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
const watchmode = process.env.WATCHMODE_KEY;

app.get('/', (req, res) => {
  res.sendFile('public/homepage.html', { root: __dirname });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});