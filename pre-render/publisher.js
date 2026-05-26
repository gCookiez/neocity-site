// this should replace the old converter.js
// Goal: Categories are sorted and 
import * as fs from 'fs'
import * as jsdom from 'jsdom'
import path from 'path';
import { categorySorter } from './src/raw-converter.js';

const collection = {

}

async function readRawFiles(dir, callback) {
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
        callback(file, fullPath, stamps)
    }
}


readRawFiles('raw', categorySorter)