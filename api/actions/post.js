import load from './loadPosts';
import _ from 'lodash';

export default function update(req, params) {
  return new Promise(async (resolve, reject) => {
    // write to database
    const posts = await load(req);
    console.log(params);
    console.log(posts);
    resolve();
  });
}
