const LOAD = 'castor/posts/LOAD';
const LOAD_SUCCESS = 'castor/posts/LOAD_SUCCESS';
const LOAD_FAIL = 'castor/posts/LOAD_FAIL';
const DELETE = 'castor/posts/DELETE';
const DELETE_SUCCESS = 'castor/posts/DELETE_SUCCESS';
const DELETE_FAIL = 'castor/posts/DELETE_FAIL';
const PUBLISH = 'castor/posts/PUBLISH';
const PUBLISH_SUCCESS = 'castor/posts/PUBLISH_SUCCESS';
const PUBLISH_FAIL = 'castor/posts/PUBLISH_FAIL';
const UPDATE = 'castor/posts/UPDATE';
const UPDATE_SUCCESS = 'castor/posts/UPDATE_SUCCESS';
const UPDATE_FAIL = 'castor/posts/UPDATE_FAIL';
const FETCH = 'castor/posts/FETCH';
const FETCH_SUCCESS = 'castor/posts/FETCH_SUCCESS';
const FETCH_FAIL = 'castor/posts/FETCH_FAIL';
const NEW_POST = 'castor/posts/NEW_POST';

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
        deleted: {
          ...state.deleting,
          [action.id]: true
        }
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
    case PUBLISH:
      return {
        ...state,
        publishing: true
      };
    case PUBLISH_SUCCESS:
      return {
        ...state,
        publishing: false,
        published: true,
        publishedId: action.result.id
      };
    case PUBLISH_FAIL:
      return {
        ...state,
        publishing: false,
        published: false,
        publishError: action.error
      };
    case FETCH:
      return {
        ...state,
        fetching: true,
        currentPost: null,
        fetchError: null,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        currentPost: action.result
      };
    case FETCH_FAIL:
      return {
        ...state,
        fetching: false,
        fetchError: action.error
      };
    case UPDATE:
      return {
        ...state,
        updating: true,
        currentPost: null,
        updateError: null,
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        updating: false,
        currentPost: action.result
      };
    case UPDATE_FAIL:
      return {
        ...state,
        updating: false,
        updateError: action.error
      };
    case NEW_POST: 
      return {
      ...state,
      currentPost: null,
      published: false,
      publishedId: null
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
    promise: (client) => client.get('/post/load')
  };
}

export function deletePost(id) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    promise: (client) => client.del('/post', {
      data: {
        id: id
      }
    }),
    id
  };
}

export function initNewPost() {
  return {
    type: NEW_POST
  };
}

export function publish(post) {
  return {
    types: [PUBLISH, PUBLISH_SUCCESS, PUBLISH_FAIL],
    promise: (client) => client.post('/post', {
      data: {
        ...post
      }
    })
  };
}
export function update(post, id) {
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: (client) => client.put('/post/' + id, {
      data: {
        ...post
      }
    })
  };
}

export function fetch(id) {
  return {
    types: [FETCH, FETCH_SUCCESS, FETCH_FAIL],
    promise: (client) => client.get('/post/' + id)
  };
}

