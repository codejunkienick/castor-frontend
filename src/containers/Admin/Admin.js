import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { routeActions } from 'react-router-redux';
import Helmet from 'react-helmet';
import {
  LeftNav,
  MenuItem
} from 'material-ui';

const menuItems = [
  { route: '/admin/posts', text: 'Posts' },
  { route: '/admin/users', text: 'Users' },
  { route: '/admin/categories', text: 'Categories' },
  { route: '/admin/settings', text: 'Settings' },
];

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
      navWidth: 256
    };
  }

  _handleMenuItemTouchTap(i) {
    this.props.pushState(menuItems[i].route);
  }

  render() {
    const styles = require('./Admin.scss');
    const { user } = this.props;
    return (
      <div>
        <Helmet title="Админ Панель"/>
        <LeftNav
          width={this.state.width}
          open={this.state.open}
          >
          <div className={styles.navHeader}>
            <img src={user.avatar} />
            <span className={styles.userInfo}>
              {'@' + user.username}
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
          style={{
            paddingLeft: this.state.navWidth + 'px'
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
