import { applyArticle } from '../utils/render-json.js'
fetch('/articles/gallery.json')
    .then(response => response.json())
    .then(data => {
        const format = applyArticle(data);
        const container = document.querySelector('.content-container');
        container.append(format);
    })
    .catch(error => console.error("Error: ", error));