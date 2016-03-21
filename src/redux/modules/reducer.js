import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routeReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import counter from './counter';
import {reducer as form} from 'redux-form';
import info from './info';
import widgets from './widgets';
import posts from './posts';
import categories from './categories';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  auth,
  posts,
  info,
  categories,
});
