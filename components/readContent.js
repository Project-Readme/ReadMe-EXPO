import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import styles from '../styles';

import { connect } from 'react-redux';

class ReadContent extends React.Component {
  render() {
    return (
      <WebView
        source={{ html: this.props.currentContent.html }}
        style={{
          flex: 1,
        }}
      />
    );
  }
}

mapState = state => ({
  currentContent: state.contentList[1],
});

export default connect(mapState)(ReadContent);
