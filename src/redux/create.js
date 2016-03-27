import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import { routerMiddleware as syncHistory } from 'react-router-redux';
import createLogger from 'redux-logger';
import { browserHistory } from 'react-router';
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage';
import debounce from 'redux-storage-decorator-debounce';
import filter from 'redux-storage-decorator-filter'

const engine = debounce(
    createEngine('my-save-keyklasjdlas(*^&kh(&^*dkjhaskdhaiusdhjandsa897148ASDASFG*^%*^&^*732bmndb'),
    3000);
export const load = storage.createLoader(engine);

export default function createStore(client, data) {
  const reduxRouterMiddleware = syncHistory(browserHistory);
  const storageMiddleware = storage.createMiddleware(engine); 
  const middleware = [createMiddleware(client), reduxRouterMiddleware, storageMiddleware, createLogger()];


  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools');
    const DevTools = require('../containers/DevTools/DevTools');
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  const reducer = require('./modules/reducer');
  const store = finalCreateStore(reducer, data);

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer'));
    });
  }
  load(store);
  return store;
}

