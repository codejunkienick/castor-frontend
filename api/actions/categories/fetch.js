import {getCategories} from './load';
import _ from 'lodash';

export default function update(req) {
  return new Promise((resolve, reject) => {
    // write to database
    setTimeout(() => {
      const catID = parseInt(params[0]);
      const cats = getCategories(req);
      const catFound = _.findIndex(cats, (cat) => cat.id === catID);
      if (isNaN(catID) || catID < 0 || !catFound) {
        reject("invalid post id")
      } else {
        resolve(cats[catFound]);
      }
    }, 1500); // simulate async db write
  });
}
