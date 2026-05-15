import { container } from '@utils/render-json'
import { intToDateFormat } from '@utils/date'
import { route } from '@utils/router'

const listModule = `
    <div class="list-item-bloglet"> 
        <span class="bloglet-title"></span> 
        <span class="bloglet-date"></span> 
    </div>
`

export function mainHome(callback) {
    const cont = container();
    const content = document.createElement('div');
    const contSetup = document.createElement('div');
    const moduleSetup = document.createElement('div');

    moduleSetup.classList.add('home-sub-module-place');

    content.classList.add('home-padding');
    contSetup.classList.add('home-grid');
    contSetup.append(welcomePlace(), moduleSetup);

    content.append(contSetup);
    cont.append(content);
    callback();
    return;
}

export function welcomePlace() {
    const placeholder = ` 
    <div class="welcome-cont">
        <h2> Welcome to my webpage! </h2>
        <p> This is where I might post random entries (including some ramblings about the dev of this site :/ ) </p>
    </div> 
    `
    const frag = document.createRange().createContextualFragment(placeholder);

    return frag;

}


export function blogletList(data) {

    const containerArea = document.createElement('div')
    containerArea.classList.add('bloglet-list');

    for (var i of data) {
        const listItem = document.createRange().createContextualFragment(listModule);
        const title = listItem.querySelector('.bloglet-title')
        const blogdate = listItem.querySelector('.bloglet-date')
        title.innerHTML = i.title;
        blogdate.innerHTML = intToDateFormat(i.date);
        containerArea.append(listItem);
        const articleID = i.articleID;

        title.addEventListener('click', () => {
            route(`blog/${articleID}`);
        })
        blogdate.addEventListener('click', () => {
            route(`blog/${articleID}`);
        })
    }

    return containerArea;
}

export function blogletModule(data) {
    const moduleSetup = document.querySelector('.home-sub-module-place')
    const blogletCont = document.createElement('div');
    const blogletContent = document.createElement('div');
    const blogletModTitle = document.createElement('div');
    blogletModTitle.classList.add('bloglet-mod-title');
    blogletCont.classList.add('bloglet-module');
    blogletContent.classList.add('bloglet-window');

    blogletModTitle.innerHTML = '<h3> Blog </h3>';

    blogletContent.append(blogletModTitle, blogletList(data.articles[0]));
    blogletCont.append(blogletContent)
    moduleSetup.append(blogletCont);
    return blogletCont;
}