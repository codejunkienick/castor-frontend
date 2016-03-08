const dummyPosts = [
  {
    title: "Post number2",
    date: new Date('December 24, 2016 03:24:00');
    body: 'Amet eos rerum voluptates provident veritatis illum dolore voluptates expedita nisi nisi. Consequatur deserunt similique dolores voluptatem et eos. Itaque illo dolorem ipsam libero laborum optio. Reiciendis quisquam quibusdam suscipit.',
    category: 'food'
  },
  {
    title: "Post example",
    date: new Date('December 17, 2016 03:24:00');
    body: 'Amet eos rerum voluptates provident veritatis illum dolore voluptates expedita nisi nisi. Consequatur deserunt similique dolores voluptatem et eos. Itaque illo dolorem ipsam libero laborum optio. Reiciendis quisquam quibusdam suscipit.',
    category: 'places'
  },
]

export default function loadInfo() {
  return new Promise((resolve) => {
    resolve(dummyPosts);
  });
}
