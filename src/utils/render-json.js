const articleTemplate = `
    <div class="article-area">
        <div class="article-details">
            <div class="article-title">
            
            </div>
            <div class="date-posted">

            </div>
        </div>
    <div class="article-content">

    </div>
    <div class="expand-article">
        <span> Read More </span> 
    </div>
</div>
`

const elementArticleTemplate = document.createElement('template');
elementArticleTemplate.innerHTML = articleTemplate;




export function applyArticle(data) {
    const documentArea = elementArticleTemplate.content.firstElementChild.cloneNode(true);
    documentArea.querySelector('.article-title').innerHTML = `<h2> ${data.title} </h2>`
    documentArea.querySelector('.date-posted').innerHTML = `<span> Posted on: ${data.date} </span>`
    documentArea.querySelector('.article-content').innerHTML = `<p> ${data.content} </p>`
    documentArea.querySelector('.expand-article span').addEventListener("click", () => {
        console.log('YES')
    })
    const container = document.querySelector('.content-container');
    container.append(documentArea);

    return;

}

export function listArticles(data) {
    for (var article of data.articles) {
        applyArticle(article);
    }
}

export function fetchGallery(data) {
    return false;
}

export function fetchJson(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.method == "article") {
                listArticles(data);
                return;
            }
            if (data.method == "blogContents") {
                return;
            }
        })
        .catch(error => console.error("Error: ", error));


}