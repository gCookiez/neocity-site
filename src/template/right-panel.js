import { container } from '@utils/render-json'

const template = `
    <div class="icon-item">
        <a href="" target="_blank">
            <img src="" alt="">
        </a>
    </div>
`

export function linkMe() {

    const container = document.createElement('div');
    const ref = document.createElement('div');
    const pickup = document.createElement('textarea');
    const title = document.createElement('div');
    const iconDom = document.createRange().createContextualFragment(template);
    const format = `
            <a href="https://crispypata.neocities.org/" target="_blank"><img src="{Download The Image and Set your link}" alt="Hungry Dev Site"></a>
    `
    title.innerHTML = `
        <h4> Add me to your site! </h4>
    `

    ref.classList.add('reference-group')
    container.classList.add('reference-me');
    pickup.classList.add('reference-text-area');
    title.classList.add('icon-title');
    iconDom.querySelector('a').setAttribute('href', 'https://crispypata.neocities.org/icons/icon.gif');
    iconDom.querySelector('img').setAttribute('src', '/icons/icon.gif');
    iconDom.querySelector('img').setAttribute('alt', 'Hungry Dev Site');

    pickup.value = format.trim();

    container.append(iconDom, pickup);

    ref.append(title, container)

    return ref;

}

export function iconList() {
    const iconRender = document.createElement('div');

    iconRender.classList.add('icon-list')


    for (var item of window.outerLinks.links) {
        const format = document.createRange().createContextualFragment(template);
        format.querySelector('a').setAttribute('href', item.link);
        format.querySelector('img').setAttribute('src', item.path);
        format.querySelector('img').setAttribute('alt', item.name);
        iconRender.append(format);
    }

    return iconRender
}

export function applySideBar() {
    const sidePanelWrap = document.createElement('div');
    const iconCollection = document.createElement('div');
    const sidePanel = document.createElement('div');
    const iconTitle = document.createElement('div');
    const burgerPlaceholder = window.loadingAnim();
    burgerPlaceholder.setAttribute('id', 'loading-anim-stable');
    iconTitle.innerHTML = `
        <h4> Links Collected </h4>
    `
    iconTitle.classList.add('icon-title')
    sidePanelWrap.classList.add('grid-container', 'side-panel-wrap');
    sidePanel.classList.add('side-panel')

    iconCollection.classList.add('icon-collection')
    iconCollection.append(iconTitle, iconList())

    sidePanel.append(iconCollection, linkMe(), burgerPlaceholder)


    sidePanelWrap.append(sidePanel);
    return sidePanelWrap
}