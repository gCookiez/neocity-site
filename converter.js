import * as fs from 'fs'
import * as jsdom from 'jsdom'
import path from 'path';

const collection = []

async function readAllFiles(dir) {
  const files = await fs.promises.readdir(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const content = await fs.promises.readFile(fullPath, 'utf8');
    convertToJSON(content, fullPath);
  }
  writeFiles();
  convertToView();

}

function convertToJSON(data, fullPath) {

  const dom = new jsdom.JSDOM(data);
  const object = {
    "method": "blogRender"
  }

  const raw = dom.window.document
  object.articleID = raw.querySelector('meta.file-id').getAttribute('fileid');
  object.author = raw.querySelector('author').textContent;
  object.title = raw.querySelector('title').textContent;
  object.date = new Date().toJSON().substr(0, 10);
  object.content = raw.querySelector('content.content').innerHTML;
  object.path = 'public/articles'

  console.log(object);
  collection.push(object);
  return;

}

function convertToView() {
  const view = {
    method: "view",
    articles: {}
  }

  const fillfour = [];
  var counter = 0;

  for (var file of collection) {
    const tempObj = {}
    tempObj.articleID = file.articleID;
    tempObj.title = file.title;
    tempObj.date = file.date;

    const replaced = file.content.replace(/<\/?\w[^>]*>|&\w+/g, '').replace("\\s+", " ").trim();
    console.log(replaced);
    tempObj.content = replaced.length > 300 ? replaced.substr(0, 300) + '...' : replaced;
    fillfour.push(tempObj);
    if (fillfour.length === 4) {
      view.articles[counter] = JSON.parse(JSON.stringify(fillfour));
      fillfour.length = 0;
      counter++;
    }
  }

  if (fillfour.length > 0) {
    view.articles[counter] = JSON.parse(JSON.stringify(fillfour));
    fillfour.length = 0;
  }

  fs.writeFile(`public/views/catalog.json`, JSON.stringify(view), (err) => {
    if (err) throw err;
    console.log(`catalog.json created`);
  })

}


function writeFiles() {
  for (var file of collection) {
    const filepath = file.path;
    delete file.path;
    fs.writeFile(`${filepath}/${file.articleID}.json`, JSON.stringify(file), (err) => {
      if (err) throw err;
      console.log(`${file.articleID}.json created`);
    })
  }

}

fs.rmSync('./public/articles', { recursive: true, force: true });
fs.mkdirSync('./public/articles');
readAllFiles('public/raw');


