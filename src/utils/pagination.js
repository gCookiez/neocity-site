import { applyArticle } from "@template/blog-item";
import { container } from '@utils/render-json';
import { backtrack } from "@utils/router";
import { supabase } from "./db-connection";

export class pagination {
    constructor(data) {
        if (typeof data != "object") return;
        this.counter = data.page;
        this.paginationLayout = `
                <div class="pagination">
                    <span id="left-nav"> &lt; </span>
                    <div class="pages"> </div>
                    <span id="right-nav"> &gt; </span>
                </div>
        `
        this.backbutton = `
            <div class='back-button'>
                <span class="back-to-previous"> &lt;- Back </span>
            </div>
        `
         this.holdData = data;
         this.pages = 8;
         this.initialize();

    }

    async initialize() {
        try {
            const response = await supabase.rpc('get_total_for_category', 
                {
                    'target_category': this.holdData.target_category
                }
            )
            
            if (response.error) throw new Error(JSON.stringify(response.error))

            this.limit = Math.ceil(await response.data[0].count / this.pages);
            console.log('limit? ', await this.limit)
            await this.initRender();
        }
        catch(e){
            console.error(e);
        }


    }

    listingCatalogTemplate() {
        if (undefined === this.listingCatalog) {
            this.listingCatalog = document.createElement('div');
            this.listingCatalog.classList.add('group-catalog');
        }

        return this.listingCatalog;
    }

    pageDeveloper(data) {
        const catalogContainer = this.listingCatalogTemplate();
        const pageView = document.createElement('div');
        catalogContainer.replaceChildren('');

        pageView.classList.add('list-catalog', `page-${data.page}`);
            data.list.forEach(element => {
                element.category = this.holdData.target_category;
                const item = applyArticle(element);
                pageView.append(item);
            });

        catalogContainer.append(pageView);
    }

    async catalogRender() {
        try {
            const response = await supabase.rpc('get_pages_from_blogentries', 
                {
                    'target_category': this.holdData.target_category,
                    'page': this.counter
                }
            )
            
            if (response.error) throw new Error(JSON.stringify(response.error));

            const obj = {
                            target_category: this.holdData.target_category,
                            table: this.holdData.table,
                            page: this.counter,
                            list: await response.data
                        }
            this.pageDeveloper(obj);

        }
        catch (e) {
            console.error(e);
        }
    }

    paginationFormat() {
        const paginationRender = document.createRange().createContextualFragment(this.paginationLayout);
        paginationRender.querySelector('#left-nav').addEventListener('click', () => {
            this.prevPage();
        })
        paginationRender.querySelector('#right-nav').addEventListener('click', () => {
            this.nextPage()
        })
        return paginationRender;
    }


    backPage() {
        const elem = document.createRange().createContextualFragment(this.backbutton);
        elem.querySelector('.back-to-previous').addEventListener('click', () => {
            backtrack();
        }) 
        return elem;
    } 

    initPagination() {
        const render = this.paginationFormat()
        const pages = render.querySelector('.pages')
        for (var i = 1; i <= this.limit; i++) {
            const pageItem = document.createElement('span');
            pageItem.setAttribute('id', `page-${i}`);
            pageItem.innerHTML = i;
            pageItem.addEventListener('click', () => {
                this.changepageNumber(pageItem.getAttribute('id').replace('page-', ''));
            })
            pages.append(pageItem)
        }
        return render;

    }

    nextPage() {
        console.log('next')
        if (this.counter >= this.limit) return;
        this.counter++;
        this.renderChanges();
    }

    prevPage() {
        console.log('prev')
        if (this.counter <= 1) return;
        this.counter--;
        this.renderChanges();
    }

    changepageNumber(num) {
        this.counter = num;
        console.log(this.counter);
        this.renderChanges();
    }

    async renderChanges() {

        try {
            const top = document.querySelector('.site-title');
            top.scrollIntoView();
            // document.querySelectorAll('.list-catalog[class*=page]').forEach(element => {
            //     element.classList.add('hidden');
            // });
            this.catalogRender();

            // document.querySelector(`.list-catalog[class*=page-${this.counter}]`).classList.remove('hidden');

            document.querySelectorAll(`.pages > .selected`).forEach(element => {
                element.classList.remove('selected')
            })

            if (!document.querySelector(`.pages`)) return;

            document.querySelector(`.pages > [id*=page-${this.counter}]`).classList.add('selected');
        }
        catch(e) {
            console.error(e);
        }
        
    }
        

