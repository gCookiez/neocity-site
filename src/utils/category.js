import { sortedByCategory } from "@template/blog-item";
import { container } from '@utils/render-json'

export function segregateByTag(data) {
    const element = document.createElement('div');
    const container = document.createElement('div');
    element.classList.add('blog-category', 'main-content-wrapper');
    container.classList.add('main-content-container');

    for (var [key, value] of Object.entries(data)) {
        const temp = sortedByCategory(value);
        container.append(temp)
    }

    element.append(container);

    return element;
}


const testJSON = {
    blog: {
        title: 'Main Blog',
        desc: 'General Blog Entries'
    },
    updates: {
        title: 'Site Updates',
        desc: 'Detailing Site Updates'
    }
}


export function categoryRenderer() {
    const cont = container();
    const render = segregateByTag(testJSON);
    cont.append(render)
}