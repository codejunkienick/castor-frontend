import {getCategories} from './load';
import _ from 'lodash';

export default function update(req) {
  return new Promise((resolve, reject) => {
    // write to database
    setTimeout(() => {
      let cats = getCategories(req);
      const category = {
        name: req.body.name,
        added: new Date().toISOString(),
        author: req.body.author
      }
      if (!category.name) {
        reject("invalid category")
      } else {
        cats.push(category);
        resolve();
      }
    }, 1500); // simulate async db write
  });
}
