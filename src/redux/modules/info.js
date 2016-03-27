const LOAD = 'redux-example/LOAD';
const LOAD_SUCCESS = 'redux-example/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/LOAD_FAIL';
const UPDATE = 'redux-example/UPDATE';
const UPDATE_SUCCESS = 'redux-example/UPDATE_SUCCESS';
const UPDATE_FAIL = 'redux-example/UPDATE_FAIL';

const initialState = {
  loaded: false
};

export default function info(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        blog: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case UPDATE:
      return {
        ...state,
        updating: true,
        updateError: null,
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        updating: false,
        blog: action.result
      };
    case UPDATE_FAIL:
      return {
        ...state,
        updating: false,
        updateError: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.info && globalState.info.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/blog')
  };
}
export function update(blog, id) {
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: (client) => client.put('/blog/' + id, {
      data: {
        ...blog
      }
    })
  };
}
