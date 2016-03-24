import React, {Component, PropTypes} from 'react';
import { Paper, IconMenu, IconButton, MenuItem, LinearProgress } from 'material-ui';
import { EditorModeEdit } from 'material-ui/lib/svg-icons';
import { connect } from 'react-redux';
import { deletePost } from 'redux/modules/posts';
import { routeActions } from 'react-router-redux';

@connect(
  (state) => { 
    return {
      deleting: state.users.deleting  
    }
  },
  {pushState: routeActions.push}
)
export default class UserItem extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    date: PropTypes.string,
    author: PropTypes.string,
    id: PropTypes.number.isRequired,
    deletePost: PropTypes.func.isRequired,
  }

  props = {
    className: ''
  }


  handleDelete = () => {
    const {user} = this.props; 
    delete(user.id);
  };

  handleEdit = () => {
    const {user} = this.props;  
    this.props.pushState('/admin/post/' + user.id); 
  };

  render() {
    const {id, userName, displayName} = this.props.user;
    const {deleting} = this.props;
    let {className} = this.props;

    const styles = require('./UserItem.scss');
    className += ' ';
    return (
      <div className={styles.postWrap}>
        <Paper>
           {(deleting && deleting[id]) && <LinearProgress mode="indeterminate" /> }
          <div className={styles.post}>
            <div className={styles.info}>
              <span className={styles.author}>@{userName}</span>
              {displayName && <span>{displayName}</span>}
            </div>
            <div className={styles.actions}>
              <IconMenu
                iconButtonElement={<IconButton><EditorModeEdit /></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                <MenuItem onTouchTap={this.handleEditPost} primaryText="Редактировать" />
                <MenuItem onTouchTap={this.handleDeletePost} primaryText="Удалить" />
              </IconMenu>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

