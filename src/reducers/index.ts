import {combineReducers} from 'redux';

import latestItineraryReducer from '../screens/chat/latestItinerarySlice';

const rootReducer = combineReducers({
  latestItinerary: latestItineraryReducer,
});

export default rootReducer;
