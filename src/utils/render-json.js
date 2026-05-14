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
    container().replaceChildren();
}

export function linkBrowser(data) {
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
}

export function fetchJson(url, options) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (undefined !== options && undefined !== options.group && true === options.group) {
                options.callback(data);
                return;
            }

            linkBrowser(data)
        })
        .catch(error => {
            console.error("Error: ", error)
            resetPage();
            route('/404');
        });
}