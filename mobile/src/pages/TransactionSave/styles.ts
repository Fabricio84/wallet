import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5 + Constants.statusBarHeight,
  },

  scrollView: {
    marginHorizontal: 24,
    overflow: 'hidden',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
    marginBottom: 24,
  },

  subTitle: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 12,
    marginBottom: 12,
  },

  label: {
    color: '#6C6C80',
    fontSize: 16,
    marginBottom: 12,
  },

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },

  tagItem: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    margin: 4,
    paddingHorizontal: 8,
    fontSize: 16,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  tagItemSelected: {
    backgroundColor: '#34CB79',
  },

  tagItemText: {
    margin: 8,
    alignSelf: 'center',
  },

  tagItemTextSelected: {
    color: '#FFF',
  },

  formGroup: {
    flexDirection: 'row',
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginBottom: 24,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },
});
