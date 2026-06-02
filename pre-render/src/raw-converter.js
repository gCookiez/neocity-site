import * as fs from 'fs'
import * as jsdom from 'jsdom'

const object = {}
const itemsToDelete = {
    items: []
};



export async function existenceCheck(data) {
    const checkIfExisting = await fs.promises.readFile(`./public/articles/${data.category}/${data.fileId}.json`, 'utf8').catch(err => null)
    const parsed = JSON.parse(await checkIfExisting);
    if (null !== await checkIfExisting && (data.mtime === parsed.mtime)) {
        console.log('Creation Skipped: ', data.fileId)
        return parsed;
    }
    return false;

}

export async function rawCheck(data) {
    const checkIfExisting = await fs.promises.readFile(data.fullPath, 'utf8').catch(err => undefined)
    return await checkIfExisting === undefined ? true : false;
}

export async function scanRaw(data) {
    const scan = fs.promises.readFile(data, 'utf8').catch(err => undefined);
    if (undefined !== scan) {
        return JSON.parse(await scan);
    }
    return false;
}


export async function deleteItem(data) {
    const checkIfExisting = await fs.promises.unlink(`./public/articles/${data.category}/${data.fileId}`).catch(err => null)
}

export async function setupRemoteDelete() {
    fs.writeFile('./post-render/remotedelete.json', JSON.stringify(itemsToDelete), (err) => {
        if (err) throw err;
        console.log(`remotedelete.json created`);
    })
    return;
}

export async function removeOffData() {
    try {
        if (undefined === global.config) throw new Error('Yaml not found. Continuing operations')

        for (var cat of Object.keys(global.config.categories.list)) {
            console.log(cat);
            const path = `./public/articles/${cat}`
            const dirarticles = fs.existsSync(path);
            if (dirarticles) {
                const item = await fs.readdirSync(path);
                for await (var i of item) {
                    const rawPath = `${path}/${i}`
                    const result = await scanRaw(rawPath);
                    if (!result) continue;
                    const conclude = await rawCheck(result);
                    if (conclude) {
                        deleteItem({
                            category: cat,
                            fileId: i
                        })
                        itemsToDelete.items.push(rawPath.replace('./public', ''));
                    }
                }
            }
        }
    }
    catch (err) {
        console.error(err);
    }
    setupRemoteDelete();
    return
}

export async function convertToJSON(file, fullPath, stamp) {
    try {
        const object = {
            "method": "blogRender"
        }


        const content = await fs.promises.readFile(fullPath, 'utf8').then(res => new jsdom.JSDOM(res));
        const raw = content.window.document;
        const fileid = raw.querySelector('meta.file-id').getAttribute('fileid');
        const category = raw.querySelector('meta[category]').getAttribute('category');
        const existenceData = {
            mtime: stamp.mtime,
            fileId: fileid,
            category: category
        }

        const result = await existenceCheck(existenceData)

        if (result) {

            return result;
        }


        const title = raw.querySelector('title').textContent.trim()
        const author = raw.querySelector('author').textContent.trim()
        const htmlContent = raw.querySelector('content').innerHTML;


        await Object.assign(object, {
            author: author,
            fileId: fileid,
            title: title,
            date: stamp.birth,
            mtime: stamp.mtime,
            content: htmlContent,
            objPath: `public/articles/${category}`,
            setIntoView: true,
            fullPath: fullPath,
            category: category
        })

        return object;


    }
    catch (e) {
        console.error(e)
        return false
    }
}
