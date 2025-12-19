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

app.get('/', async (req, res) => {
  res.sendFile('/public/homepage.html', { root: __dirname });
});

app.post('/searchcontent', async (req, res) => {
  const searchTitle = req.body.searchTitle;
  const output = await fetch(`https://api.watchmode.com/v1/search/?apiKey=${watchmode}&search_field=name&search_value=${encodeURIComponent(searchTitle)}`)
  .then((results) => results.json())
  .then((results) => {
    res.send(results)
    return;
  })
})

app.post('/loadrespage', async (req, res) => {
  const titleID = req.body.titleID;
  const output = await fetch(`https://api.watchmode.com/v1/title/${titleID}/details/?apiKey=${watchmode}`)
  .then((results) => results.json())
  .then((results) => {
    res.send(results)
    return;
  })
})

app.post('/respageelem', async (req, res) => {
  const titleID = req.body.titleID;
  const titleName = req.body.titleName;
  const coverArt = req.body.coverArt;

  const { data, error } = await supabase
    .from('respageelem')
    .insert({
      title_id: titleID,
      title_name: titleName,
      cover_art: coverArt,
    })
    .select()
  res.send(req.body);
})

app.get('/getlast', async (req, res) => {
  const { data, error } = await supabase.from('respageelem')
  .select('title_id, title_name, cover_art')
  .limit(1)
  .order('id', {ascending:false})
  res.send(data)
  return;
})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});