import * as light from 'fslightbox';
import { container } from '@utils/render-json';

console.log(light.default);

const imgItem = document.createElement('template');
imgItem.innerHTML = `
	<a class="img-item" data-fslightbox>
		<img class="thumb" src="" alt="">
	</a>
`


export function populateGallery(data) {

	var lightbox = new FsLightbox();
	const dom = container();
	const cont = document.createElement('div');
	const containerGrid = document.createElement('div');
	cont.classList.add('gallery-container');
	containerGrid.classList.add('gallery-grid');
	const sources = []

	for (var [integer ,img] of Object.entries(data.images)) {
		const imgCont = imgItem.content.firstElementChild.cloneNode(true);
		sources.push(img);
		const integerLock = parseInt(integer);
		imgCont.setAttribute('data-fslightbox', 'gallery');
		imgCont.setAttribute('href', img);
		imgCont.addEventListener('click', (event) => {
			event.preventDefault();
			lightbox.open(integerLock);
		})
		imgCont.querySelector('img').setAttribute('src', img);
		imgCont.querySelector('img').setAttribute('alt', img);
		containerGrid.append(imgCont);
	}


	cont.append(containerGrid);

	dom.append(cont);
	lightbox.props.sources = sources;
	// refreshFsLightBox(data.images);

	return;
}

