import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {FloatingActionButton, AppBar, IconMenu, MenuItem, IconButton, Paper} from 'material-ui';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuIcon from 'material-ui/lib/svg-icons/navigation/menu';
import {logout} from 'redux/modules/auth';


@connect(
  (state) => {
    return {}
  },
  {logout}
)
export default class DashboardBar extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    toggleNav: PropTypes.func.isRequired
  }
  
  handleLogout = () => {this.props.logout()}

  render() {
    const {title} = this.props; // eslint-disable-line no-shadow
    return (
      <AppBar
        title={title}
        iconElementLeft={<IconButton onClick={this.props.toggleNav}><MenuIcon /></IconButton>}
        iconElementRight={
          <IconMenu
            iconButtonElement={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem onTouchTap={this.handleLogout} primaryText="Выйти" />
          </IconMenu>
        }
        style={{
          width: '100%',
        }}
      />
    );
  }
}
