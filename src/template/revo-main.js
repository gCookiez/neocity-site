export function mainHome() {
    const container = document.querySelector('.content-container');
    const content = document.createElement('div');
    const gridSetup = document.createElement('div');
    content.classList.add('home-padding');
    gridSetup.classList.add('home-grid');
    content.append(gridSetup);
    container.append(content);
    return;
}