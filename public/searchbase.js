async function searchContent() {
    await fetch('/searchcontent', {
        method: 'POST',
        body: JSON.stringify({
            searchTitle : document.getElementById('searchbar').value
        }),
        headers: {
        'content-type': 'application/json',
        }
    })
    .then((results) => results.json())
    .then((results) => {
        console.log(results)
        let searchResult = results;
        loadResPage(searchResult);
    })
}

async function loadResPage(results) {
    await fetch('/loadrespage', {
        method: 'POST',
        body: JSON.stringify({
            titleID : results['title_results'][0]['id']
        }),
        headers: {
            'content-type': 'application/json',
        }
    })
    .then((results2) => results2.json())
    .then((results2) => {
        sendElements(results, results2)
        })
}

async function sendElements(results, results2) {
    await fetch('/respageelem', {
        method: 'POST',
        body: JSON.stringify({
            titleID : results['title_results'][0]['id'],
            titleName : results['title_results'][0]['name'],
            coverArt : results2['poster']
        }),
        headers: {
            'content-type': 'application/json',
        }
    })
    window.location.href = "respage.html"
    return;
}

async function loadRecentTitles() {
    await fetch('/getwatched')
    .then((results) => results.json())
    .then((results) => {
        console.log("Creating carousel")
        console.log(results)
        for (link in results) {
            var grimage = document.createElement('img')
            var imglink = results[link]['cover_art'];
            grimage.src = imglink;
            grimage.alt = results[link]['title_name'];
            grimage.style.height = "40%"
            grimage.style.width = "14%"
            document.getElementById('covercarousel').appendChild(grimage)
        }
    })
    simpleslider.getSlider();
}

window.onload = loadRecentTitles; 