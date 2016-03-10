import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {DashboardBar} from 'components';

export default class Settings extends Component {
  render() {
    return (
      <div>
        <Helmet title="Админ Панель"/>
        <DashboardBar toggleNav={this.props.toggleNav} title="Настройки"/>
      </div>
    );
  }
}
