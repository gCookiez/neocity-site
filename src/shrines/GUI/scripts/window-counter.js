import { resetLargestIndex } from "./window-controller";

export const windows = [];

const sysButtons = ["minimize", "maximize", "close"]

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
    windowItem.setAttribute('data-offset-x', attr.xOffset || '50')
    windowItem.setAttribute('data-offset-y', attr.yOffset || '50')
    windowTitleText.innerHTML = attr.title || 'Default';
    windowBody.innerHTML = attr.body || '<h1> Default </h1>';

    windowTitle.append(windowTitleText, hitbox, sysbuttonsArea);
    windowItem.append(windowTitle, windowBody);

    return windowItem;  
}

export function addWindow(list) {
    for (var i of list) {
        windows.push(framework(i || undefined));
    }
    resetLargestIndex();
    
}



