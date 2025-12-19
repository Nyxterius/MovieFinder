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
        docPicture.alt = titleName
        document.body.append(docTitle);
        document.body.append(docPicture);        
    })
}

window.onload = getSearch();