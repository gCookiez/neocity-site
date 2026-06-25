import { container } from '@utils/render-json'
import { webRingContainer } from './revo-main';

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
    const iconMarquee = document.createElement('marquee');

    iconMarquee.setAttribute('scrollamount', 10)
    iconMarquee.setAttribute('scrolldelay', 20)
    iconMarquee.setAttribute('behavior', 'scroll')

    iconMarquee.addEventListener('mouseenter', (event) => {
        event.target.stop();
    })
    iconMarquee.addEventListener('mouseleave', (event) => {
        event.target.start();
    })

    iconRender.classList.add('icon-list')


    for (var item of window.outerLinks.links) {
        const format = document.createRange().createContextualFragment(template);
        format.querySelector('a').setAttribute('href', item.link);
        format.querySelector('img').setAttribute('src', item.path);
        format.querySelector('img').setAttribute('alt', item.name);
        iconRender.append(format);
    }
    iconMarquee.append(iconRender)
    return iconMarquee
}

export function switchAnimations(bool) {
    let settings = localStorage.eyesHurt;
    const body = document.querySelector('body');
    const struct = document.querySelector('.under-construction');
    const chat = document.querySelector('.chat-soon');

    function trigger() {
        body.classList.add('myeyeshurt');
        struct ? struct.classList.add('myeyeshurt') : null;
        chat ? chat.classList.add('myeyeshurt') : null;
    }

    function untrigger() {
        body.classList.remove('myeyeshurt');
        struct ? struct.classList.remove('myeyeshurt') : null;
        chat ? chat.classList.remove('myeyeshurt') : null;
    }

    if (undefined === bool && undefined !== localStorage.eyesHurt && 'true' === localStorage.eyesHurt) {
        trigger();
    }

    if (undefined === settings) {
        localStorage.eyesHurt = 'false';
        settings = localStorage.eyesHurt;
        return;
    }

    localStorage.eyesHurt = bool ? JSON.stringify(!JSON.parse(settings)) : settings;

    JSON.parse(localStorage.eyesHurt) ? (() => trigger())() : (() => untrigger())()
    return;

}

export function eyesHurt() {
    let settings = localStorage.eyesHurt;
    const buttonContain = document.createElement('div');
    const button = document.createElement('div');

    buttonContain.classList.add('button-access-area');
    button.classList.add('standard-button');

    function switchLabel() {
        if (undefined === localStorage.eyesHurt || !JSON.parse(localStorage.eyesHurt)) {
            button.classList.add('inactive-but');
            button.classList.remove('active-but');
            button.innerHTML = "<h4>My Eyes Hurt</h4> "
        }
        else {
            button.classList.remove('inactive-but');
            button.classList.add('active-but');
            button.innerHTML = "<h4>My Eyes Dont Hurt</h4> "
        }
    }

    switchLabel();

    buttonContain.append(button);

    button.addEventListener('click', () => {
        switchAnimations(true);
        switchLabel();
    })

    return buttonContain;

}


export function panelModule(list) {
    const sidePanel = document.createElement('div');
    sidePanel.classList.add('side-panel')
    sidePanel.append(...list)
    return sidePanel;
}

export function iconCollection() {
    const iconCollection = document.createElement('div');
    const iconTitle = document.createElement('div');
    iconTitle.innerHTML = `
        <h4> Links Collected </h4>
    `
    iconTitle.classList.add('icon-title')
    iconCollection.classList.add('icon-collection')
    iconCollection.append(iconTitle, iconList())
    return iconCollection;
}

export function spawnBurger() {
    const burgerPlaceholder = window.loadingAnim();
    burgerPlaceholder.setAttribute('id', 'loading-anim-stable');
    return burgerPlaceholder;
}

export function counter() {
    const counterCont = document.createElement('div');
    const counterTitle = document.createElement('span');
    counterTitle.innerHTML = "Site Hit Counter"
    counterTitle.classList.add('counter-title')
    counterCont.classList.add('counter');
    const item = document.querySelector('.newCounter')
    counterCont.append(counterTitle, item);
    return counterCont;
}


const panelCluster = {
    panel1: [iconCollection, linkMe, spawnBurger, eyesHurt, counter],
    panel2: [webRingContainer]
}


export function applySideBar() {
    const sidePanelWrap = document.createElement('div');
    sidePanelWrap.classList.add('grid-container', 'side-panel-wrap');

    for (var [key, val] of Object.entries(panelCluster)) {
        // console.log(val)
        if (!val.length) continue
        const sidePanel = panelModule([...val.map(fn => fn())])
        sidePanel.setAttribute('id', key)
        sidePanelWrap.append(sidePanel)
    }
    // const sidePanel = panelModule([iconCollection(), linkMe(), spawnBurger(), eyesHurt()])
    return sidePanelWrap
}