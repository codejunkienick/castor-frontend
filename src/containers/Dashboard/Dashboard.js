import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Helmet title="Админ Панель"/>
        Успешный вход
      </div>
    );
  }
}
