import load from './loadPosts';
import _ from 'lodash';

export default function update(req) {
  return new Promise(async (resolve, reject) => {
    // write to database
    const posts = await load(req);
    const post = {
      title: req.body.title,
      body: req.body.body,
      date: req.body.date,
      category: req.body.category,
      author: req.body.author
    }
    if (!post.body || !post.title || !post.author) {
      reject('Fill all fields');
    }
    posts.push(post)
    console.log(posts);
    resolve();
  });
}
