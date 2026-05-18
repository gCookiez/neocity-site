import { container } from '@utils/render-json'

export function applySideBar() {
    const sidePanelWrap = document.createElement('div');
    const sidePanel = document.createElement('div');
    sidePanelWrap.classList.add('grid-container', 'side-panel-wrap');
    sidePanel.classList.add('side-panel')
    sidePanelWrap.append(sidePanel);
    return sidePanelWrap
}