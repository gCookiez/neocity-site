import { mouseDownListener, resetColorStatus, resetLargestIndex } from "./window-controller";

const desktop = document.querySelector('desktop');
export const windows = [];
let offsetX = 20;
let offsetY = 20;

const sysButtons = ["minimize", "maximize", "close"]

const resizers = [
    'edge-right',
    'edge-left',
    'edge-top',
    'edge-bot',
    'top-right',
    'top-left',
    'bot-right',
    'bot-left',
]

export function uniqueChecker(name) {
    const filter = windows.filter(e => e.getAttribute('id') === name);
    if (filter.length) {
        console.log('Window already exists');
    }

    return filter.length ? true : false;
}

export function framework(attr) {
    const windowItem = document.createElement('window');
    const windowTitle = document.createElement('window-title');
    const windowTitleText = document.createElement('h4');
    const hitbox = document.createElement('title-hitbox');
    const sysbuttonsArea = document.createElement('sys-buttons-area');
    const windowBody = document.createElement('window-body');


    //replace from array to object for function binding
    for (var i of sysButtons) {
        const button = document.createElement('sys-button')
        button.classList.add(i);
        sysbuttonsArea.append(button);
    }

    windowItem.style.width = attr.width || '250px';
    windowItem.style.height = attr.height || '250px';
    windowItem.setAttribute('data-offset-x', attr.xOffset || '50')
    windowItem.setAttribute('data-offset-y', attr.yOffset || '50')
    windowItem.setAttribute('data-resizable', undefined !== attr.resizable ? attr.resizable : true);
    windowTitleText.innerHTML = attr.title || 'Default';
    windowBody.innerHTML = attr.body || '<h1> Default </h1>';

    windowTitle.append(windowTitleText, hitbox, sysbuttonsArea);
    windowItem.append(windowTitle, windowBody,);

    for (var i of resizers) {
        const borderHitbox = document.createElement('border-hitbox');
        borderHitbox.classList.add(i);
        windowItem.append(borderHitbox)
    }

    return windowItem;
}

export function addWindow(list) {

    function setupFramework(i) {
        resetColorStatus()
        const newWindow = framework(i || undefined);
        windows.push(newWindow);
        newWindow.style.zIndex = parseInt(windows.indexOf(newWindow) + 1) * 10;
        newWindow.addEventListener('mousedown', mouseDownListener);
        desktop.append(newWindow);
        newWindow.classList.add('active');

        if (undefined !== i.unique) {
            newWindow.setAttribute('id', i.unique);
        }

        return newWindow;
    }

    if ('object' === typeof list && !list.length) {
        const item = setupFramework(list);
        resetLargestIndex();
        return item;
    }


    const addedWindows = [];
    for (var i of list) {
        addedWindows.push(setupFramework(i));
    }
    resetLargestIndex();
    return addedWindows;
}



