import { element } from './template/main-page'

console.log('Hello!')

const body = document.querySelector('body')
body.prepend(element);
console.log(element);

