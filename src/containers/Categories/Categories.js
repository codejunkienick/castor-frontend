import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {DashboardBar} from 'components';

export default class Admin extends Component {
  render() {
    return (
      <div>
        <Helmet title="Админ Панель"/>
        <DashboardBar title="Категории"/>
      </div>
    );
  }
}
