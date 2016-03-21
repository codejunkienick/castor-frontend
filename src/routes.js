import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Login,
    LoginSuccess,
    NotFound,
    Dashboard,
    Admin,
    Users,
    Posts,
    Post,
    Categories,
    Settings,
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user, token }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/login');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store
      .dispatch(loadAuth())
      .then(checkAuth)
      .catch(err => {
        console.log('oops');
        replace('/');
        cb();
      }) ;
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Login}/>

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="loginSuccess" component={LoginSuccess}/>

        <Route path="admin" component={Admin}>
          <IndexRoute component={Posts}/>
          
          <Route path="dashboard" component={Dashboard}/>
          <Route path="posts" component={Posts}/>
          <Route path="post" component={Post}/>
          <Route path="post/:postID" component={Post}/>
          <Route path="users" component={Users}/>
          <Route path="categories" component={Categories}/>
          <Route path="categories/:categoryId" component={Categories}/>
          <Route path="settings" component={Settings}/>
        </Route>
      </Route>

      { /* Routes */ }
      <Route path="login" component={Login}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
