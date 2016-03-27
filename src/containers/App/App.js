import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { 
  isRestored as isAuthRestored,
  isLoaded as isAuthLoaded,
  load as loadAuth, 
  logout, 
  authenticate, 
  removeToken 
} from 'redux/modules/auth';
import { routeActions } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {load as loadFromStorage} from 'redux/create';
import {
  FlatButton,
  Dialog,
} from 'material-ui';
// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

@asyncConnect([{
  promise: async function(options) {
    const {store} = options;
    const promises = [];
    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    user: state.auth.user, 
    token: state.auth.token,
    error: state.auth.error,
    loaded: state.auth.loaded
  }),
  {logout, pushState: routeActions.push, authenticate, removeToken, loadAuth})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    token: PropTypes.string,
    logout: PropTypes.func.isRequired,
    authenticate: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }; 
    if (this.props.token) {
      this.props.authenticate(this.props.token);
      this.props.push('/admin');
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      console.log(nextProps.token);
      this.props.authenticate(nextProps.token);
      this.props.pushState('/admin');
    } else if (this.props.token && !nextProps.token) {
      console.log(nextProps);
      this.props.pushState('/');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
    this.props.removeToken();
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const {user, error} = this.props;
    const styles = require('./App.scss');
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        disabled={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <div className={styles.appContent}>
          {this.props.children}
        </div>
        <Dialog
          title="Возникла ошибка"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          {error}
        </Dialog>
      </div>
    );
  }
}
