import { route, handleLocation } from '@utils/router'


export function locationInit() {
    window.onpopstate = handleLocation;
    window.route = route;

    handleLocation();
}



