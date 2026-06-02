// this should replace the old converter.js
// Goal: Categories are sorted and 
import * as fs from 'fs'
import * as jsdom from 'jsdom'
import path from 'path';
import * as yaml from 'js-yaml';
import { convertToJSON, removeOffData } from './src/raw-converter.js';
import { generateCategoryView, generateCatalogView } from './src/convert-view.js';
import { generateOuterLinks} from './src/external-links.js';


const collection = {}
const imgCollection = [];

function sorter(data) {
    if (data.method === "blogRender") {
        console.log('category', data.category)
        if (undefined === collection[data.category]) {
            collection[data.category] = []
        }
        collection[data.category].push(data);
    }
}


async function finalize() {
    for (var key of Object.keys(collection)) {
        collection[key] = collection[key].sort((a, b) => b.date - a.date);
        const data = {
            category: key,
            articles: JSON.parse(JSON.stringify(collection[key]))
        }
        await generateCatalogView(data)
    };
    await segregateCat();

}

async function segregateCat() {
    for (var [category, data] of Object.entries(collection)) {
        try {

            const dirarticles = fs.existsSync(`./public/articles`);

            if (!dirarticles) {
                await fs.promises.mkdir(`./public/articles`);
            }

            const dir = fs.existsSync(`./public/articles/${category}`);

            if (!dir) {
                await fs.promises.mkdir(`./public/articles/${category}`);
            }

            const feed = {
                category: category,
                data: data
            }

            await writeFiles(feed);
        }
        catch (e) {
            console.error(e);
            continue;
        }


    }
}

async function writeFiles(items) {
    if (undefined === items) return;

    for (var file of items.data) {
        const filePath = file.objPath;
        if (!file.setIntoView) {
            console.log('Skipped writing! ', file.fileId)
            continue;
        }
        delete file.setIntoView;

        const filename = file.fileId;
        console.log(filename);

        const copy = JSON.parse(JSON.stringify(file))

        delete copy.objPath;

        fs.writeFile(`${filePath}/${filename}.json`, JSON.stringify(copy), (err) => {
            if (err) throw err;
            console.log(`${filename}.json created`);
        })

    }
    return;
}

async function readRawFiles(dir, processor, callback) {
    const files = await fs.promises.readdir(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const birth = fs.statSync(fullPath);
        const time = new Date(birth.birthtime).getTime()
        const mtime = new Date(birth.mtime).getTime()
        const stamps = {
            mtime: mtime,
            birth: time
        }
        const result = await processor(file, fullPath, stamps);
        if (await result) {
            sorter(result);
        }
        
    }

    callback();
}

async function callYAML() {
    try {
        const fileContents = fs.readFileSync('./pre-render/config.yaml', 'utf8');
        const data = yaml.load(fileContents);
        global.config = data;
    }
    catch (e) {
        console.error(e);
        global.config = undefined;
    }
}

async function initialize() {
    await callYAML();
    await generateOuterLinks();
    await generateCategoryView();
    await removeOffData();
    await readRawFiles('raw', convertToJSON, finalize);

}


initialize();
