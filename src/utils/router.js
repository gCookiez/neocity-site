import { fetchJson, resetPage } from '@utils/render-json.js'
import { place404 } from '@template/not-found.js'
import { guestBookRender } from '@template/guestbook'
import { mainHome, blogletModule } from '@template/revo-main'

export const menuItems = {
    '/': {
        name: "Home",
        url: "/",
        fetch: false,
        action: () => {
            mainHome(() => {
                // post render stuff
                console.log('Post render');
                const options = {
                    module: true,
                    callback: blogletModule
                }
                fetchJson(`../views/catalog.json?t=${new Date().getTime()}`, options)
            });
        }
    },
    blog: {
        name: 'Blog',
        url: '/blog',
        path: '../views/catalog.json',
        fetch: true
    },
    gallery: {
        name: 'Gallery',
        url: `/gallery`,
        path: '../views/gallery.json',
        fetch: true
    },
    about: {
        name: 'About',
        hidden: true,
        url: `/about`,
        path: '../views/catalog.json',
        fetch: true
    },
    guestbook: {
        name: "Guestbook",
        url: "/guestbook",
        fetch: false,
        action: () => {
            guestBookRender();
        }
    },
    404: {
        name: '404',
        hidden: true,
        url: `/404`,
        fetch: true
    }
}


export function route(event) {

    event = event || window.event;

    if (typeof event === 'string') {
        window.history.pushState({}, "", event);
    }
    if (typeof event == 'object') {
        console.log(event.target.href);
        window.history.pushState({}, "", event.target.href);
    }

    handleLocation();
}

export const checkpoint = () => {
    const queryParams = new URLSearchParams(window.location.search);
    if (!queryParams['size']) return;
    const path = queryParams.get('redirLink');
    window.history.pushState({}, "", path);
    return;
}

export const handleLocation = () => {
    checkpoint();

    const path = window.location.pathname === "/" ? "/" : window.location.pathname.replace('/', '').split('/');



    if (path[0] === "blog" && path[1] != undefined) {
        fetchJson(`../articles/${path[1]}.json?t=${new Date().getTime()}`);
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
        place404();
    }

}




