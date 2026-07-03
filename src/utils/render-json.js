import { listArticles } from '@template/blog-item'
import { applyBlogFormat } from '@template/view-blog'
import { populateGallery } from '@template/gallery'
import { route } from '@utils/router'
import { aboutMe } from '@template/about';
import { categoryRenderer } from '@utils/category';

export function fetchGallery(data) {
    return false;
}

export function container() {
    return document.querySelector('.content-container');
}

export function loadingBurger() {
    return document.querySelector('#loading-anim');
}

export function spawnLoading() {
    container().replaceChildren();
    container().append(window.loadingAnim());
}


export function resetPage() {
    if (null === container()) return;
    container().replaceChildren();
    if (null !== loadingBurger()) {
        loadingBurger().remove();
    }
}

export function linkBrowser(data) {
    resetPage();
    if (data.method === "bloglistview") {
        listArticles(data);
        return;
    }
    if (data.method === "blogRender") {
        applyBlogFormat(data);
        return;
    }
    if (data.method === "gallery") {
        populateGallery(data);
        return;
    }
    if (data.method === "about") {
        aboutMe(data);
        return;
    }
    if (data.method === "blogcategories") {
        categoryRenderer(data.list);
        return;
    }
    if (undefined === data.method) {
        console.log(data);
        return
    }
}

export function fetchJson(url, options) {
    let fetchSettings = {};
    if ('string' !== typeof url) {
        fetchSettings = url.settings;
        url = url.link;
    }
    

    if (undefined === options) {
        resetPage();
        spawnLoading();
    }

    setTimeout(() => {
        fetch(url, fetchSettings)
            .then(response => {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    return response.json()
                }
                else if (contentType && contentType.includes("html")){
                    window.location.href = url;
                    return false;
                }
                else {
                    throw new Error();
                }
            })
            .then(data => {
                if (!data) return;
                if (undefined !== options && undefined !== options.module && true === options.module) {
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
    }, 100)

}