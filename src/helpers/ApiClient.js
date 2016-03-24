import superagent from 'superagent';
import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (true) {
    // Prepend host and port of the API server to the path.
    //return 'http://' + config.apiHost + ':' + config.apiPort + '/api' + adjustedPath;
    return 'http://192.168.139.128:1929/api' + adjustedPath;
  }
  else {
    // Prepend `/api` to relative URL, to proxy to API server.
    return '/api' + adjustedPath;
  }
}

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class _ApiClient {
  constructor(req) {
    this.token = '';

    methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        console.log(formatUrl(path));
        const request = superagent[method](formatUrl(path));
        request.accept('application/json');

        if (params) {
          request.query(params);
        }

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (this.token) {
          request.set('Authorization', 'Bearer ' + this.token);
        }

        if (data) {
          request.set('Content-Type', 'application/json');
          request.send(JSON.stringify(data));
        }

        request.end(function(err, res) {
          if (err) {
            if (res) {
              reject(res.body);
            } else {
              reject(err);  
            }
          } else {
            resolve(res.body)
          }
        });
      }));

      this.auth = (newToken) => { 
        this.token = newToken;
      }
  }
}

const ApiClient = _ApiClient;

export default ApiClient;
