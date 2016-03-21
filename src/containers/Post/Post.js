import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {DashboardBar, Editor, LoadingSpinner} from 'components';
import {publish, fetch, update, initNewPost} from 'redux/modules/posts';
import { routeActions } from 'react-router-redux';
import {load as loadCategories} from 'redux/modules/categories';
import {EditorState, convertToRaw, ContentState, convertFromRaw} from 'draft-js';
import {required} from 'utils/validation';
import {
  Paper,
  TextField,
  DatePicker,
  TimePicker,
  RaisedButton,
  Snackbar,
  RefreshIndicator,
  DropDownMenu,
  MenuItem
} from 'material-ui';
import _ from 'lodash';
import areIntlLocalesSupported from 'intl-locales-supported';

let DateTimeFormat;

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
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
      user: state.auth.user,
      published: state.posts.published,
      publishing: state.posts.publishing,
      publishedId: state.posts.publishedId,
      post: state.posts.currentPost,
      fetching: state.posts.fetching,
      fetchError: state.posts.fetchError,
      updating: state.posts.updating,
      categoriesLoading: state.categories.loading,
      categories: state.categories.data,
      blog: state.info.blog
    };
  },
  {
    loadCategories,
    publish,
    fetch,
    update,
    initNewPost,
    pushState: routeActions.push
  }
)
export default class Post extends Component {
  constructor(props) {
    super(props);
    const { postID } = this.props.params;
    const contentAdd = {
      title: 'Создание записи',
      submitLabel: 'Опубликовать'
    };
    const contentUpdate = {
      title: 'Редактирование записи',
      submitLabel: 'Обновить'
    };
    this.state = {
      strings: (postID) ? contentUpdate : contentAdd,
      editorState: EditorState.createEmpty(),
      title: '',
      date: new Date(),
      time: new Date(),
      titleErr: null,
      dateErr: null,
      timeErr: null,
      openBar: false,
      categoryId: 0,
    };

    this.loadData();
    //Handle forms
    this.editorStateChange = event => this.setState({editorState: event});
    this.categoryStateChange = (event, index, value) => this.setState({categoryId: value});
    this.titleStateChange = event => this.setState({title: event.target.value});
    this.dateStateChange = (event, date) => this.setState({date: date});
    this.timeStateChange = event => this.setState({time: new Date(event.target.value)});
  }
  
  loadData() {
    const { postID } = this.props.params;
    const {initNewPost, loadCategories, fetch} = this.props;
    if (postID) {
      fetch(postID);
    } else {
      initNewPost();
    }

    loadCategories();
  }

