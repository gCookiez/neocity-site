import * as fs from 'fs'

export function generateCategoryView() {
    try {
        const data = global.config
        if (data) {
            fs.writeFile(`./public/views/category.json`, JSON.stringify(data.categories), (err) => {
                if (err) throw err;
                console.log(`category.json created`);
            })
        }
    }
    catch (e) {
        console.error(e);
    }

}

export async function generateCatalogView(data) {
    try {
        const view = {
            method: "view",
            category: data.category,
            articles: {}
        }

        var counter = 0;


        const fillfour = [];

        for (var file of data.articles) {
            const tempObj = {}
            tempObj.fileId = file.fileId;
            tempObj.title = file.title;
            tempObj.date = file.date;
            tempObj.path = file.objPath

            const replaced = file.content.replace(/<\/?\w[^>]*>|&\w+/g, '').replace("\\s+", " ").trim();
            tempObj.content = replaced.length > 300 ? replaced.substr(0, 300) + '...' : replaced;
            fillfour.push(tempObj);
            if (fillfour.length === 4) {
                view.articles[counter] = JSON.parse(JSON.stringify(fillfour));
                fillfour.length = 0;
                counter++;
            }

        }

        //cleanup stage

        if (fillfour.length > 0) {
            view.articles[counter] = JSON.parse(JSON.stringify(fillfour));
            fillfour.length = 0;
        }

        const dir = fs.existsSync(`./public/views/categories`);

        if (!dir) {
            await fs.promises.mkdir(`./public/views/categories`);
        }



        fs.writeFile(`public/views/categories/${data.category}.json`, JSON.stringify(view), (err) => {
            if (err) throw err;
            console.log(`${data.category}.json created`);
        })

    }
    catch (e) {
        console.error(e);
    }

}