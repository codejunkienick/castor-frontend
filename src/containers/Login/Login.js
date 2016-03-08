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
    const input = this.refs.username;
    this.props.login(input.getValue());
    input.value = '';
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
                    hintText="Username"
                    floatingLabelText="Username"
                    type="text"
                  />
                </div>
                <div className={styles.loginRow}>
                  <TextField
                    ref="password"
                    hintText="Password"
                    floatingLabelText="Password"
                    type="password"
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
