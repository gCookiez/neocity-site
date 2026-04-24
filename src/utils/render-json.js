import { listArticles } from '@template/blog-item'

export function fetchGallery(data) {
    return false;
}

export function resetPage() {
    document.querySelector('.content-container').replaceChildren();
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
            // if (data.method == "blogContents") {
            //     return;
            // }
        })
        .catch(error => console.error("Error: ", error));


}