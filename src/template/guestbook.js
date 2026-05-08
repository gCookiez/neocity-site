const link = "https://crispypata.atabook.org/";

export function guestBookRender() {
    const iframe = document.createElement('iframe');
    const container = document.createElement('div');
    const dom = document.querySelector('.content-container');
    iframe.classList.add('guestbook');
    container.classList.add('guestbook-cont')
    iframe.setAttribute('src', link);
    container.append(iframe)
    dom.append(container)
    return;
}