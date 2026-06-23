import { closestTarget, closeWindows } from "./window-controller";
import { windows, addWindow, uniqueChecker, removeTaskItem } from "./window-counter";


export function newWindowPopup() {
    if(uniqueChecker('new_window')) return;

    const html = `
        <div class='new-window-form'>
            <label for="title"> Window Title </label>
            <input type="text" id="title"/>
            <label for="width"> Window Width (px): </label>
            <input type="text" inputmode="numeric" pattern="\\\d*" oninput="this.value = this.value.replace(/\\\D/g, '')" placeholder="Enter only numbers" id="width"/>
            <label for="height"> Window Height (px): </label>
            <input type="text" inputmode="numeric" pattern="\\\d*" oninput="this.value = this.value.replace(/\\\D/g, '')" placeholder="Enter only numbers" id="height"/>
            <label for="xOffset"> Window X-Offset (%): </label>
            <input type="text" inputmode="numeric" pattern="\\\d*" oninput="this.value = this.value.replace(/\\\D/g, '')" placeholder="Enter only numbers" id="xOffset"/>
            <label for="yOffset"> Window Y-Offset (%): </label>
            <input type="text" inputmode="numeric" pattern="\\\d*" oninput="this.value = this.value.replace(/\\\D/g, '')" placeholder="Enter only numbers" id="yOffset"/>
            <label for="body"> Content: </label>
            <textarea id="body" style="box-sizing: border-box; padding: 10px; min-width: 465px; max-width: 465px; min-height: 200px">
    &lt;!---
        &lt;div&gt; 
        &lt;/div&gt;
    ---&gt; 
            </textarea>
            <button id="newWindow"> New Window </button> 
        </div>
    `

    const ref = addWindow({
        body: html,
        title: 'Add New Window',
        unique: 'new_window',
        resizable: false,
        width: '500px',
        height: '600px',
        xOffset: "30",
        yOffset: "30",
    });

    console.log(ref.getAttribute('id'));

    ref.querySelector('.new-window-form > #newWindow').addEventListener('click', function(e){
        const forms = this.closest('.new-window-form').querySelectorAll('input,textarea');
        const attr = {};
        forms.forEach((g) => {
            const id = g.getAttribute('id');
            attr[id] = g.value;
        })

        console.log(attr);
        
        const thisWin = closestTarget(e)
        removeTaskItem(thisWin)
        closeWindows([thisWin]);
        addWindow(attr);

        ref.removeEventListener('click', this);
    })

    return;

}

export function qlFunctions() {
    const trash = document.querySelector('ql-icon.trash')
    trash.addEventListener('click', (e) => {
        e.preventDefault();
        closeWindows([...windows]);
    })

    const button = document.querySelector('ql-icon.add');
    button.addEventListener('click', (e) => {
        e.preventDefault();
        newWindowPopup();
    })
    return;
}
