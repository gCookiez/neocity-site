import { applyArticle } from "@template/blog-item";
export class pagination {
    constructor(data) {
        if (typeof data != "object") return;
        this.counter = 1;
        this.paginationLayout = `
                <div class="pagination">
                    <span id="left-nav"> &lt; </span>
                    <div class="pages"> </div>
                    <span id="right-nav"> &gt; </span>
                </div>
        `

        this.catalog = data;
        this.limit = Object.keys(this.catalog.articles).length;
        this.initRender();

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

    catalogRender() {
        const listingCatalog = document.createElement('div');
        listingCatalog.classList.add('group-catalog');

        for (var [page, article] of Object.entries(this.catalog.articles)) {
            console.log(page);
            const pageView = document.createElement('div');
            pageView.classList.add('list-catalog', 'hidden', `page-${parseInt(page) + 1}`);
            article.forEach(element => {
                const item = applyArticle(element);
                pageView.append(item);
            });
            listingCatalog.append(pageView);

        }

        return listingCatalog
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

    changepageNumber(num) {
        this.counter = num;
        console.log(this.counter);
        this.renderChanges();
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

    initRender() {
        const container = document.querySelector('.content-container');
        if (container.querySelector('.group-catalog') === null) {
            if (this.renderedCatalog == undefined) this.renderedCatalog = this.catalogRender();
            if (this.renderedPagination == undefined) this.renderedPagination = this.initPagination();
            if (this.limit <= 1) {
                container.append(this.renderedCatalog);
            }
            else {
                container.append(this.renderedCatalog, this.renderedPagination);
            }
            
            this.renderChanges();
        }

    }

    renderChanges() {
        document.querySelectorAll('.list-catalog[class*=page]').forEach(element => {
            element.classList.add('hidden');
        });

        document.querySelector(`.list-catalog[class*=page-${this.counter}]`).classList.remove('hidden');
    }


}