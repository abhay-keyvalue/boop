import {combineReducers} from 'redux';

import latestItineraryReducer from '../screens/chat/latestItinerarySlice';
import messageReducer from '../screens/chat/messageSlice';
import albumReducer from '../screens/chat/albumSlice';
import locationReducer from '../screens/home/locationSlice';

const rootReducer = combineReducers({
  latestItinerary: latestItineraryReducer,
  messageList: messageReducer,
  album: albumReducer,
  location: locationReducer,
});

export default rootReducer;
