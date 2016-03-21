import React, {Component, PropTypes} from 'react';
import {RefreshIndicator} from 'material-ui';

export default class LoadingSpinner extends Component {
  render() {
    const stu
    return (
    <div className={styles.fetchingProgressContainer}>
      <RefreshIndicator
        size={80}
        loadingColor={"#FF9800"}
        status="loading"
        style={{
          display: 'absolute',
          top: '50%',
          left: '45%',
        }}
      />
    </div>
    );
  }
}
