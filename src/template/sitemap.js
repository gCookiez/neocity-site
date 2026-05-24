import { menuItems, route } from "@utils/router";
import { container } from '@utils/render-json'

const linkLayout = `
    <div class="link-item">
        <span class="link-name"> </span> 
        <span> &nbsp;-&nbsp; </span>
        <span class="link-desc"> </span> 
    </div>
`

export function fetchAllLinks() {
    const container = document.createElement('div');
    container.classList.add('link-list')

    for (var [key, item] of Object.entries(menuItems)) {
        if (undefined === item.hiddenFinal && true == item.hiddenFinal) return;
        const layout = document.createRange().createContextualFragment(linkLayout);
        layout.querySelector('.link-name').innerHTML = item.name;
        const link = item.url;
        layout.querySelector('.link-name').addEventListener('click', () => {
            route(link);
        });

        layout.querySelector('.link-desc').innerHTML = item.desc;
        container.append(layout);
    }

    return container;
}

export function createSiteMap() {
    const cont = container();
    const siteMap = document.createElement('div');
    const siteMapCont = document.createElement('div');
    siteMap.classList.add('site-map');
    siteMapCont.classList.add('site-map-cont');

    siteMapCont.append(fetchAllLinks());
    siteMap.append(siteMapCont);
    cont.append(siteMap);
    return;
}
