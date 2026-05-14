import { container } from '@utils/render-json'

export function mainHome(callback) {
    const cont = container();
    const content = document.createElement('div');
    const gridSetup = document.createElement('div');
    content.classList.add('home-padding');
    gridSetup.classList.add('home-grid');
    gridSetup.append(welcomePlace());
    content.append(gridSetup);
    cont.append(content);
    callback();
    return;
}

export function welcomePlace() {
    const placeholder = ` 
    <div class="welcome-cont">
        <h2> Welcome to my blog place! </h2>
        <p> This is where I might post random entries (including some ramblings about the dev of this site :/ ) </p>

    </div> 
    `
    const frag = document.createRange().createContextualFragment(placeholder);

    return frag;

}