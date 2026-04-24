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
    const path = window.location.pathname.replace('/', '');
    const route = menuItems[path].path;
    fetchJson(route);
} 

