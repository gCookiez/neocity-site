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
    },
    {
        name: "auberylis.moe",
        path: "https://auberylis.moe/indexfiles/sitebuttons/auberylismoe.png",
        link: "https://auberylis.moe/"
    },
    {
        name: "Snew",
        path: "https://snewdraws.net/snewbutton.gif",
        link: "https://snewdraws.net"
    },
    {
        name: "Knoxie's World",
        path: "icons/knoxstation.gif",
        link: "https://knoxstation.neocities.org/"
    },
    {
        name: "Absolute Realm",
        path: "icons/absolute-realm.gif",
        link: "https://theabsoluterealm.com/"
    },
    {
        name: "lazer-bunny",
        path: "https://lazer-bunny.neocities.org/Art_Storage/Site_Buttons/Button_88x31.gif",
        link: "https://lazer-bunny.neocities.org/"
    },
    {
        name: "ranfren",
        path: "https://ranfren.neocities.org/banner.gif",
        link: "https://ranfren.neocities.org/"
    },
    {
        name: "Kamen Cafe",
        path: "icons/KAMEN-CAFE-button.gif",
        link: "https://dedroll.neocities.org/"
    },
    {
        name: "Cinni's Dream Home",
        path: "icons/cinni.button_keyklubhouse1.png",
        link: "https://cinni.net/"
    }


]

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
    iconDom.querySelector('img').setAttribute('src', 'icons/icon.gif');
    iconDom.querySelector('img').setAttribute('alt', 'Hungry Dev Site');

    pickup.value = format.trim();

    container.append(iconDom, pickup);

    ref.append(title, container)

    return ref;

}

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
    const iconCollection = document.createElement('div');
    const sidePanel = document.createElement('div');
    const iconTitle = document.createElement('div');
    iconTitle.innerHTML = `
        <h4> Links Collected </h4>
    `
    iconTitle.classList.add('icon-title')
    sidePanelWrap.classList.add('grid-container', 'side-panel-wrap');
    sidePanel.classList.add('side-panel')

    iconCollection.classList.add('icon-collection')
    iconCollection.append(iconTitle, iconList())

    sidePanel.append(iconCollection, linkMe())


    sidePanelWrap.append(sidePanel);
    return sidePanelWrap
}