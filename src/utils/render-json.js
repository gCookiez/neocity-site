import { listArticles } from '@template/blog-item'
import { applyBlogFormat } from '@template/view-blog'
import { populateGallery } from '@template/gallery'
import { route } from '@utils/router'

export function fetchGallery(data) {
    return false;
}

export function container() {
    return document.querySelector('.content-container'); 
}


export function resetPage() {
    document.querySelector('.content-container').replaceChildren();
}

export function notFound() {
    resetPage();
}


export function fetchJson(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            resetPage();
            if (data.method == "view") {
                listArticles(data);
                return;
            }
            if (data.method == "blogRender") {
                applyBlogFormat(data);
                return;
            }
            if (data.method == "gallery") {
                populateGallery(data);
                return;
            }
        })
        .catch(error => {
            console.error("Error: ", error)
            route('/404');
        });
}