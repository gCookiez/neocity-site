export function applyArticle(data) {
    const documentArea = document.createElement('div');
    documentArea.classList.add('article-area');
    documentArea.innerHTML = `
        <h2> ${data.title} </h2>
        <br>
        <span> Posted on: ${data.date} </span>
        <br>
        <br>
        <p> ${data.content} </p>
    `

    return documentArea

}

export function fetchJson(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const format = applyArticle(data);
            const container = document.querySelector('.content-container');
            container.append(format);
        })
        .catch(error => console.error("Error: ", error));


}