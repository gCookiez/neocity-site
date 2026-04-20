const pageTemplate = document.createElement('template');
const menuItems = ['Home', 'Gallery', 'Contact', 'Network', 'MISC']
const menuItem = document.createElement('template');
menuItem.innerHTML = `
				<div class="hover-container">
                    <div class="hover-hitbox"></div>
                    <div class="hover-item active">
                    </div>
                </div>

`
function generateMenuItems(items) {
	var stringComp = '';
	for (var item of items) {
		const clone = menuItem.cloneNode(true)
		const template = clone.content.firstElementChild;
		console.log(template);
		const textBox = template.querySelector('.hover-item');
		const id = template.querySelector('.hover-hitbox');
		id.setAttribute('id', item);
		textBox.innerHTML= `<h4> ${item} </h4>`;
		stringComp += template.outerHTML;
	}

	return stringComp;
}

const htmlString = `
	<div class="wrapper home">

        <div class="grid-container header">
            <div class="header-container">
                <h1 class="site-title"> WEB COLORS </h1>
            </div>
        </div>
        <div class="grid-container navi">
            <div class="window-container">
                ${generateMenuItems(menuItems)}
            </div>

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


export { element };