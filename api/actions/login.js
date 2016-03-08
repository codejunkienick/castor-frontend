export default function login(req) {
  const user = {
    username: req.body.name,
    displayName: 'John Doe',
    avatar: '/avatar.png'
  };
  console.log(user);
  req.session.user = user;
  return Promise.resolve(user);
}
