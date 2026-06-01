setTimeout(function () {
    document.body.className = "";
    document.querySelectorAll('.meta').forEach(e => {
        e.classList.add('hidden');
    })
}, 100);

const mapping = ['top_bun', 'vege', 'meat', 'lettuce', 'bot_bun']

const burgerArea = document.querySelector('#loading-anim');
const loadingImage = document.querySelector('#burger-load');
const burgerParts = document.createElement('div');

burgerParts.classList.add('burger-parts')



for (var item of mapping) {
    const img = document.createElement('div');
    img.classList.add('loading-burg', item);
    burgerParts.append(img)
}

burgerArea.append(burgerParts);
burgerArea.classList.add('full')

const clone = burgerArea.cloneNode(true);
clone.classList.remove('full')



window.loadingAnim = () => {
    return clone.cloneNode(true);
}
