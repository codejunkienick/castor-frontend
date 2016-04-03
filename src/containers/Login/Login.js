import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {
  TextField,
  RaisedButton,
  Paper
} from 'material-ui';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({user: state.auth.user}),
  authActions)
export default class Login extends Component {
  static propTypes = {
    login: PropTypes.func,
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const usernameInput = this.refs.username;
    const passwordInput = this.refs.password;
    this.props.login(usernameInput.getValue(), passwordInput.getValue());
    usernameInput.value = '';
    passwordInput.value = '';
  }

  render() {
    const {user, logout} = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage}>
        <Helmet title="Login"/>
        <Paper>
          <div className={styles.align}>
            <h3>Войти</h3>
            <div>
              <form className="" onSubmit={this.handleSubmit.bind(this)}>
                <div className={styles.loginRow}>
                  <TextField
                    ref="username"
                    hintText="Login"
                    floatingLabelText="Login"
                    type="text"
                    defaultValue="admin"
                  />
                </div>
                <div className={styles.loginRow}>
                  <TextField
                    ref="password"
                    hintText="Пароль"
                    floatingLabelText="Пароль"
                    type="password"
                    defaultValue="AdminPass_007"
                  />
                </div>
                <div>
                  <RaisedButton label="Войти" onClick={this.handleSubmit.bind(this)} />
                </div>
              </form>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}
