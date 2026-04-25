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

export const paginationFormat = `
        <div class="pagination">
            <span id="left-nav"> &lt; </span>
            <div class="pages"> </div>
            <span id="right-nav"> &gt; </span>
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
        route(`blog/${data.articleID}`);
    })
    // const container = document.querySelector('.content-container');
    // container.append(documentArea);

    return documentArea;

}

function createCommands(element) {
    element.querySelector('#left-nav').addEventListener('click', () => {
        
    })
}

export function getPagination(data) {
    const paginationRender = document.createRange().createContextualFragment(paginationFormat);



    const pagelength = Object.keys(data.articles).length;
    const pages = paginationRender.querySelector('.pages') 
    for (var i = 1; i <= pagelength; i++) {
        const pageItem = document.createElement('span');
        pageItem.setAttribute('id', `page-${i}`);
        pageItem.innerHTML = i;
        pages.append(pageItem)
    }

    return paginationRender;
}

export function listArticles(data) {
    const listingCatalog = document.createElement('div');
    listingCatalog.classList.add('group-catalog');

    for (var [page, article] of Object.entries(data.articles)) {
        const pageView = document.createElement('div');
        pageView.classList.add('list-catalog', 'hidden', `page-${page}`);
        article.forEach(element => {
            const item = applyArticle(element);
            pageView.append(item);
        });
        listingCatalog.append(pageView);

    }

    const pagination = getPagination(data);
    const container = document.querySelector('.content-container');
    container.append(listingCatalog, pagination);

}
