import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {DashboardBar} from 'components';

export default class Users extends Component {
  render() {
    return (
      <div>
        <Helmet title="Админ Панель"/>
        <DashboardBar  title="Пользователи"/>
      </div>
    );
  }
}
