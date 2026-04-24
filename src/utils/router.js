import { fetchJson } from '@utils/render-json.js'

export const menuItems = {
    main: {
        name: 'Home',
        url: '/main',
        path: '../views/catalog.json'
    },
    gallery: {
        name: 'Gallery',
        url: `/gallery`,
        path: '../views/catalog.json'
    },
    about: {
        name: 'About',
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


export function route (event) {

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

export const handleLocation = () => {
    const path = window.location.pathname.replace('/', '').split('/');
    const route = path[0] === "blog" ? `../articles/${path[1]}.json` : menuItems[path[0]].path;
    if (route) {
        fetchJson(route);
    }
    
} 

