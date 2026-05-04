import { fetchJson } from '@utils/render-json.js'

export const menuItems = {
    '/': {
        name: 'Home',
        url: '/',
        path: '../views/catalog.json'
    },
    gallery: {
        name: 'Gallery',
        url: `/gallery`,
        path: '../views/gallery.json'
    },
    about: {
        name: 'About',
        hidden: true,
        url: `/about`,
        path: '../views/catalog.json'
    },
    blog: {
        name: 'Blog',
        hidden: true,
        url: `/blog`,
    },
    404: {
        name: '404',
        hidden: true,
        url: `/404`,
        path: false
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
        fetchJson(`../articles/${path[1]}.json`);
        return;
    }
    const route = menuItems[path[0]] ? menuItems[path[0]].path : menuItems['404'].path;
    if (route) {
        fetchJson(route);
    }
    else {
        window.history.pushState({}, "", '404');
    }

}




