import { container } from '@utils/render-json'


const iconsList = [
    {
        name: "Hungry Dev Site",
        path: "icons/icon.gif",
        link: "https://crispypata.neocities.org/"
    },
    {
        name: "petrapixel",
        path: "https://cdn.jsdelivr.net/gh/petracoding/petrapixel.neocities.org@latest/public/assets/img/linkback.gif",
        link: "https://petrapixel.neocities.org/"
    },
    {
        name: "Mabsland - Adopt a censor",
        path: "https://www.mabsland.com/Pandas/Censor_NYRc.gif",
        link: "http://www.mabsland.com"
    },
    {
        name: "Valid CSS!",
        path: "https://jigsaw.w3.org/css-validator/images/vcss",
        link: "https://jigsaw.w3.org/css-validator/check/referer"
    }

]

const template = `
    <div class="icon-item">
        <a href="" target="_blank">
            <img src="" alt="">
        </a>
    </div>
`

export function iconList() {
    const iconRender = document.createElement('div');
    
    iconRender.classList.add('icon-list')


    for (var item of iconsList) {
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
    const sidePanel = document.createElement('div');
    const iconTitle = document.createElement('div');
    iconTitle.innerHTML = `
        <h4> Links Collected </h4>
    `
    iconTitle.classList.add('icon-title')
    sidePanelWrap.classList.add('grid-container', 'side-panel-wrap');
    sidePanel.classList.add('side-panel')

    sidePanel.append(iconTitle, iconList())


    sidePanelWrap.append(sidePanel);
    return sidePanelWrap
}