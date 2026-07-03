import { pagination } from "@utils/pagination";
import { intToDateFormat } from "@utils/date";
import { fetchJson } from "../utils/render-json";
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

export const categoryTemplate = `
    <div class="blog-category-item">
        <div class="blog-category-title">

        </div>
        <div class="blog-category-desc">
        </div>
    </div>
`

const elementArticleTemplate = document.createElement('template');
elementArticleTemplate.innerHTML = articleTemplate;


export function applyArticle(data) {
    const documentArea = elementArticleTemplate.content.firstElementChild.cloneNode(true);
    documentArea.querySelector('.article-title').innerHTML = `<h2> ${data.title} </h2>`
    documentArea.querySelector('.date-posted').innerHTML = `<span> Posted on: ${intToDateFormat(data.created_at)} </span>`
    documentArea.querySelector('.article-content').innerHTML = `<p> ${data.content} </p>`
    documentArea.querySelector('.expand-article span').addEventListener("click", () => {
        route(`/blog/${data.category}/${data.uuid}`);
        document.querySelector('.site-title').scrollIntoView();
    })

    documentArea.querySelector('.article-title').addEventListener("click", () => {
        route(`/blog/${data.category}/${data.uuid}`);
        document.querySelector('.site-title').scrollIntoView();
    })
    // const container = document.querySelector('.content-container');
    // container.append(documentArea);

    return documentArea;

}

export function sortedByCategory(data) {
    const temp = document.createRange().createContextualFragment(categoryTemplate);
    temp.querySelector('.blog-category-title').innerHTML = `<h2> ${undefined !== data.title ? data.title : data.blog_category} </h2>`
    temp.querySelector('.blog-category-desc').innerHTML = `<span> ${data.desc} </span>`

    temp.querySelector('.blog-category-title').addEventListener('click', () => {
        if (undefined !== data.alt && data.alt) {
            // fetchJson(`${data.path}`);

            window.location.href = data.path;
            return;
        }
        route(`/blog/${undefined !== data.category ? data.category : data.key_check}`);
    })
    return temp;
}

export function listArticles(data) {
    const catalog = new pagination(data);
    return;
}
