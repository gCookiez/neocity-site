console.log('Hello!')


const button = document.querySelectorAll('.hover-container');

button.forEach(i => {
    const btnTxtContent = i.querySelector('.hover-item').textContent.trim();
    const btnHitBox = i.querySelector('.hover-hitbox');

    btnHitBox.addEventListener('click', () => {
        console.log(btnTxtContent);
    })
})