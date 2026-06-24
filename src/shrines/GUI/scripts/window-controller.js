import { removeTaskItem, searchTaskItem, windows, resetTaskbarActiveStatus } from "./window-counter";

let isDragging = 0;
let isResizing = 0;
let offsetX = 0;
let offsetY = 0;
let largestIndex = 0;
let startX, startY, startWidth, startHeight, startLeft, startTop;
let activeWindow = null;
let activeResizer = null;
let sizeLimit = 250;

const scalefactor = 1;

export function resetLargestIndex() {
    largestIndex = (windows.length) * 10;
}

export function forceLarge() {
    largestIndex += 10;
    return largestIndex;
}


export function zIndexFixer() {
    const entries = Object.values(document.querySelectorAll('window'));
    const checkZIndex = entries.every(e => '' !== closestTarget(e).style.zIndex ? !0 : 0);
    if (largestIndex > (windows.length * 10) && checkZIndex) {
        largestIndex = (windows.length * 10);
        let iter = 0;
        const sorted = entries.sort((a, b) => closestTarget(b).style.zIndex - closestTarget(a).style.zIndex);

        sorted.forEach((e) => {
            const target = closestTarget(e);
            target.style.zIndex = largestIndex - iter;
            iter += 10;
        })
    }

}

export function closestTarget(e) {
    if (e instanceof HTMLElement) return e.closest('window');
    return e.target.closest('window');
}


export function windowTargetChecker(e) {
    return (
        !('window-body' === e.target.nodeName.toLowerCase()) &&
        !('window-body' === e.target.offsetParent.nodeName.toLowerCase()) &&
        !('sys-button' === e.target.nodeName.toLowerCase()) &&
        (('title-hitbox' === e.target.nodeName.toLowerCase()) ||
            ('border-hitbox' === e.target.nodeName.toLowerCase()))

    )
}

export function resetColorStatus() {
    windows.forEach((e) => {
        e.classList.remove('active');
    })
}

export function mouseDownListener(e) {

    resetColorStatus();
    closestTarget(e).style.zIndex = forceLarge();
    closestTarget(e).classList.add('active');

    offsetX = e.clientX - closestTarget(e).offsetLeft;
    offsetY = e.clientY - closestTarget(e).offsetTop;
    zIndexFixer();
    windowFixer();

    if (windowTargetChecker(e)) {
        console.log(e.target.nodeName.toLowerCase())
        activeWindow = closestTarget(e);
        console.log('zindex?');


        if ('title-hitbox' === e.target.nodeName.toLowerCase()) {
            isDragging = true;
        }

        if ('border-hitbox' === e.target.nodeName.toLowerCase()) {

            startX = e.clientX;
            startY = e.clientY;
            startTop = parseFloat(getComputedStyle(closestTarget(e)).getPropertyValue('top', null).replace('px', ''))
            startLeft = parseFloat(getComputedStyle(closestTarget(e)).getPropertyValue('left', null).replace('px', ''))
            startWidth = parseFloat(getComputedStyle(closestTarget(e)).getPropertyValue('width', null).replace('px', ''))
            startHeight = parseFloat(getComputedStyle(closestTarget(e)).getPropertyValue('height', null).replace('px', ''))
            e.preventDefault();
            activeResizer = e.target.className;
            isResizing = JSON.parse(activeWindow.getAttribute('data-resizable'));
            console.log(activeResizer)
        }

        window.addEventListener("mousemove", mouseMoveHandler);
    }

    window.addEventListener("mouseup", mouseUpHandler);
}

export function mouseMoveHandler(e) {



    if (isResizing) {
        const dx = (e.clientX - startX) / scalefactor;
        const dy = (e.clientY - startY) / scalefactor;

        if ('edge-right' === activeResizer || 'top-right' === activeResizer || 'bot-right' === activeResizer) {
            console.log('egde-right');
            const width = startWidth + dx;
            activeWindow.style.width = width + 'px';
        }

        if ('edge-left' === activeResizer || 'top-left' === activeResizer || 'bot-left' === activeResizer) {
            console.log('edge-left');
            const width = startWidth - dx;
            const newX = startLeft + dx
            activeWindow.style.width = width + 'px';
            if (width > sizeLimit) {
                activeWindow.style.left = newX + 'px';
            }
        }

        if ('edge-top' === activeResizer || 'top-right' === activeResizer || 'top-left' === activeResizer) {
            console.log('edge-top');
            const height = startHeight - dy;
            const newY = startTop + dy;
            activeWindow.style.height = height + 'px';
            if (height > sizeLimit) {
                activeWindow.style.top = newY + 'px';
            }
        }

        if ('edge-bot' === activeResizer || 'bot-right' === activeResizer || 'bot-left' === activeResizer) {
            console.log('edge-bot');
            const height = startHeight + dy;
            activeWindow.style.height = height + 'px';
        }

    }

    if (isDragging) {
        if (activeWindow.querySelector('sys-button.restore')) return;
        
        activeWindow.style.left = `${e.clientX - offsetX}px`
        activeWindow.style.top = `${e.clientY - offsetY}px`
    }

}

