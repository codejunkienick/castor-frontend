const LOAD = 'castor/categories/LOAD';
const LOAD_SUCCESS = 'castor/categories/LOAD_SUCCESS';
const LOAD_FAIL = 'castor/categories/LOAD_FAIL';
const DELETE = 'castor/categories/DELETE';
const DELETE_SUCCESS = 'castor/categories/DELETE_SUCCESS';
const DELETE_FAIL = 'castor/categories/DELETE_FAIL';
const ADD = 'castor/categories/ADD';
const ADD_SUCCESS = 'castor/categories/ADD_SUCCESS';
const ADD_FAIL = 'castor/categories/ADD_FAIL';
const UPDATE = 'castor/categories/UPDATE';
const UPDATE_SUCCESS = 'castor/categories/UPDATE_SUCCESS';
const UPDATE_FAIL = 'castor/categories/UPDATE_FAIL';
const FETCH = 'castor/categories/FETCH';
const FETCH_SUCCESS = 'castor/categories/FETCH_SUCCESS';
const FETCH_FAIL = 'castor/categories/FETCH_FAIL';
const DISMISS_ERROR = 'castor/categories/DISMISS_ERROR';

const initialState = {
  loaded: false
};

export default function categories(state = initialState, action = {}) {
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
        loaded: false
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
    case ADD:
      return {
        ...state,
        adding: true
      };
    case ADD_SUCCESS:
      return {
        ...state,
        adding: false,
        loaded: false,
      };
    case ADD_FAIL:
      return {
        ...state,
        adding: false,
        addError: action.error
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
    case DISMISS_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}

export function dismissError() {
  return {
    type: DISMISS_ERROR
  }
}

export function isLoaded(globalState) {
  return globalState.categories && globalState.categories.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/category/load')
  };
}

export function remove(id) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    promise: (client) => client.del('/category/' + id),
    id
  };
}

export function add(category) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAIL],
    promise: (client) => client.post('/category', {
      data: {
        ...category
      }
    }),
    category
  };
}

export function update(category, id) {
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: (client) => client.put('/category/' + id, {
      data: {
        ...category
      }
    }),
    id
  };
}

export function fetch(id) {
  return {
    types: [FETCH, FETCH_SUCCESS, FETCH_FAIL],
    promise: (client) => client.get('/category/' + id)
  };
}

