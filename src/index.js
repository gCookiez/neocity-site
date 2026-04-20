import { element} from './template/main-page'

console.log('Hello!')

const body = document.querySelector('body')
body.prepend(element);
console.log(element)


const button = document.querySelectorAll('.hover-container');

button.forEach(i => {
    const btnTxtContent = i.querySelector('.hover-item').textContent.trim();
    const btnHitBox = i.querySelector('.hover-hitbox');

    btnHitBox.addEventListener('click', () => {
        console.log(btnTxtContent);
    })
})

function applyArticle(data) {
    const documentArea = document.createElement('div');
    documentArea.classList.add('article-area');
    documentArea.innerHTML = `
        <h2> ${data.title} </h2>
        <br>
        <span> Posted on: ${data.date} </span>
        <br>
        <br>
        <p> ${data.content} </p>
    `

    return documentArea

}


fetch('../articles/04192026.json')
    .then(response => response.json())
    .then(data => {
        const format = applyArticle(data);
        const container = document.querySelector('.content-container');
        container.append(format);
    })
    .catch(error => console.error("Error: ", error));

