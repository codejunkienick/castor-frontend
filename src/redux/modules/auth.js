import { LOAD as LOAD_FROM_STORAGE, SAVE } from 'redux-storage';
const LOAD = 'castor/auth/LOAD';
const LOAD_SUCCESS = 'castor/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'castor/auth/LOAD_FAIL';
const LOGIN = 'castor/auth/LOGIN';
const LOGIN_SUCCESS = 'castor/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'castor/auth/LOGIN_FAIL';
const LOGOUT = 'castor/auth/LOGOUT';
const LOGOUT_SUCCESS = 'castor/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'castor/auth/LOGOUT_FAIL';
const AUTHENTICATE_REQUEST = 'castor/auth/AUTHENTICATE_REQUEST';
const REMOVE_TOKEN = 'castor/auth/REMOVE_TOKEN';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_FROM_STORAGE: 
      return {
        token: action.payload.auth.token,
        tokenExpires: action.payload.auth.token,
        restored: true,
      };
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
        token: action.result.token,
        user: action.result.user,
        tokenExpires: Date.parse(action.result.tokenExpires)
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        token: action.result.token,
        user: action.result.user,
        tokenExpires: Date.parse(action.result.tokenExpires)
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        token: null,
        tokenExpires: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}
export function isRestored(globalState) {
  return globalState.auth && globalState.auth.restored;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/token')
  };
}

export function login(name, password) {
  console.log(name + " " + password);
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/token', {
      data: {
        username: name,
        password: password
      }
    })
  };
}

export function authenticate(token) {
  return {
    type: [AUTHENTICATE_REQUEST],
    auth: (client) => client.auth(token)
  };
}

export function removeToken() {
  return {
    type: [REMOVE_TOKEN],
    auth: (client) => client.auth('')
  };
}

// export function logout() {
//   return {
//     types: [logout, logout_success, logout_fail],
//     promise: (client) => client.get('/user/logout')
//   };
// }

export function logout() {
  return {
    type: LOGOUT_SUCCESS,
    auth: (client) => client.auth('')
  };
}
