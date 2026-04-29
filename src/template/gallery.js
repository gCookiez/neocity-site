import * as light from 'fslightbox';

console.log(light.default);

const imgItem = document.createElement('template');
imgItem.innerHTML = `
	<a data-fslightbox>
		<img src="" alt="">
	</a>
`


export function populateGallery(data) {

	var lightbox = new FsLightbox();
	const dom = document.querySelector('.content-container');
	const container = document.createElement('div');
	container.classList.add('gallery-container');
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
		imgCont.querySelector('img').setAttribute('alt', img);
		container.append(imgCont);
	}


	dom.append(container);
	lightbox.props.sources = sources;
	// refreshFsLightBox(data.images);

	return;
}

