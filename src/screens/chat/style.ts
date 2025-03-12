import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {flex: 1, padding: 10, backgroundColor: '#000', justifyContent: 'flex-end'},
  message: {padding: 10, marginVertical: 5, borderRadius: 10, maxWidth: '80%', marginBottom: 30},
  userMessage: {alignSelf: 'flex-end', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#fff'},
  aiMessage: {alignSelf: 'flex-start', backgroundColor: '#0a2351',  maxWidth: 280},
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
    marginTop: 10,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    padding: 4,
    paddingBottom: 6,
    borderRadius: 5,
    marginRight: 10,
    color: '#fff',
    maxHeight: 80,
  },
  itineraryContainer: {
    marginBottom: 6,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Shadow for Android
    minWidth: 220,
    maxWidth: 280,
  },
  itineraryTitle: {
    fontSize: 13,
    fontWeight: 'medium',
    color: '#333',
    marginBottom: 3,
  },
  itineraryItem: {
    flexDirection: 'row',
    width: '100%',
  },
  itineraryImageContainer: {
    width: 70,
    height: 90,
    borderRadius: 4,
    marginRight: 5,
    flex:1,
    backgroundColor: 'gray',
  },
  itineraryImage: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  itineraryContent: {
    width: '70%',
    flexDirection: 'column',
  },
  itineraryText: {
    fontSize: 12,
    color: '#444',
    opacity: 0.8,
  },
  chatImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  chatImage2: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  chatImage3: {
    width: 210,
    height: 100,
    borderRadius: 10,
    marginTop: 5,
  },
  imagePickerButton: {
    width: 30,
    height: 30,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaContainer : {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    flexWrap: 'wrap',
    width: 210,
    minHeight: 110,
    paddingBottom: 10,
    marginTop: 10,
  },
  timestamp: {
    color: '#aaa',
    fontSize: 12,
    alignSelf: 'flex-end',
    marginTop: 5,
    position: 'absolute',
    bottom: -20,
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
  clear: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  selectedImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginLeft: 5,
  },
  closeButton: {
    marginRight: 5,
  },
  sendButton: {
    minHeight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
