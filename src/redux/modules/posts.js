const LOAD = 'castor/posts/LOAD';
const LOAD_SUCCESS = 'castor/posts/LOAD_SUCCESS';
const LOAD_FAIL = 'castor/posts/LOAD_FAIL';
const DELETE = 'castor/posts/DELETE';
const DELETE_SUCCESS = 'castor/posts/DELETE_SUCCESS';
const DELETE_FAIL = 'castor/posts/DELETE_FAIL';

const initialState = {
  loaded: false
};

export default function posts(state = initialState, action = {}) {
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
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case DELETE:
      return {
        ...state,
        deleting: {
          ...state.deleting,
          [action.id]: true
        },
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        deleting: {
          ...state.deleting,
          [action.id]: null
        },
        data: action.result
      };
    case DELETE_FAIL:
      return {
        ...state,
        deleting: {
          ...state.deleting,
          [action.id]: null
        },
        error: action.error
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
    promise: (client) => client.get('/loadPosts')
  };
}

export function deletePost(id) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    promise: (client) => client.post('/deletePost', {
      data: {
        id
      }
    }),
    id
  };
}


