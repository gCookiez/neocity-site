const link = "https://crispypata.atabook.org/";
import { container } from '@utils/render-json';

export function guestBookRender() {
    const iframe = document.createElement('iframe');
    const cont = document.createElement('div');
    const dom = container();
    iframe.classList.add('guestbook');
    cont.classList.add('guestbook-cont')
    iframe.setAttribute('src', link);
    cont.append(iframe)
    dom.append(cont)
    return;
}