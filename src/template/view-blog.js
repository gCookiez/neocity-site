
// container.append(documentArea);\
const pageTemplate = document.createElement('template');

const blogTemplate = `
<div class="blog-content">
    <div class="blog-details">
        <div class="blog-title">
    
        </div>
        <div class="blog-publish">
            <span class="blog-date">

            </span>
            <span class="blog-author">

            </span>
        </div>
    </div>

    <div class="blog-text">

        
    </div>

</div>
`
pageTemplate.innerHTML = blogTemplate.trim();

export function applyBlogFormat(data) {
    const blogElement = pageTemplate.content.firstElementChild.cloneNode(true);
    blogElement.querySelector('.blog-title').innerHTML = `<h2> ${data.title} </h2>`
    blogElement.querySelector('.blog-date').innerHTML = `<span> ${data.title} </span>`
    blogElement.querySelector('.blog-author').innerHTML = `<span> ${data.author} </span>`
    blogElement.querySelector('.blog-text').innerHTML = `<span> ${data.content} </span>`

    const container = document.querySelector('.content-container');
    container.append(blogElement);
    
    return;
}

