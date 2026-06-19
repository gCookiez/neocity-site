import { addWindow, windows } from "./window-counter";
import { mouseDownListener } from "./window-controller";

const desktop = document.querySelector('desktop');

addWindow([
    {
        xOffset: 20,
        yOffset: 80,
        title: 'Feels Free to Drag around',
        body: '<h1> Let\'s Go! </h1>'
    },
    {
        xOffset: 50,
        yOffset: -200,
        title: 'Draggable',
        body: '<h1> You May Drag windows for now </h1>',
    },
    {
        xOffset: -400,
        yOffset: -100,
        title: 'Demo Only',
        body: '<h1> This is Demo Only </h1>',
    }
]);

console.log(windows);

for (var [e, i] of Object.entries(windows)) {
    console.log(parseInt(e) + 1);
    desktop.append(i);
    i.style.zIndex = (parseInt(e) + 1) * 10;
    i.addEventListener('mousedown', mouseDownListener);
}

