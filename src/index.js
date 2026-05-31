import { element } from '@template/main-page'
import { generateFooter } from '@template/footer';
import { fetchJson } from '@utils/render-json';
import { applySideBar } from '@template/right-panel';
import { locationInit } from './articles';
console.log('Hello!')

async function init() {
    setTimeout(function () {
        document.body.className = "";
        document.querySelectorAll('.meta').forEach(e => {
            e.classList.add('hidden');
        })
    }, 100);

    const body = document.querySelector('body')
    body.prepend(element, generateFooter());
    console.log(element);
}

const action = {
    module: true,
    callback: async (data) => {
        window.outerLinks = data;
        init();
        locationInit();
        element.querySelector('.wrapper.home').append(applySideBar())
    } 
}

fetchJson('/views/outerlinks.json', action);
