import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';

export default class Admin extends Component {
  render() {
    return (
      <div>
        <Helmet title="Админ Панель"/>
        Welcome to dashboard
      </div>
    );
  }
}