  onSubmit = (event) => {
    const { title, date, time, editorState, categoryId } = this.state; 
    const { publish, update, user, blog } = this.props;
    const formatDate = (date, time) => {
      const day = (date.getDate() < 10) ? '0' + date.getDate().toString() : date.getDate();        // yields day
      console.log(date.getMonth());
      const month = (date.getMonth() < 10) ? '0' + (date.getMonth() + 1).toString() : date.getMonth();        // yields day
      const year = date.getFullYear();  // yields year
      const hour = (date.getHours() < 10) ? '0' + date.getHours().toString() : date.getHours();        // yields day
      const minute = (date.getMinutes() < 10) ? '0' + date.getMinutes().toString() : date.getMinutes();        // yields day
      const second = (date.getSeconds() < 10) ? '0' + date.getSeconds().toString() : date.getSeconds();        // yields day
      const convertedTime = day + "/" + month + "/" + year + " " + hour + ':' + minute + ':' + second; 
      console.log(month);
      return convertedTime;
    }
    const { postID } = this.props.params;
    const errors = {
      titleErr: required(title)
    }
    console.log(errors);
    if (errors.titleErr) {
      this.setState({...errors});  
    } else {
      const post = {
        title, 
        date: formatDate(date, time), 
        userId: user.id, 
        content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        blogId: blog.blogId,
        categoryId,
        rawContent: editorState.getCurrentContent().getPlainText()
      };

      if (postID === null || postID === undefined) {
        console.log('posting new post');
        publish(post)
      } else {
        console.log('updating post');
        update(post, postID);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { published, post, fetchError, publishedId, categories } = nextProps;
    const { postID } = this.props.params;
    const parseContent = content => {
      try {
        const parsed = JSON.parse(content);
        return EditorState.createWithContent(ContentState.createFromBlockArray(convertFromRaw(parsed))) 
      } catch (err) {
        console.log(err);
        return EditorState.createWithContent(ContentState.createFromText(content)) 
      }
    }
    
    if (postID && fetchError) {
      console.log(fetchError);
      this.props.push('/admin');
    }

    if (published && postID != publishedId) {
      this.setState({openBar: true});
      this.props.push('/admin/post/' + publishedId);
    }
    if (post) {
      this.setState({
        ...post, 
        date: new Date(post.date),
        time: new Date(post.date),
        editorState: parseContent(post.content),
        categoryId: post.categoryId
      });
    }
    if (categories) {
      this.setState({categoryId: categories[0].categoryId});
    }
  }

  handleRequestClose = () => {
    this.setState({
      openBar: false,
    });
  };

  render() {
    const styles = require('./Post.scss');
    const {
      title,
      titleErr,
      date,
      time,
      editorState,
      strings
    } = this.state;
    const {
      updating,
      fetching,
      publishing,
      categories,
      categoriesLoading
    } = this.props;
    return (
      <div>
        <Helmet title={strings.title}/>
        <DashboardBar toggleNav={this.props.toggleNav} title={strings.title}/>
        { (fetching || updating || categoriesLoading) && <LoadingSpinner />}
        <div className={styles.postContainer}>
          <span className={styles.postBodyHeader}>
            {strings.title}
          </span>
          <Paper>
            <div className={styles.postFields}>
              
              <div className={styles.postRow}>
                <div style={{
                  flex: '0.5',
                  display: 'flex',
                  alignItems: 'flex-end'
                }}>
                  <TextField
                    value={title}
                    onChange={this.titleStateChange}
                    errorText={titleErr}
                    hintText="Заголовок"
                    floatingLabelText="Заголовок"
                    style={{
                      width: '100%',
                      margin: '0 8px 0 0'
                    }}
                    />
                </div>
                <div style={{
                  flex: '0.5',
                  display: 'flex',
                  alignItems: 'flex-end'
                }}>
                  <DatePicker
                    value={date}
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
                  <TimePicker
                    value={time}
                    onChange={this.timeStateChange}
                    style={{margin: '0 8px 0 0'}}
                    format="24hr"
                    hintText="Время"
                    floatingLabelText="Время"
                    wordings={{ok: 'OK', cancel: 'Отмена'}}
                    locale="ru"
                  />

                <DropDownMenu value={this.state.categoryId} onChange={this.categoryStateChange}>
                  {(categories) && 
                    categories.map(
                      (category, idx) => {
                        return <MenuItem value={category.categoryId} key={idx} primaryText={category.name} /> 
                      } 
                    )
                  }
                </DropDownMenu>
                </div>
              </div>

            </div>
          </Paper>

          <div className={styles.postBody}>
            <span className={styles.postBodyHeader}>
              Текст записи
            </span>
            <Paper>
              <Editor
                editorState={editorState}
                onChange={this.editorStateChange}
              />
            </Paper>
          </div>

          <div>
            <RaisedButton onTouchTap={this.onSubmit} label={strings.submitLabel}/>
            { publishing &&
              <RefreshIndicator
                size={30}
                loadingColor={"#FF9800"}
                status="loading"
                style={{
                  display: 'inline-block',
                  position: 'relative',
                  top: 0,
                  left: 0,
                  margin: '0px 5px 4px 13px',
                  verticalAlign: 'middle',
                }}
              />
            }
          </div>

        </div>
        <Snackbar
          open={this.state.openBar}
          message="Запись опубликована"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}