    initRender() {
        const cont = container();
        if (cont.querySelector('.group-catalog') === null) {
            if (this.renderedBackButton == undefined) this.renderedBackButton = this.backPage();
            if (this.renderedCatalog == undefined) this.renderedCatalog = this.listingCatalogTemplate();
            if (this.renderedPagination == undefined) this.renderedPagination = this.initPagination();
            if (this.limit <= 1) {
                cont.append(this.renderedBackButton, this.renderedCatalog);
            }
            else {
                cont.append(this.renderedBackButton, this.renderedCatalog, this.renderedPagination);
            }

            this.pageDeveloper(this.holdData);
            
            this.renderChanges();
        }

    }



   
    
}


// export class pagination {
//     constructor(data) {
//         if (typeof data != "object") return;
//         this.counter = 1;
//         this.paginationLayout = `
//                 <div class="pagination">
//                     <span id="left-nav"> &lt; </span>
//                     <div class="pages"> </div>
//                     <span id="right-nav"> &gt; </span>
//                 </div>
//         `
//         this.backbutton = `
//             <div class='back-button'>
//                 <span class="back-to-previous"> &lt;- Back </span>
//             </div>
//         `
//         this.catalog = data;
//         this.limit = Object.keys(this.catalog.articles).length;
//         this.initRender();

//     }

    // paginationFormat() {
    //     const paginationRender = document.createRange().createContextualFragment(this.paginationLayout);
    //     paginationRender.querySelector('#left-nav').addEventListener('click', () => {
    //         this.prevPage();
    //     })
    //     paginationRender.querySelector('#right-nav').addEventListener('click', () => {
    //         this.nextPage()
    //     })
    //     return paginationRender;
    // }

//     catalogRender() {
//         const listingCatalog = document.createElement('div');
//         listingCatalog.classList.add('group-catalog');

//         for (var [page, article] of Object.entries(this.catalog.articles)) {
//             const pageView = document.createElement('div');
//             pageView.classList.add('list-catalog', 'hidden', `page-${parseInt(page) + 1}`);
//             article.forEach(element => {
//                 element.category = this.catalog.category;
//                 const item = applyArticle(element);
//                 pageView.append(item);
//             });
//             listingCatalog.append(pageView);

//         }

//         return listingCatalog
//     }

//     backPage() {
//         const elem = document.createRange().createContextualFragment(this.backbutton);
//         elem.querySelector('.back-to-previous').addEventListener('click', () => {
//             backtrack();
//         }) 
//         return elem;
//     } 

    // initPagination() {
    //     const render = this.paginationFormat()
    //     const pages = render.querySelector('.pages')
    //     for (var i = 1; i <= this.limit; i++) {
    //         const pageItem = document.createElement('span');
    //         pageItem.setAttribute('id', `page-${i}`);
    //         pageItem.innerHTML = i;
    //         pageItem.addEventListener('click', () => {
    //             this.changepageNumber(pageItem.getAttribute('id').replace('page-', ''));
    //         })
    //         pages.append(pageItem)
    //     }
    //     return render;

    // }

//     changepageNumber(num) {
//         this.counter = num;
//         console.log(this.counter);
//         this.renderChanges();
//     }

//     nextPage() {
//         console.log('next')
//         if (this.counter >= this.limit) return;
//         this.counter++;
//         this.renderChanges();
//     }

//     prevPage() {
//         console.log('prev')
//         if (this.counter <= 1) return;
//         this.counter--;
//         this.renderChanges();
//     }

//     initRender() {
//         const cont = container();
//         if (cont.querySelector('.group-catalog') === null) {
//             if (this.renderedBackButton == undefined) this.renderedBackButton = this.backPage();
//             if (this.renderedCatalog == undefined) this.renderedCatalog = this.catalogRender();
//             if (this.renderedPagination == undefined) this.renderedPagination = this.initPagination();
//             if (this.limit <= 1) {
//                 cont.append(this.renderedBackButton, this.renderedCatalog);
//             }
//             else {
//                 cont.append(this.renderedBackButton, this.renderedCatalog, this.renderedPagination);
//             }
            
//             this.renderChanges();
//         }

//     }

//     renderChanges() {

//         const top = document.querySelector('.site-title');
//         top.scrollIntoView();
//         document.querySelectorAll('.list-catalog[class*=page]').forEach(element => {
//             element.classList.add('hidden');
//         });

//         document.querySelector(`.list-catalog[class*=page-${this.counter}]`).classList.remove('hidden');

//         document.querySelectorAll(`.pages > .selected`).forEach(element => {
//             element.classList.remove('selected')
//         })

//         if (!document.querySelector(`.pages`)) return;

//         document.querySelector(`.pages > [id*=page-${this.counter}]`).classList.add('selected');
//     }


// }