import React, {Component, PropTypes} from 'react';
import { Paper, IconMenu, IconButton, MenuItem, LinearProgress } from 'material-ui';
import { EditorModeEdit } from 'material-ui/lib/svg-icons';
import { connect } from 'react-redux';
import { remove } from 'redux/modules/categories';
import { routeActions } from 'react-router-redux';

@connect(
  (state) => { 
    return {
      deleting: state.categories.deleting  
    }
  },
  {remove, pushState: routeActions.push}
)
export default class CategoryItem extends Component {
  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.number.isRequired,
    remove: PropTypes.func.isRequired,
  }

  props = {
    className: ''
  }

  handleDelete = () => {
    const {remove, category} = this.props; 
    remove(category.categoryId);
  };

  handleEdit = () => {
    const {category} = this.props;  
    this.props.pushState('/admin/categories/' + category.categoryId); 
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
           {(deleting && deleting[category.id]) && <LinearProgress mode="indeterminate" /> }
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

