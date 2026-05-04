import * as fs from 'fs'
import * as jsdom from 'jsdom'
import path from 'path';

const collection = []
const imgCollection = []

async function readAllFiles(dir) {
  const files = await fs.promises.readdir(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const content = await fs.promises.readFile(fullPath, 'utf8');
    convertToJSON(content, fullPath);
  }
  collection.sort((a, b) => b.date - a.date);
  await writeFiles();
  await convertToView();

}

async function readAllImg(dir) {
  const files = await fs.promises.readdir(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file).replaceAll('public\\', '');
    imgCollection.push(fullPath);
  }
  console.log(imgCollection);
  printToGallery();
}

async function printToGallery() {
  const checkIfExisting = await fs.promises.readFile(`./public/articles/gallery.json`, 'utf8').catch(err => null);
  var object;

  if (checkIfExisting !== null) {
    object = JSON.parse(checkIfExisting)
  }
  else {
    object = {
        method: "gallery",
        route: './public/images',
        images: []
      }
  }

  object.images = [...imgCollection];

  fs.writeFile(`public/views/gallery.json`, JSON.stringify(object), (err) => {
    if (err) throw err;
    console.log(`gallery.json created`);
  })

}

async function convertToJSON(data, fullPath) {


  const dom = new jsdom.JSDOM(data);
  const object = {
    "method": "blogRender"
  }

  const raw = dom.window.document
  object.articleID = raw.querySelector('meta.file-id').getAttribute('fileid');

  const checkIfExisting = await fs.promises.readFile(`./public/articles/${object.articleID}.json`, 'utf8').catch(err => null);

  if (checkIfExisting !== null) {
    console.log('JSON SKIP')
    collection.push(JSON.parse(checkIfExisting));
    return checkIfExisting;
  }

  object.author = raw.querySelector('author').textContent;
  object.title = raw.querySelector('title').textContent;
  object.date = new Date().getTime();
  object.content = raw.querySelector('content.content').innerHTML;
  object.path = 'public/articles'
  object.fullPath = fullPath;

  console.log(object);
  collection.push(object);
  return;

}

function convertToView() {
  console.log(collection)
  const view = {
    method: "view",
    articles: {}
  }
  var counter = 0;


  const fillfour = [];

  for (var file of collection) {
    const tempObj = {}
    tempObj.articleID = file.articleID;
    tempObj.title = file.title;
    tempObj.date = file.date;

    const replaced = file.content.replace(/<\/?\w[^>]*>|&\w+/g, '').replace("\\s+", " ").trim();
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


async function writeFiles() {
  for (var file of collection) {
    const checkIfExisting = await fs.promises.readFile(`./public/articles/${file.articleID}.json`, 'utf8').catch(err => null);
    if (checkIfExisting) {
      console.log(`./public/articles/${file.articleID}.json`)
      console.log('write skip');
      continue;
    }
    const filepath = file.path;
    delete file.path;
    fs.writeFile(`${filepath}/${file.articleID}.json`, JSON.stringify(file), (err) => {
      if (err) throw err;
      console.log(`${file.articleID}.json created`);
    })
  }

}

// fs.rmSync('./public/articles', { recursive: true, force: true });
// fs.mkdirSync('./public/articles');
readAllFiles('public/raw');
readAllImg('public/images')


