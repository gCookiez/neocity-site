import { fetchJson, resetPage } from '@utils/render-json.js'
import { place404 } from '@template/not-found.js'
import { guestBookRender } from '@template/guestbook'
import { mainHome, blogletModule } from '@template/revo-main'
import { createSiteMap } from '@template/sitemap'
import { categoryRenderer } from './category'
import { container } from '@utils/render-json'
import { loadingBurger, spawnLoading } from './render-json'
import { switchAnimations } from '@template/right-panel'

export function toggleMediaQuery() {
    const mediaMatch1 = window.matchMedia('screen and (orientation: landscape) and (min-width: 0px) and (max-width: 1560px)')
    const mediaMatch2 = window.matchMedia('screen and (orientation: portrait) and (min-width: 1024px)')

    if (mediaMatch1.matches || mediaMatch2.matches) {
        expandContract(true);
    }
    else {
        expandContract(false);
    }
    
    return;
}

export function expandContract(force) {
    const item = document.querySelector('.window-container')

    if(undefined === force) {
        item.classList.toggle('collapse');
    }
    else if (force) {
        item.classList.add('collapse');
    }
    else {
        item.classList.remove('collapse');
    }
    
    const h4 = item.querySelector('.hover-container:has(#collapse) > * h4')

    if (item.className.includes('collapse')) {
        h4.innerHTML = "Expand"
        return;
    }

    if (!item.className.includes('collapse')) {
        h4.innerHTML = "Collapse"
        return;
    }
}

export const menuItems = {
    '/': {
        name: "Home",
        url: "/",
        img: "/sys/sysassets.png",
        fetch: false,
        action: () => {
            mainHome(() => {
                switchAnimations()


                //fix on webrings that have rely on DOMContentLoaded Triggers


            });
        },
        desc: 'The front page of the website. The start area for any visitor.'
    },
    about: {
        name: 'About',
        url: `/about`,
        fetch: true,
        path: '../views/about.json',
        desc: `About the developer.`
    },
    blog: {
        name: 'Blog',
        url: '/blog',
        fetch: true,
        path: `../views/category.json?t=${new Date().getTime()}`,
        desc: `Blog entries are compiled in this page. Mainly the thoughts of the site's developer.`
    },
    gallery: {
        name: 'Gallery',
        url: `/gallery`,
        path: '../views/gallery.json',
        fetch: true,
        desc: `Includes the images shared by the developer.`

    },
    projects: {
        name: "Projects",
        hidden: false,
        url: "/projects",
        fetch: true,
        path: '../views/shrines.json',
        desc: `A section full of areas of interest. Feel free to read them all.`
    },
    guestbook: {
        name: "Guestbook",
        url: "/guestbook",
        fetch: false,
        action: () => {
            guestBookRender();

        },
        desc: `Where visitors share their inner thoughts about anything about the webpage and whatever.`
    },
    sitemap: {
        name: "Sitemap",
        hidden: false,
        url: "/sitemap",
        fetch: false,
        action: () => {
            createSiteMap();
        },
        desc: `Contains all the available routes of this site.`
    },
    404: {
        name: '404',
        hidden: true,
        url: `/404`,
        fetch: true,
        desc: `Wrong turn buddy.`
    },
    collapse: {
        name: 'Collapse',
        hidden: false,
        fetch: false,
        refresh: false,
        action: () => {
            expandContract();
        },
        desc: `Wrong turn buddy.`
    }
}


export function route(event) {

    event = event || window.event;

    if (typeof event === 'string') {
        console.log(event);
        window.history.pushState({}, "", event);
    }
    // if (typeof event == 'object') {
    //     console.log(event.target.href);
    //     window.history.pushState({}, "", event.target.href);
    // }

    handleLocation();
}

export function backtrack(data) {
    const path = window.location.pathname === "/" ? "/" : window.location.pathname.replace('/', '').split('/');
    if (path.length <= 0) return;
    path.length = path.length - 1;
    const joined = path.join('/')
    route(`/${joined}`)

}

export const checkpoint = () => {
    const queryParams = new URLSearchParams(window.location.search);
    if (!queryParams['size']) return;
    const path = queryParams.get('redirLink');
    console.log(path);
    window.history.pushState({}, "", path);
    return;
}

export const handleLocation = () => {
    checkpoint();
    const body = document.querySelector('html');
    body.scrollIntoView();
    const path = window.location.pathname === "/" ? "/" : window.location.pathname.replace('/', '').split('/');
    toggleMediaQuery();

    if (path[0] === "blog" && path[1] != undefined) {
        if (undefined !== path[2]) {
            fetchJson(`/articles/${path[1]}/${path[2]}.json?t=${new Date().getTime()}`);
            return;
        }
        fetchJson(`/views/categories/${path[1]}.json?t=${new Date().getTime()}`);
        return;
    }

    const route = menuItems[path[0]] && undefined !== menuItems[path[0]].path ? `${menuItems[path[0]].path}?t=${new Date().getTime()}` : false;

    if ((undefined !== menuItems[path[0]] && !menuItems[path[0]].fetch) && !route) {
        resetPage();
        undefined !== menuItems[path[0]].action ? menuItems[path[0]].action() : null;

        return;
    }

    if (route) {
        fetchJson(route);
    }
    else {
        window.history.pushState({}, "", '404');
        resetPage();
        place404();
    }

}




