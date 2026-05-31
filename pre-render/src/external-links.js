import * as fs from 'fs'


export function generateOuterLinks() {
    try {
        const data = global.config
        console.log('YAML', data)
        const obj = {
            links: data.iconsList,
            rings: data.webringList
        }
        if (data) {
            fs.writeFile(`./public/views/outerlinks.json`, JSON.stringify(obj), (err) => {
                if (err) throw err;
                console.log(`category.json created`);
            })
        }
    }
    catch (e) {
        console.error(e);
    }

}