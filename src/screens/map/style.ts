import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  map: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: 'red',
  },
  searchContainer :{
    zIndex: 1,
    flex: 0.5,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  errorText: {
    color: '#fff',
    padding: 20,
    fontSize: 16,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    flexDirection: 'row',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    minHeight: 50,
    alignItems: 'center',
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  }
});
