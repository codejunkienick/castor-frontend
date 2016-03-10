import React, {Component, PropTypes} from 'react';
import { Paper, IconMenu, IconButton, MenuItem, LinearProgress } from 'material-ui';
import { EditorModeEdit } from 'material-ui/lib/svg-icons';
import { connect } from 'react-redux';
import { deletePost } from 'redux/modules/posts';

@connect(
  (state) => { 
    return {
      deleting: state.posts.deleting  
    }
  },
  {deletePost}
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

  handleDeletePost() {
    const {deletePost, id} = this.props; 
    console.log(id);
    deletePost(id);
  }

  render() {
    const {id, title, date, body, author, deleting} = this.props;
    let {className} = this.props;

    const styles = require('./PostItem.scss');
    className += ' ';
    return (
      <div className={styles.postWrap}>
        <Paper>
           {(deleting && deleting[id]) && <LinearProgress mode="indeterminate" /> }
          <div className={styles.post} onClick={this.showBody.bind(this)}>
            <div className={styles.info}>
              <span className={styles.author}>@{author}</span>
              <span className={styles.title}>{title}</span>
              <span className={styles.date}>{ new Date(date).toLocaleString() }</span>
            </div>
            <div className={styles.actions}>
              <IconMenu
                iconButtonElement={<IconButton><EditorModeEdit /></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                <MenuItem primaryText="Edit" />
                <MenuItem onTouchTap={this.handleDeletePost.bind(this)} primaryText="Delete" />
              </IconMenu>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

