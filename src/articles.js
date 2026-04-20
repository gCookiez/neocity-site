import { applyArticle } from '/utils/render-json'
fetch('/articles/04192026.json')
    .then(response => response.json())
    .then(data => {
        const format = applyArticle(data);
        const container = document.querySelector('.content-container');
        container.append(format);
    })
    .catch(error => console.error("Error: ", error));