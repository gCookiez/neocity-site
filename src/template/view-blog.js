import { intToDateFormat } from "@utils/date";
import { container } from '@utils/render-json';
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
    blogElement.querySelector('.blog-title').innerHTML = `<h1> ${data.title} </h1>`
    blogElement.querySelector('.blog-date').innerHTML = `<span> Date: ${intToDateFormat(data.date)} </span>`
    blogElement.querySelector('.blog-author').innerHTML = `<span> Published by: <b>${data.author}</b> </span>`
    blogElement.querySelector('.blog-text').innerHTML = `${data.content}`

    const cont = container();
    cont.append(blogElement);
    
    return;
}

