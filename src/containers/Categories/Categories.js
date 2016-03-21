import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {CategoryItem, DashboardBar, LoadingSpinner} from 'components';
import {
  FloatingActionButton,
  MenuItem,
  IconButton,
  FlatButton,
  Dialog,
  TextField
} from 'material-ui';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import {load, add, remove} from 'redux/modules/categories';
import {connect} from 'react-redux';
import {routeActions} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

@connect(
  state => {
    return {
      categories: state.categories.data,
      loading: state.categories.loading,
      loaded: state.categories.loaded,
      adding: state.categories.adding,
      blog: state.info.blog,
      user: state.auth.user
    }
  },
  dispatch => bindActionCreators({
    pushState: routeActions.push,
    load,
    add
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
    const {categoryId} = this.props.params;
    this.state = {
      open: false,
      newCategory: (categoryId) ? _.find(this.props.categories, (cat) => { return cat.categoryId === categoryId }) : '',
    };
    this.props.load();
  } 

  componentWillReceiveProps(nextProps) {
    const {added, load, loaded, loading} = this.props;
    if (!nextProps.loaded && !nextProps.loading && !loading) {
      load(); 
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    const {add, user, blog} = this.props;
    const {newCategory} = this.state;
    this.setState({open: false});
    add({name: newCategory, blogId: blog.blogId});
  };
  handleCategory = (event) => {
    this.setState({newCategory: event.target.value});
  }
  render() {
    const {pushState, categories, loaded, loading, adding} = this.props;
    const {newCategory, categoryErr} = this.state;
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose}
        />,
        <FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}
          onTouchTap={this.handleClose}
          />,
      ];
    return (
      <div>
        <Helmet title="Админ Панель"/>
        <DashboardBar title="Категории"/>
        {(loading || adding) && <LoadingSpinner />}
        {(loaded && !loading) && 
         categories.map((category, index) => {
            return <CategoryItem category={category} key={index}/>;
          })
        } 
        <FloatingActionButton 
        onTouchTap={() => {
          this.setState({open: true});
        }}  
        style={{
          position: 'fixed',
          right: 50,
          bottom: 30,
          zIndex: '99999',
        }}>
          <ContentAdd />
        </FloatingActionButton>

        <Dialog
          title="Добавить категорию"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            value={newCategory}
            onChange={this.handleCategory}
            errorText={categoryErr}
            hintText="Введите название категории"
            floatingLabelText="Категория"
            style={{
              width: '100%',
            }}
            />
        </Dialog>
      </div>
    );
  }
}
