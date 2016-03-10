import React, {Component, PropTypes} from 'react';
import { FloatingActionButton, AppBar, IconMenu, MenuItem, IconButton, Paper } from 'material-ui';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuIcon from 'material-ui/lib/svg-icons/navigation/menu';

export default class DashboardBar extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    toggleNav: PropTypes.func.isRequired
  }

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
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Help" />
              <MenuItem primaryText="Sign out" />
            </IconMenu>
          }
          style={{
            width: '100%',
          }}
        />
    );
  }
}
