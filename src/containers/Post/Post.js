import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {DashboardBar, Editor} from 'components';
import {
  Paper,
  TextField,
  DatePicker,
  TimePicker,
  RaisedButton
} from 'material-ui';
import {publish} from 'redux/modules/posts';
import {EditorState, convertToRaw} from 'draft-js';
import {required} from 'utils/validation';

@connect(
  state => {
    return {
      user: state.auth.user
    };
  },
  {publish}
)
export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      title: '',
      date: new Date(),
      time: new Date(),
      titleErr: null,
      dateErr: null,
      timeErr: null,
    
    };
    this.editorStateChange = event => {
      this.setState({editorState: event})
    };
    this.titleStateChange = event => {
      console.log(event.target.value);
      this.setState({title: event.target.value});
    };
    this.dateStateChange = event => {
      this.setState({date: new Date(event.target.value)});
    };

    this.timeStateChange = event => {
      this.setState({time: new Date(event.target.value)});
    };

    this.onSubmit = event => {
      const { title, date, time, editorState } = this.state; 
      const { publish, user } = this.props;

      const errors = {
        titleErr: required(title)
      }
      console.log(errors);
      if (errors.titleErr) {
        this.setState({...errors});  
      } else {
        publish({
          title, date, time, author: user.username, body: convertToRaw(editorState.getCurrentContent())
        }) 
      }
    }
  }
  render() {
    const styles = require('./Post.scss');
    const {
      title,
      titleErr,
      date,
      time,
      editorState
    } = this.state;
    return (
      <div>
        <Helmet title="Создание записи"/>
        <DashboardBar toggleNav={this.props.toggleNav} title="Создание записи"/>
        <div className={styles.postContainer}>
          <span className={styles.postBodyHeader}>
            Новая запись
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

          <RaisedButton onTouchTap={this.onSubmit} label="Опубликовать"/>

        </div>
      </div>
    );
  }
}
