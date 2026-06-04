import { element } from '@template/main-page'
import { generateFooter } from '@template/footer';
import { fetchJson } from '@utils/render-json';
import { applySideBar } from '@template/right-panel';
import { locationInit } from './articles';
console.log('Hello!')

async function init() {
    const body = document.querySelector('body')
    body.prepend(element, generateFooter());
    
}

const action = {
    module: true,
    callback: async (data) => {
        document.querySelector('#loading-anim.full').remove();
        window.outerLinks = data;
        init();
        locationInit();
        element.querySelector('.wrapper.home').append(applySideBar())
    }
}

console.log('Timed')

fetchJson('/views/outerlinks.json', action);


