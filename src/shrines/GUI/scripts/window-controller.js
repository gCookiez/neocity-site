// const windows = document.querySelectorAll('windowsdow');
// const header = document.querySelectorAll('windowsdow-title');
import { windows } from "./window-counter";

let isDragging = 0;
let offsetX = 0;
let offsetY = 0;
let largestIndex = 0;

export function resetLargestIndex() {
    largestIndex = (windows.length) * 10;
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
        ('title-hitbox' === e.target.nodeName.toLowerCase())

    )
}

export function mouseDownListener(e) {
    console.log(e.target.nodeName)
    isDragging = true;

    largestIndex += 10
    closestTarget(e).style.zIndex = largestIndex;


    offsetX = e.clientX - closestTarget(e).offsetLeft;
    offsetY = e.clientY - closestTarget(e).offsetTop;

    if (windowTargetChecker(e)) {
        e.target.style.height = '1000vh';
        e.target.style.width = '1000vw';
        e.target.addEventListener("mousemove", mouseMoveHandler)
    }
    e.target.addEventListener("mouseup", mouseUpHandler)
}

export function mouseMoveHandler(e) {
    if (!isDragging) return;
    closestTarget(e).style.left = `${e.clientX - offsetX}px`
    closestTarget(e).style.top = `${e.clientY - offsetY}px`
}

export function mouseUpHandler(e) {
    isDragging = false;
    if (windowTargetChecker(e)) {
        e.target.style.height = '100%';
        e.target.style.removeProperty('width');
    }

    zIndexFixer();
    e.target.removeEventListener("mousemove", mouseMoveHandler);
    e.target.removeEventListener("mouseup", mouseUpHandler);
}

// windows.forEach((e, i) => {
//     e.style.zIndex = (i + 1) * 10;
//     e.addEventListener('mousedown', mouseDownListener)

// })