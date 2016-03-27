import React, {Component, PropTypes} from 'react';
import { Paper, IconMenu, IconButton, MenuItem, LinearProgress } from 'material-ui';
import { EditorModeEdit } from 'material-ui/lib/svg-icons';
import { connect } from 'react-redux';
import { deletePost } from 'redux/modules/posts';
import { push } from 'react-router-redux';

@connect(
  (state) => { 
    return {
      deleting: state.posts.deleting, 
      deleted: state.posts.deleted, 
    }
  },
  {deletePost, pushState: push}
)
export default class PostItem extends Component {
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

  showBody() {
    console.log(this.props.body);
  }

  handleDeletePost = () => {
    const {deletePost, id} = this.props; 
    deletePost(id);
  };

  handleEditPost = () => {
    const {id} = this.props;  
    this.props.pushState('/admin/post/' + id); 
  };

  render() {
    const {id, title, date, user, category, deleting, deleted} = this.props;
    let {className} = this.props;

    const styles = require('./PostItem.scss');
    className += ' ';
    return (
      (!(deleted && deleted[id]) &&
      <div className={styles.postWrap}>
        <Paper>
           {(deleting && deleting[id]) && <LinearProgress mode="indeterminate" /> }
          <div className={styles.post} onClick={this.showBody.bind(this)}>
            <div className={styles.info}>
              <span className={styles.author}>@{user.userName}</span>
              <span className={styles.title}>{title}</span>
              <span className={styles.date}>{ new Date(date).toLocaleString() }</span>
              <span className={styles.category}>опубликовано в {category.name}</span>
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
      )
    );
  }
}

