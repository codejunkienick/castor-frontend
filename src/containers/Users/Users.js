import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';

export default class Users extends Component {
  render() {
    return (
      <div>
        <Helmet title="Админ Панель"/>
        Welcome to users
      </div>
    );
  }
}
