import load from './loadPosts';
import _ from 'lodash';

export default function update(req) {
  return new Promise((resolve, reject) => {
    // write to database
    setTimeout(async () => {
      if (Math.random() < 0.2) {
        reject('Oh no! delete 20% of the time. Try again.');
      } else {
        const posts = await load(req);
        const postId = req.body.id;
        posts.splice(postId, 1)
        console.log(posts);
        resolve(posts);
      }
    }, 1500); // simulate async db write
  });
}
