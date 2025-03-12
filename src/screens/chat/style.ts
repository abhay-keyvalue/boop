import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {flex: 1, padding: 10, backgroundColor: '#000'},
  message: {padding: 10, marginVertical: 5, borderRadius: 10, maxWidth: '80%'},
  userMessage: {alignSelf: 'flex-end', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#fff'},
  aiMessage: {alignSelf: 'flex-start', backgroundColor: '#0a2351'},
  messageText: {color: '#fff'},
  loadingText: {
    alignSelf: 'center',
    marginBottom: 5,
    fontStyle: 'italic',
    color: '#555',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 20,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    color: '#fff',
  },
  itineraryContainer: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Shadow for Android
  },
  itineraryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  itineraryItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itineraryText: {
    fontSize: 16,
    color: '#444',
  },
});
