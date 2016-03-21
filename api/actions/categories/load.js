const initialCategories = [
  {id: 1, slug: 'news', name: 'News' },
];

export function getCategories(req) {
  let categories = req.session.categories;
  if (!categories) {
    categories = initialCategories;
    req.session.categories = categories;
  }
  return categories;
}

export default function load(req) {
  return new Promise((resolve, reject) => {
    // make async call to database
    setTimeout(() => {
      resolve(getCategories(req));
    }, 1000); // simulate async load
  });
}
