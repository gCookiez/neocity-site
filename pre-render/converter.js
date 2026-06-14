import * as fs from 'fs'
import * as jsdom from 'jsdom'
import path from 'path';

const imgCollection = [];

async function readAllImg(dir) {
  const files = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const file of files) {
    console.log(file);
    if (file.isDirectory()) continue;
    const fullPath = path.join(dir, file.name).replaceAll('public\\', '');
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

readAllImg('public/images')

// making new method for categorizing 




