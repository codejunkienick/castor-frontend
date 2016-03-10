const dummyPosts = [
  {
    title: "Post number2",
    date: new Date('December 24, 2016 03:24:00'),
    body: 'Amet eos rerum voluptates provident veritatis illum dolore voluptates expedita nisi nisi. Consequatur deserunt similique dolores voluptatem et eos. Itaque illo dolorem ipsam libero laborum optio. Reiciendis quisquam quibusdam suscipit.',
    category: 'food',
    author: 'user1',
  },
  {
    title: "Post example",
    date: new Date('December 17, 2016 03:24:00'),
    body: 'Amet eos rerum voluptates provident veritatis illum dolore voluptates expedita nisi nisi. Consequatur deserunt similique dolores voluptatem et eos. Itaque illo dolorem ipsam libero laborum optio. Reiciendis quisquam quibusdam suscipit.',
    category: 'places',
    author: 'user2',
  },
]

export function getPosts(req) {
  let posts = req.session.posts;
  if (!posts) {
    posts = dummyPosts;
    req.session.posts = posts;
  }
  return posts;
}
export default function loadInfo(req) {
  return new Promise((resolve) => {
    console.log('return dummyPosts');
    resolve(getPosts(req));
  });
}
