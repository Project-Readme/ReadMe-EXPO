import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  topBar: {
    padding: 5,
    paddingTop: 15,
    backgroundColor: '#a82323',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  readingContainer: {
    flex: 11,
  },
  titleView: {
    alignItems: 'center',
    flexGrow: 1,
  },
  titleText: {
    fontSize: 30,
  },
  textView: {
    alignItems: 'flex-start',
    flexGrow: 12,
  },
  textText: {
    fontSize: 12,
  },
  homeContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  AllArticles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
