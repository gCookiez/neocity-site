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