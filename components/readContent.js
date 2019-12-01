import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import styles from '../styles';

import { connect } from 'react-redux';

class ReadContent extends React.Component {
  render() {
    return (<WebView
source={{ html: `<html>
                    <head>
                    <style> ${this.props.currentContent.css} </style>
                    </head>
                    ${this.props.currentContent.html}
                  </html>`}}
    style={{
      flex: 1,
    }} />);
  }
}

  const mapState = state => ({
    currentContent: state.currentContent
  })

  export default connect(mapState)(ReadContent);
