import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {DashboardBar} from 'components';
import {update} from 'redux/modules/info';
import {
  TextField,
  RaisedButton,
  Paper,
} from 'material-ui';

@connect(
  state => {
    return {
      user: state.auth.user,
      blog: state.info.blog
    };
  },
  {
    update
  }
)
export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.blog.name,
      titleErr: null
    };
    this.titleStateChange = event => this.setState({title: event.target.value});
  }
  onSubmit() {
    const {update, blog} = this.props; 
    update({name: this.state.title}, blog.blogId);
  }  
  render() {
    const {title, titleErr} = this.state;
    return (
      <div>
        <Helmet title="Админ Панель"/>
        <DashboardBar toggleNav={this.props.toggleNav} title="Настройки"/>
        <div style={{margin: '10px'}}>
          <Paper style={{padding: '10px'}}>
            <TextField
              value={title}
              onChange={this.titleStateChange}
              errorText={titleErr}
              hintText="Название новостной подсистемы"
              floatingLabelText="Название новостной подсистемы"
              style={{
                margin: '0 8px 0 0'
              }}
              />
              <RaisedButton onTouchTap={this.onSubmit.bind(this)} label="Обновить"/>
            </Paper>
        </div>
      </div>
    );
  }
}
