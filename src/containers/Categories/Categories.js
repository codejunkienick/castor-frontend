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
import {load, add, remove, dismissError, update} from 'redux/modules/categories';
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
      error: state.categories.error,
      blog: state.info.blog,
      user: state.auth.user
    }
  },
  dispatch => bindActionCreators({
    pushState: routeActions.push,
    load,
    add,
    dismissError
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
    console.log("constr " + categoryId);
    this.state = {
      open: (categoryId) ? true : false,
      openError: false,
      newCategory: (categoryId) ? _.find(this.props.categories, { 'categoryId': categoryId }) : '',
    };
    this.props.load();
  } 

  componentWillReceiveProps(nextProps) {
    const {categoryId} = this.props.params;
    if (categoryId) {
      const res = _.find(this.props.categories, { 'categoryId': parseInt(categoryId) });
      this.setState(
      {
        open: true,
        newCategory:  res.name,
      });
    }
    if (nextProps.error) {
      console.log(nextProps.error);
      this.setState({openError: true});
    }
    
    const {added, load, loaded, loading} = this.props;
    if (!nextProps.loaded && !nextProps.loading && !loading) {
      load(); 
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  };
  handleCancel = () => {
    this.setState({open: false});
    this.props.pushState("/admin/categories");
  }

  handleClose = () => {
    const {add, user, blog, update} = this.props;
    const {newCategory} = this.state;
    const {categoryId} = this.props.params;
    this.setState({open: false, newCategory: ''});
    this.props.pushState("/admin/categories");
    if (categoryId) {
      update({name: newCategory, blogId: blog.blogId}, categoryId);
    } else {
      add({name: newCategory, blogId: blog.blogId});
    }
  };
  handleCategory = (event) => {
    this.setState({newCategory: event.target.value});
  }
  handleCloseError = () => {
    this.props.dismissError();
    this.setState({openError: false});
  }
  render() {
    const {pushState, categories, loaded, loading, adding, error} = this.props;
    const {categoryId} = this.props.params;
    const {newCategory, categoryErr} = this.state;
    const errActions = [
      <FlatButton
        label="Закрыть"
        primary={true}
        onTouchTap={this.handleCloseError}
        />,
      ];
    const actions = [
      <FlatButton
        label="Отмена"
        secondary={true}
        onTouchTap={this.handleCancel}
        />,
        <FlatButton
          label="Добавить"
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
          title="Ошибка"
          actions={errActions}
          modal={false}
          open={this.state.openError}
          onRequestClose={this.handleCloseError}
        >
        {error && error.message}
      </Dialog>

        <Dialog
          title={(!categoryId) ? "Добавить категорию" : "Обновить категорию"}
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
