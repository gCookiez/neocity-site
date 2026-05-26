const object = {}


export async function categorySorter(f, p, s) {

    console.log(p)
    console.log(s)
    return;
}


export async function convertToJSON(file, fullPath, stamp,) {
    try {
        const content = await fs.promises.readFile(fullPath, 'utf8');


    }
    catch(e) {
        console.error(e)
        return false
    }
}
