import { StyleSheet } from "react-native";

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  topBar: {
    flex: 1,
    // backgroundColor: '#a82323',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  readingContainer: {
    flex: 11,
  },
  titleView: {
    alignItems: "center",
    flexGrow: 1,
  },
  titleText: {
    fontSize: 30,
  },
  textView: {
    alignItems: "flex-start",
    flexGrow: 12,
  },
  textText: {
    fontSize: 12,
  },
  homeContainer: {
    margin: 100,
    // backgroundColor: 'black'
  }
});
