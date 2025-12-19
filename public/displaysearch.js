async function getSearch() {
    await fetch('/getlast')
    .then((results) => results.json())
    .then((results) => {
        console.log(results)
        let titleName = results[0]['title_name']
        let coverArt = results[0]['cover_art']
        var docTitle = document.createElement('h1');
        docTitle.innerText = titleName;
        var docPicture = document.createElement('img');
        docPicture.src = coverArt;
        docPicture.alt = titleName;
        docPicture.id = "coverart"
        docTitle.id = "medianame"
        document.body.append(docTitle);
        document.body.append(docPicture);
        listSources(results);
    })
}

async function listSources(results) {
    await fetch('/getsources', {
        method: 'POST',
        body: JSON.stringify({
            titleID : results[0]['title_id']
        }),
        headers: {
        'content-type': 'application/json',
        }
    })
    .then((results2) => results2.json())
    .then((results2) => {
        console.log(results2)
        let sourcetable = document.createElement('table');
        sourcetable.id = "sourcetable";
        let headers = document.createElement('tr');
        let headerlogo = document.createElement('th');
        headerlogo.innerText = "Logo";
        let headername = document.createElement('th');
        headername.innerText = "Service Name";
        document.body.appendChild(sourcetable);
        headers.appendChild(headerlogo);
        headers.appendChild(headername);
        sourcetable.appendChild(headers);


        for (source in results2) {
            var sourcerow = document.createElement('tr')
            var sourcelogo = document.createElement('img');
            var sourceName = results2[source]['name']
            console.log(sourceName);
            if (sourceName == 'Netflix') {
                sourcelogo.src = "netflix.png"
            } else if (sourceName == 'Hulu') {
                sourcelogo.src = "hulu.png"
            } else if (sourceName == 'Disney+') {
                sourcelogo.src = "disney.png"
            } else if (sourceName == 'Amazon') {
                sourcelogo.src = "amazon.png"
            } else if (sourceName == 'AppleTV') {
                sourcelogo.src = "apple.png"
            } else {
                sourcelogo.src = "unknown.png"
            }
            sourcelogo.alt = sourceName;
            sourcelogo.style.height = "80px";
            sourcelogo.style.width = "80px"
            sourcelogo.style.display = "inline"
            // sourceTable = document.getElementById('sourcetable');
            sourcerow.append(sourcelogo);
            sourcerow.append(sourceName);
            sourcetable.appendChild(sourcerow)
        }
    })
}

async function addWatched() {
    await fetch('/addwatched', {
        method: 'POST',
        body: JSON.stringify({
        medianame : document.getElementById('medianame').innerHTML,
        coverart : document.getElementById('coverart').src,
        }),
        headers: {
        'content-type': 'application/json',
    }})
    console.log(document.getElementById('medianame').innerHTML)
    console.log(document.getElementById('coverart').src)
    console.log("Added media!")
    return;
}

window.onload = getSearch();