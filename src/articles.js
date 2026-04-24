import { route, handleLocation } from '@utils/router'

window.onpopstate = handleLocation;
window.route = route;

handleLocation();