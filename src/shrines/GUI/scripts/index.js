import { addWindow, taskbarPopulation, windows } from "./window-counter";
import { mouseDownListener, windowFixer, debouncer } from "./window-controller";
import { newWindowPopup, qlFunctions } from "./taskbar-options";


qlFunctions();


addWindow([
    
    {
        xOffset:'20',
        yOffset:'20',
        width: '900px',
        height: '450px',
        title: "Welcome_Window",
        body: `<h4> Welcome to the Window Area! </h4>
                <p> Feel Free to Drag Around the windows! </p>`
    },
    {
        xOffset:'60',
        yOffset:'10',
        width: '696px',
        height: '500px',
        title: "Alternative",
        body: `<p> To get started, Open Devtools -> Console and copy this: </p>
        <p> Or use the 'Add new Window' "program"</p>
                <br>
                <div class="code-background">
              <pre><code>
 addWindow([
 {
     xOffset: 20,
     yOffset: 20,
     width: '250px',
     height: '250px',
     title: 'Window_title',
     body: '&lt;h1&gt; Hello World! &lt;/h1&gt;'
 }
 ])
              </code>
              </pre>
              </div>
        `
    },
    {
        xOffset:'72',
        yOffset:'60',
        width: '300',
        title: "Recommended Screen",
        body: '<h4> Only recommended in desktop and Minimum Size 1920x1080px </h4>'
    },
    {
        xOffset:'3',
        yOffset:'60',
        width: '300',
        title: "Missing Features",
        body: '<h4> For now, features are still missing. Progress is still ongoing </h4>'
    }
])

newWindowPopup();


window.addWindow = addWindow;
window.windowFixer = windowFixer;

const resizeChecker = debouncer(windowFixer);
window.addEventListener('resize', resizeChecker);



