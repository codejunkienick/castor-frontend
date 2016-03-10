import React, {Component, PropTypes} from 'react';
import { asyncConnect } from 'redux-async-connect';
import { routeActions } from 'react-router-redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Helmet from 'react-helmet';
import {load as loadPosts, isLoaded as isPostsLoaded} from 'redux/modules/posts';
import { FloatingActionButton, AppBar, IconMenu, MenuItem, IconButton, Paper } from 'material-ui';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import { PostItem, DashboardBar } from 'components';

@connect(
  state => {
    return {
      posts: state.posts.data,
      loading: state.posts.loading,
      loaded: state.posts.loaded
    }
  },
  dispatch => bindActionCreators({
    pushState: routeActions.push,
    loadPosts
  }, dispatch),
)
export default class Posts extends Component {
  static propTypes = {
    loadPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired
  }
  constructor(props) {
    super(props);
    this.props.loadPosts();
  } 

  render() {
    const {pushState, posts, loaded, loading } = this.props;
    return (
      <div>
        <Helmet title="Записи"/>
        <DashboardBar toggleNav={this.props.toggleNav} title="Записи"/>
        {(loaded && !loading) && 
          posts.map((post, index) => {
            return <PostItem {...post} id={index} />;
          })
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
      </div>
    );
  }
}
