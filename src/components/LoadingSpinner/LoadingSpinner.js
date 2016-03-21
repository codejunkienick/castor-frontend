import React, {Component, PropTypes} from 'react';
import {RefreshIndicator} from 'material-ui';

const style = {
  indicator: {
    display: 'absolute',
    top: '20%',
    left: '40%',
  },
  fetchingProgressContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(236,239,241, 0.7)',
    zIndex: 100,
  }
}
export default class LoadingSpinner extends Component {
  render() {
    return (
      <div style={style.fetchingProgressContainer}>
        <RefreshIndicator
          size={80}
          loadingColor={"#FF9800"}
          status="loading"
          style={style.indicator}
          />
        </div>
    );
  }
}
