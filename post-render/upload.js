/* for now, the files is only setup to upload new articles */

import NeoCities from 'neocities'
import fs from 'fs'
const item = process.env

var api = new NeoCities(item.NEO_USERNAME, item.NEO_PASSWORD);

const dataExtracted = {
    data: undefined
}

const files = []


const dirs = {
    articles: '/articles',
    views_cat: '/views',
    icons: '/icons',
    sys: '/sys',
    // sys: '/sys/cursor98'
}

const roots = '/assets'
const reupload = [
    './dist/shrines/kamen_rider/',
    './dist/shrines/MTG/',
    './dist/shrines/GUI/',
]


async function getNecessaryDirs(callback) {
    const keys = Object.keys(dirs)
    let index = 0;
    console.log(keys)
    for await (const key of keys) {
        await api.get('list', { path: dirs[key] }, async (c) => {
            dataExtracted.data = (c);
            readData(dirs[key]);
            if (index === keys.length - 1) {
                console.log("This is the last item of the array!");
                callback();
            }

            index++;

        })

    }
}

function getFilesFromDir(dir) {
    const data = fs.readdirSync(dir);
    const obj = {
        path: dir.replace('./dist', ''),
        files: data
    }

    files.push(obj);
    return;
}

async function readData(path) {
    // console.log(path)
    const checkFiles = fs.readdirSync(`./dist/${path}`);
    const newSet = new Set(dataExtracted.data.files.map(i => i.path.split(/[\/\\]/).pop()))

    const onlyInLocal = checkFiles.filter(file => !newSet.has(file))
    console.log(onlyInLocal);

    onlyInLocal.forEach((i, e) => {
        const obj = {
            path: `${path}/`,
            files: [i]
        }
        files.push(obj);
    })

    //simplify the extraction later. might not need to complicated the compilation of files

    for (var i of dataExtracted.data.files) {
        if (i.is_directory) {
            fs.existsSync(`./dist/${i.path}`) ? getFilesFromDir(`./dist/${i.path}`) : null;
        }
        else {
            const item = fs.existsSync(`./dist/${i.path}`);
            const trueDir = `/${i.path.replace(/[^/]*$/, '')}`
            const filename = i.path.split(/[\/\\]/).pop();
            const ind = files.findIndex(item => item.path === trueDir);
            if (ind !== -1) {

                files[ind].files.push(filename)
                continue;
            }

            const obj = {
                path: trueDir,
                files: [filename]
            }
            files.push(obj);

        }
    }
    return;
}

async function deleteItems(callback) {

    const items = await fs.promises.readFile('./post-render/remotedelete.json', 'utf8').catch(err => undefined)
    if (items) {
        const parsed = JSON.parse(await items);
        // console.log(parsed);

        if (parsed.items.length !== 0) {
            api.delete(parsed.items, function (resp) {
                // console.log(resp)
                if (undefined !== resp && 'success' === resp.result) {
                    fs.promises.unlink('./post-render/remotedelete.json');
                    callback()
                }
            })
        }
        else {
            callback();
        }
    }
}

function uploadItems(items) {
    const prepObj = []
    for (var i of items) {
        i.files.forEach(element => {
            // console.log(element)
            const obj = {
                name: `${i.path}/${element}`,
                path: `./dist${i.path}/${element}`
            }
            // console.log(obj)
            // console.log(obj);
            prepObj.push(obj)
        });
    }

    api.upload(prepObj, function (resp) {
        console.log(resp);
    })
}


async function replaceNecessaryRoots(toRemove) {
    getFilesFromDir(`./dist${roots}`);
    for (var i of reupload) {
        getFilesFromDir(i);
    }
    const obj = {
        path: '/',
        files: [`index.html`]
    }
    files.push(obj);
    console.log(files);
    api.delete(toRemove, (resp) => {
        console.log(resp);
    })
    return;
}

async function checkNecessaryRoots(callback) {

    api.get('list', { path: roots }, async (c) => {
        console.log(c);
        const transform = Object.values(c.files).map((d) => `${d.path}`)
        await replaceNecessaryRoots(transform)
        callback();
    })
}


checkNecessaryRoots(() => {
    getNecessaryDirs(async () => {
        await deleteItems(() => {
            // console.log(files);
            uploadItems(files);
        })
    })
});
// checkNecessaryRoots()
// replaceNecessaryRoots()
