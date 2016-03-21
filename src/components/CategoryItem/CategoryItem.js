import React, {Component, PropTypes} from 'react';
import { Paper, IconMenu, IconButton, MenuItem, LinearProgress } from 'material-ui';
import { EditorModeEdit } from 'material-ui/lib/svg-icons';
import { connect } from 'react-redux';
import { deleteCategory } from 'redux/modules/categories';
import { routeActions } from 'react-router-redux';

@connect(
  (state) => { 
    return {
      deleting: state.categories.deleting  
    }
  },
  {deleteCategory, pushState: routeActions.push}
)
export default class CategoryItem extends Component {
  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.number.isRequired,
    deleteCategory: PropTypes.func.isRequired,
  }

  props = {
    className: ''
  }

  handleDelete = () => {
    const {deletePost, category} = this.props; 
    deletePost(category.categoryId);
  };

  handleEdit = () => {
    const {category} = this.props;  
    this.props.pushState('/admin/category/' + category.categoryId); 
  };

  render()  {
    const {category, deleting} = this.props;
    const {name, user} = category;
    let {className} = this.props;

    const styles = require('./CategoryItem.scss');
    className += ' ';
    return (
      <div className={styles.postWrap}>
        <Paper>
           {(deleting && deleting[id]) && <LinearProgress mode="indeterminate" /> }
          <div className={styles.post}>
            <div className={styles.info}>
              Создано&nbsp;
              <span className={styles.author}>@{user.userName}</span>
              <span className={styles.title}>{name}</span>
            </div>
            <div className={styles.actions}>
              <IconMenu
                iconButtonElement={<IconButton><EditorModeEdit /></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                <MenuItem onTouchTap={this.handleEdit} primaryText="Редактировать" />
                <MenuItem onTouchTap={this.handleDelete} primaryText="Удалить" />
              </IconMenu>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

