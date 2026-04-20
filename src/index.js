import { element } from './template/main-page'

console.log('Hello!')

const body = document.querySelector('body')
body.prepend(element);
console.log(element)


const button = document.querySelectorAll('.hover-container');

button.forEach(i => {
    const btnTxtContent = i.querySelector('.hover-item').textContent.trim();
    const btnHitBox = i.querySelector('.hover-hitbox');
})



// fetch('../articles/04192026.json')
//     .then(response => response.json())
//     .then(data => {
//         const format = applyArticle(data);
//         const container = document.querySelector('.content-container');
//         container.append(format);
//     })
//     .catch(error => console.error("Error: ", error));

