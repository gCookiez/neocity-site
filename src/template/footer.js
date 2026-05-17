import { route } from '@utils/router'

const footerTemplate = `
        <div class="grid-container footer">
            <div class="lhs">
                <h4> ©crispypata 2026 </h4>
                <a href="https://www.neocities.org">
                    <img alt="Logo For Neocities" src="/neocities.png" />
                </a>
            </div> 

            <div class="rhs">
            <span> For inquiries: <b> musou_saber@proton.me </b> </span>
            <span class="site-map-link"> Sitemap </span>
            </div> 
            
        </div>
`

export function generateFooter() {
    const footer = document.createRange().createContextualFragment(footerTemplate);
    footer.querySelector('.site-map-link').addEventListener('click', () => {
        route('/sitemap');
    })
    return footer;
}