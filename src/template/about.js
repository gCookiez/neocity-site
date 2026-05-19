import { container } from "@utils/render-json";

export function aboutMe(data) {
    const cont = container();
    const aboutCont = document.createElement('div');
    const aboutContent = document.createRange().createContextualFragment(data.content);
    aboutCont.classList.add('about-area');
    aboutCont.append(aboutContent);
    cont.append(aboutCont);
    // const 
    console.log(data)
}