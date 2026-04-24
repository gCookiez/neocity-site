import { route, handleLocation } from '@utils/router'
// route('/main');

window.onpopstate = handleLocation;
window.route = route;