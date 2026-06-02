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
}

async function getNecessaryDirs(callback) {
    const keys = Object.keys(dirs)
    let index = 0;
    console.log(keys)
    for await (const key of keys) {
        await api.get('list', { path: dirs[key] }, async (c) => {
            dataExtracted.data = (c);
            readData();
            console.log(key);
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

async function readData() {
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

function uploadItems(items) {
    const prepObj = []
    for (var i of items) {
        i.files.forEach(element => {
            // console.log(element)
            const obj = {
                name: `${i.path}/${element}`,
                path: `./dist${i.path}/${element}`
            }
            console.log(obj)
            // console.log(obj);
            prepObj.push(obj)
        });
    }

    api.upload(prepObj, function(resp) {
        console.log(resp);
    })
}


getNecessaryDirs(() => {
    uploadItems(files);
    
})