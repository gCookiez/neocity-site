import * as fs from 'fs'
import * as jsdom from 'jsdom'

const object = {}


export async function categorySorter(f, p, s) {

    console.log(p)
    console.log(s)
    return;
}

export async function existenceCheck(data) {
    const checkIfExisting = await fs.promises.readFile(`./public/articles/${data.category}/${data.fileId}.json`, 'utf8').catch(err => null)
    const parsed = JSON.parse(await checkIfExisting);
    if (null !== await checkIfExisting && (data.mtime === parsed.mtime)) {
        console.log('Creation Skipped: ', data.fileId)
        return parsed;
    }
    return false;

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
