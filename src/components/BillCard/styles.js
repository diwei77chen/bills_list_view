import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 10
  },
  image: {
    height: 56,
    width: 56
  },
  dateStatusView: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 5,
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  date: {
    flex: 1
  },
  statusBadge: {
    marginLeft: 3
  },
  statusText: { 
    fontSize: 12,
    lineHeight: 14
  }
});
