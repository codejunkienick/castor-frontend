import {getPosts} from './loadPosts';
import _ from 'lodash';

export default function post(req, params) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const postID = parseInt(params[0]);
      console.log(postID);
      const posts = getPosts(req);
      if (isNaN(postID) || postID < 0 || postID > posts.length) {
        reject("invalid post id")
      } else {
        resolve(posts[postID]);
      }
    }, 1500); // simulate async db write
  });
}
