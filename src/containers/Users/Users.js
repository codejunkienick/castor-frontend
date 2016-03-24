import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {UserItem, DashboardBar, LoadingSpinner} from 'components';
import {
  FloatingActionButton,
  MenuItem,
  IconButton,
  FlatButton,
  Dialog,
  TextField
} from 'material-ui';
import {load, add, remove, dismissError, update} from 'redux/modules/users';
import {connect} from 'react-redux';
import {routeActions} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

@connect(
  state => {
    return {
      users: state.users.data,
      loading: state.users.loading,
      loaded: state.users.loaded,
      adding: state.users.adding,
      error: state.users.error,
      blog: state.info.blog,
      user: state.auth.user
    }
  },
  dispatch => bindActionCreators({
    pushState: routeActions.push,
    load,
    add,
    dismissError
  }, dispatch),
)
export default class Categories extends Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
  }
  constructor(props) {
    super(props);
    this.props.load();
  } 

  componentWillReceiveProps(nextProps) {
  }

  render() {
    const {pushState, categories, loaded, loading, adding, error, users} = this.props;
    return (
      <div>
        <Helmet title="Админ Панель"/>
        <DashboardBar title="Пользователи"/>
        {(loading) && <LoadingSpinner />}
        {(loaded && !loading) && 
         users.map((user, index) => {
            return <UserItem user={user} key={index}/>;
          })
        } 
      </div>
    );
  }
}
