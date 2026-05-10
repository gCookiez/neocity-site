import * as fs from 'fs'
import * as jsdom from 'jsdom'
import path from 'path';

const collection = []
const imgCollection = []

async function readAllFiles(dir, callback) {
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
    await convertToJSON(fullPath, stamps);
  }

  callback()


}

async function finalize() {
  await collection.sort((a, b) => b.date - a.date);
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

async function convertToJSON(fullPath, stamp) {

  const content = await fs.promises.readFile(fullPath, 'utf8');

  const dom = new jsdom.JSDOM(content);
  const object = {
    "method": "blogRender"
  }

  const raw = dom.window.document

  object.articleID = raw.querySelector('meta.file-id').getAttribute('fileid');

  collection.forEach((i, e) => i.articleID);

  const checkIfExisting = await fs.promises.readFile(`./public/articles/${object.articleID}.json`, 'utf8').catch(err => null);
  const parsed = JSON.parse(checkIfExisting);
  if (checkIfExisting !== null && (stamp.mtime === parsed.mTime)) {
    console.log('JSON SKIP')
    collection.push(parsed);
    return checkIfExisting;
  }

  object.author = raw.querySelector('author').textContent;
  object.title = raw.querySelector('title').textContent;
  object.date = stamp.birth;
  object.mTime = stamp.mtime;
  object.content = raw.querySelector('content.content').innerHTML;
  object.objPath = 'public/articles'
  object.fullPath = fullPath;

  collection.push(object);
  return;

}

function convertToView() {
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
    const filepath = file.objPath;
    if (!filepath) return;
    delete file.objPath;

    const filename = file.articleID;
    console.log(filename);

    console.log(file);
    fs.writeFile(`${filepath}/${filename}.json`, JSON.stringify(file), (err) => {
      if (err) throw err;
      console.log(`${filename}.json created`);
    })
  }

}

// fs.rmSync('./public/articles', { recursive: true, force: true });
// fs.mkdirSync('./public/articles');
readAllFiles('./raw', finalize);
// readAllImg('public/images')


