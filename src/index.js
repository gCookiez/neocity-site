import { element } from './template/main-page'

console.log('Hello!')

setTimeout(function(){
    document.body.className="";
},100);

const body = document.querySelector('body')
body.prepend(element);
console.log(element);

