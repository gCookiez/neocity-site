import { pagination } from "@utils/pagination";
import { intToDateFormat } from "@utils/date";
export const articleTemplate = `
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
    documentArea.querySelector('.date-posted').innerHTML = `<span> Posted on: ${intToDateFormat(data.date)} </span>`
    documentArea.querySelector('.article-content').innerHTML = `<p> ${data.content} </p>`
    documentArea.querySelector('.expand-article span').addEventListener("click", () => {
        route(`blog/${data.articleID}`);
    })
    // const container = document.querySelector('.content-container');
    // container.append(documentArea);

    return documentArea;

}

export function listArticles(data) {
    const catalog = new pagination(data);
    return;
}
