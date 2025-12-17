import {env} from 'node:process';
const watchmode = process.env.WATCHMODE_KEY

async function searchContent() {
    var searchValue = document.getElementById('searchbar').value
    await fetch(`https://api.watchmode.com/v1/search/?apiKey=${watchmode}&search_field=name&search_value=${encodeURIComponent(searchValue)}`)
    .then((results) => results.json())
    .then((results) => {
        console.log(results)
    })
}