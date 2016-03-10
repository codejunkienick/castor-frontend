import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {DashboardBar, Editor} from 'components';

export default class Post extends Component {
  render() {
    return (
      <div>
        <Helmet title="Создание записи"/>
        <DashboardBar toggleNav={this.props.toggleNav} title="Создание записи"/>
        <div>
          <Editor container="editable" />
        </div>
      </div>
    );
  }
}
