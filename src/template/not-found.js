import { container } from '@utils/render-json';
const page404 = `
    <div class="nothing-burger">
        <h1> 404 </h1>
        <span> Nothing to see here bud </span>
    </div> 
`

export function place404() {
    const layout = document.createRange().createContextualFragment(page404);
    const cont = container();
    cont.append(layout);
    return
}