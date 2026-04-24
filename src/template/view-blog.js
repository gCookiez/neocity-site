
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
    
    return;
}

