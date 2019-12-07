import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  userContainer: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    marginLeft: 50,
    marginRight: 50,
  },
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
    height: 95
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
    backgroundColor: 'white',
  },
  greeting: {
    marginBottom: 32,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  errorMessage: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  error: {
    color: '#C2765B',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: '#1F1A21',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#161F3D',
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: '#C2765B',
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  AllArticles: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  AllArticlesContainer: {
    flex: 1,
  },
  searchBarContainer: {
    margin: 10,
    padding: 2,
    flexDirection: 'column',
  },
  searchBar: {
    margin: 5,
    fontSize: 22,
    borderRadius: 12,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#F0EEED',
    padding: 4,
  },
  searchButton: {
    marginTop: 10,
    marginHorizontal: 30,
    backgroundColor: '#C2765B',
    borderRadius: 8,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    marginLeft: 10,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600'
  },
  homeHeader: {
    color: '#747882',
    padding: 10,
    paddingBottom: 0,
    marginBottom: 2,
    fontSize: 24,
    fontWeight: 'bold'
  },
  recentBox: {
    borderColor: 'black',
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 5
  },
  rightAction: {
    backgroundColor: '#dd2c00',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'flex-end',
    margin: '5%',
    marginRight: 0
  },
  animation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: '100%'
  },
  swipeableAdd: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginLeft: 12,
    marginRight: 0,
    width: '12%'
  }
});
