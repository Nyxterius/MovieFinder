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
    })
}