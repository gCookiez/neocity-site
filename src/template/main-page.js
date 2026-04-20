const pageTemplate = document.createElement('template');
const menuItems = {
    home: {
        name: 'Home',
        url: 'main/'
    },
    gallery: {
        name: 'Gallery',
        url: 'gallery/'
    }
}
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

	for (var [key, value] of Object.entries(items)) {
		const clone = menuItem.cloneNode(true)
		const template = clone.content.firstElementChild;

		const textBox = template.querySelector('.hover-item');
		const id = template.querySelector('.hover-hitbox');
        const url = value.url

		id.setAttribute('id', key);
        id.addEventListener('click', () => {
            window.location.pathname = `/${url}`
        })

		textBox.innerHTML= `<h4> ${value.name} </h4>`;

		comp.append(template);
	}

	return comp;
}

const htmlString = `
	<div class="wrapper home">

        <div class="grid-container header">
            <div class="header-container">
                <h1 class="site-title"> WEB COLORS </h1>
            </div>
        </div>
        <div class="grid-container navi">

        </div>

        <div class="grid-container content">
            <div class="content-container"></div>

        </div>

        <div class="grid-container footer">
            
        </div>


    </div>
	`


pageTemplate.innerHTML = htmlString.trim();
const element = pageTemplate.content.firstElementChild;

element.querySelector('.grid-container.navi').append(generateMenuItems(menuItems))


export { element };