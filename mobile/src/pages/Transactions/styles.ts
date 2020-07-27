import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#f1f1f1',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },

  input: {
    height: 50,
    backgroundColor: '#FFF',
    fontSize: 16,
  },

  list: {
    marginTop: 32,
  },

  item: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    marginBottom: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },

  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  title: {
    fontSize: 13,
    color: '#000',
    fontWeight: 'bold',
  },

  date: {
    fontSize: 10,
    color: 'gray',
  },

  description: {
    fontSize: 16,
    color: '#000',
  },

  amount: {
    fontSize: 16,
    color: '#000',
  },
});
