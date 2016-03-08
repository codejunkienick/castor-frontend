import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {loadPosts, isLoaded as isPostsLoaded} from 'redux/modules/posts';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isPostsLoaded(getState())) {
      promises.push(dispatch(loadPosts()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  (state) => {
    return {
      posts: state.posts.data,
      loading: state.posts.loading
    }
  },
  {loadPosts}
)
export default class Posts extends Component {
  static propTypes = {
    loadPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
  }
  constructor(props) {
    super(props);
    console.log(this.props); 
  } 

  render() {
    return (
      <div>
        <Helmet title="Записи"/>
        Posts
      </div>
    );
  }
}
