import { route, menuItems } from '@utils/router'

const pageTemplate = document.createElement('template');
const menuItem = document.createElement('template');
menuItem.innerHTML = `
				<div class="hover-container">
                    <div class="hover-hitbox"></div>
                    <div class="hover-item active">
                    </div>
                </div>

`

function generateMenuItems(items) {
    const comp = document.createElement('div');
    comp.classList.add('window-container');
    comp.style.setProperty('--total', Object.keys(items).length)
    let index = 1;

    for (var [key, value] of Object.entries(items)) {
        if (value.hidden == true) continue;
        const clone = menuItem.cloneNode(true)
        const template = clone.content.firstElementChild;
        const refresh = value.refresh;

        const textBox = template.querySelector('.hover-item');
        const id = template.querySelector('.hover-hitbox');
        template.style.setProperty('--index', index)
        const url = value.url

        id.setAttribute('id', key);
        id.addEventListener('click', () => {
            if (undefined !== refresh && false === refresh) {
                value.action();
                return;
            }
            route(url);
        })

        textBox.innerHTML = `
            <span class="icon-set-shrink ${value.name}"> </span>
            <h4> ${value.name} </h4>
        `;

        comp.append(template);
        index++;
    }

    return comp;
}

const htmlString = `
    <div class="body-container">
	    <div class="wrapper home">

            <div class="grid-container header">
                <div class="header-container">
                    <h1 class="site-title"> &lt; HUNGRY DEV BLOG/&gt; </h1>
                </div>
            </div>
            <div class="grid-container navi">

            </div>

            <div class="grid-container content">
                <div class="content-container"></div>

            </div>



        </div>
    </div>
	`


pageTemplate.innerHTML = htmlString.trim();
const element = pageTemplate.content.firstElementChild;
element.querySelector('.header-container').addEventListener('click', (e) => {
    e.target.classList.toggle('interact');
})

element.querySelector('.grid-container.navi').append(generateMenuItems(menuItems))


export { element };