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
        user: action.result.user
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        user: null,
        token: null,
        error: action.error.message
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
        user: action.result,
        token: action.result.token
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error.message
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null,
        token: null
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

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/user/logout')
  };
}
