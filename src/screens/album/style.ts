import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  noAlbumsText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: '#fff',
  },
  albumContainer: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    maxWidth: '50%',
  },
  albumImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: 'gray',
  },
  albumTitle: {
    marginTop: 10,
    fontSize: 12,
    color: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  header: {
    fontSize: 20,
    fontWeight: 'medium',
    color: '#fff',
  },
});
