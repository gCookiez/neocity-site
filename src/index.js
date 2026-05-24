import { element } from './template/main-page'
import { generateFooter } from '@template/footer';

console.log('Hello!')

setTimeout(function(){
    document.body.className="";
    document.querySelectorAll('.meta').forEach(e => {
        e.classList.add('hidden');
    })
},100);

const body = document.querySelector('body')
body.prepend(element, generateFooter());
console.log(element);

