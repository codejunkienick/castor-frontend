import React, {Component, PropTypes} from 'react';
import {asyncConnect} from 'redux-async-connect';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Helmet from 'react-helmet';
import {search, load as loadPosts, isLoaded as isPostsLoaded} from 'redux/modules/posts';
import {
  FloatingActionButton, 
  MenuItem, 
  IconButton, 
  RaisedButton,
  Dialog,
  FlatButton,
  DropDownMenu,
  DatePicker,
  TextField,
} from 'material-ui';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import SearchIcon from 'material-ui/lib/svg-icons/action/search';
import {PostItem, DashboardBar, LoadingSpinner} from 'components';
import areIntlLocalesSupported from 'intl-locales-supported';

let DateTimeFormat;
if (areIntlLocalesSupported(['ru'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/ru');
}

@connect(
  state => {
    return {
      posts: state.posts.data,
      loading: state.posts.loading,
      loaded: state.posts.loaded,
      categories: state.categories.data,
    }
  },
  dispatch => bindActionCreators({
    pushState: push,
    loadPosts,
    search
  }, dispatch),
)
export default class Posts extends Component {
  static propTypes = {
    loadPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: 'Записи',
      openSearch: false,
      search: {
        content: null,
        category: null,
        title: null,
      }
    };
    this.props.loadPosts();
    this.handleCategorySearch = (event, index, value) => this.setState({
        search: {
          ...this.state.search,
          category: value
        }
      }
    );
    this.dateStateChange = (event, date) => this.setState({date: date});
  } 
  
  handleSearch = (field) => {
    return (event) => this.setState({search: {
      ...this.state.search,
      [field]: event.target.value 
    }});
  }

  handleSearchButton = () => {
    this.setState({openSearch: true});
  }

  handleCancel = () => {
    this.setState({openSearch: false});
  }

  handleClose = () => {
    const {user, search} = this.props;
    this.setState({openSearch: false, pageTitle: 'Результаты поиска'});
    search({
      ...this.state.search,
      fromDate: Date.parse(this.state.fromDate).toISOString()     
    });
  };

  render() {
    const {
      pushState, 
      posts, 
      loaded, 
      loading,
      categories
    } = this.props;
    const {search} = this.state;
    const styles = require('./Posts.scss');
    const actions = [
      <FlatButton
        label="Отмена"
        secondary={true}
        onTouchTap={this.handleCancel}
        />,
        <FlatButton
          label="Поиск"
          primary={true}
          keyboardFocused={true}
          onTouchTap={this.handleClose}
          />,
      ];
    return (
      <div>
        <Helmet title="Записи"/>
        <DashboardBar toggleNav={this.props.toggleNav} title={this.state.pageTitle}/>
        <div className={styles.searchBtn}>
          <RaisedButton
            label="Поиск"
            linkButton={true}
            secondary={true}
            style={styles.button}
            onTouchTap={this.handleSearchButton}
            icon={<SearchIcon />}
          />
        </div>

        {loading && <LoadingSpinner />}
        {(loaded && !loading && posts.length > 0) &&
          posts.map((post, index) => {
            return <PostItem {...post} key={index} id={post.id} />;
          })
        } 
        {(loaded && !loading && posts.length === 0) &&
          <div style={{textAlign: 'center', fontSize: 20}}>
            Записей не найдено
          </div>
        } 

        
        <FloatingActionButton 
        onTouchTap={() => {
          pushState('/admin/post'); 
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
          title={"Поиск по записям"}
          actions={actions}
          modal={false}
          open={this.state.openSearch}
          onRequestClose={this.handleClose}
        >
          <div>
            <div>
            <TextField
              onChange={this.handleSearch('title')}
              value={search.title}
              hintText="Поиск по заголовку"
              floatingLabelText="Поиск по заголовку"
              />
            </div>
            <div>
              Категория
              <DropDownMenu 
                style={{minWidth: '50px'}} 
                onChange={this.handleCategorySearch}
                value={search.category}
                >
                <MenuItem value={null} primaryText="Любая категория" />
                {(categories) && 
                  categories.map(
                    (category, idx) => {
                      return <MenuItem value={category.categoryId} key={idx} primaryText={category.name} /> 
                    } 
                  )
                }
              </DropDownMenu>
            </div>
            <div>
              <TextField
                onChange={this.handleSearch('content')}
                hintText="Поиск по тексту"
                value={search.content}
                floatingLabelText="Поиск по тексту"
                multiLine={true}
                rows={3}
                style={{width: '100%'}}
                />
            </div>
            <div>
              Записи от
              <DatePicker
                value={search.fromDate}
                onChange={this.dateStateChange}
                style={{margin: '0 8px 0 0'}}
                hintText="Дата" 
                floatingLabelText="Дата" 
                mode="landscape" 
                wordings={{ok: 'OK', cancel: 'Отмена'}}
                firstDayOfWeek={1}
                DateTimeFormat={DateTimeFormat}
                locale="ru"
              />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
