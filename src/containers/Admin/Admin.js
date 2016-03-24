import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { routeActions } from 'react-router-redux';
import Helmet from 'react-helmet';
import {
  Avatar,
  LeftNav,
  MenuItem
} from 'material-ui';
import { asyncConnect } from 'redux-async-connect';
import { load as loadInfo, isLoaded as isInfoLoaded } from 'redux/modules/info';

const menuItems = [
  { route: '/admin/posts', text: 'Новостные записи' },
  { route: '/admin/users', text: 'Пользователи' },
  { route: '/admin/categories', text: 'Категории' },
  { route: '/admin/settings', text: 'Настройки' },
];

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  (state) => { 
    return {
      user: state.auth.user
    }
  },
  {pushState: routeActions.push}
)
export default class Admin extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      navWidth: 256,
    };
  }

  _handleMenuItemTouchTap(i) {
    this.props.pushState(menuItems[i].route);
  }

  toggleNav() {
    console.log(this.state);
    this.setState({
      open: !this.state.open,
      navWidth: (this.state.open) ? 0 : 256
    })
  }

  _renderAvatar(avatar, username) {
    if (avatar) {
      return (
          <img src={avatar} />
      );
    } else {
      return (
        <Avatar
          >
          {username && username.substring(0,1)}
        </Avatar>
      );
    } 
  }

  render() {
    const styles = require('./Admin.scss');
    const { user } = this.props;
    return (
      <div className={styles.adminPanel}>
        <Helmet title="Админ Панель"/>
        <LeftNav
          width={this.state.width}
          open={this.state.open}
          >
          <div className={styles.navHeader}>
            {this._renderAvatar(user.avatar, user.userName)}
            <span className={styles.userInfo}>
              {'@' + user.userName}
              <br />
              {user.displayName}
            </span>
          </div>
            {menuItems.map(function(item, i) {
              return (
                <MenuItem index={i} value={item.route} onTouchTap={this._handleMenuItemTouchTap.bind(this, i)}>{item.text}</MenuItem>
                );
            }, this) }
        </LeftNav>

        <div
          className={styles.adminContent}
          style={{
            paddingLeft: this.state.navWidth + 'px',
          }}
        >
          {this.props.children && React.cloneElement(this.props.children, {
            toggleNav: this.toggleNav.bind(this)
          })}
        </div>
      </div>
    );
  }
}