export function closeWindows(wins) {
    console.log(wins);
    if (!wins.length) return;
    for (var i of wins) {
        const index = windows.indexOf(i);
        if (index > -1) {
            windows.splice(index, 1);
            resetLargestIndex();
        }

        i.removeEventListener('mousedown', mouseDownListener);
        i.remove();

    }
    return;
}

export function mouseUpHandler(e) {

    isDragging = false;
    isResizing = false;
    startX, startY, startWidth, startHeight, startLeft, startTop = 0;
    activeWindow = null;
    activeResizer = null;
    let skip = false;

    if ('SYS-BUTTON' === e.target.nodeName && 'close' === e.target.classList.value) {
        const closestWin = closestTarget(e)
        removeTaskItem(closestWin)
        closeWindows([closestWin]);
        return;
    }

    if ('SYS-BUTTON' === e.target.nodeName && 'minimize' === e.target.classList.value) {

        resetColorStatus();
        resetTaskbarActiveStatus();
        closestTarget(e).classList.remove('active');
        closestTarget(e).style.display = 'none';
        return;
    }

    if ('SYS-BUTTON' === e.target.nodeName && 'maximize' === e.target.classList.value) {
        let testWindow = 'true' === closestTarget(e).getAttribute('data-resizable');
        if (testWindow) {
            closestTarget(e).setAttribute('last-restore', closestTarget(e).style.cssText);
            closestTarget(e).style.left = `0px`;
            closestTarget(e).style.top = `0px`;
            closestTarget(e).style.width = window.innerWidth + 'px';
            closestTarget(e).style.height = (window.innerHeight - 30) + 'px';
            e.target.classList.replace('maximize', 'restore');
            skip = true;
        }

    }

    if ('SYS-BUTTON' === e.target.nodeName && 'restore' === e.target.classList.value && !skip) {
        closestTarget(e).style.cssText = closestTarget(e).getAttribute('last-restore');
        closestTarget(e).setAttribute('last-restore', null);
        e.target.classList.replace('restore', 'maximize');
    }

    resetTaskbarActiveStatus();

    if (null !== closestTarget(e)) {
        const taskItem = searchTaskItem(closestTarget(e));
        taskItem.classList.add('active');
    }

    window.removeEventListener("mousemove", mouseMoveHandler);
    window.removeEventListener("mouseup", mouseUpHandler);
}

export function windowFixer() {
    const windowX = window.innerWidth;
    const windowY = window.innerHeight;

    function raw(x) {
        const newCalc = x.replace('px', '');
        return parseInt(newCalc);
    }

    windows.forEach((e) => {
        const itemLeft = raw(window.getComputedStyle(e).left)
        const itemTop = raw(window.getComputedStyle(e).top)
        const itemWidth = raw(window.getComputedStyle(e).width)
        const itemHeight = raw(window.getComputedStyle(e).height)
        const xCheck = itemLeft + itemWidth;
        const yCheck = itemTop + itemHeight;

        if (itemLeft > windowX) {
            e.style.left = (xCheck - itemWidth) + (windowX - xCheck) - 20 + 'px'
        }

        if (0 > xCheck) {
            e.style.left = '20px'

        }

        if (itemTop >= (windowY - 50)) {
            e.style.top = itemTop + (windowY - yCheck) - 50 + 'px'
        }

        if (0 > itemTop) {
            e.style.top = '20px'
        }

    })
}

export function debouncer(func, delay = 300) {
    let timerId;

    return function (...args) {
        clearTimeout(timerId);

        timerId = setTimeout(() => {
            func.apply(args);
        }, delay)
    }
}

