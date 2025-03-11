import React from 'react';

// import {persistor, store} from '@src/store';
import Init from './src/init';
import { View } from 'react-native';

function App(): React.JSX.Element {

  return (
    // <Provider store={store}>
    //   <PersistGate loading={null} persistor={persistor}>
        <View style={{flex: 1}}>
          <Init />
        </View>
    //   </PersistGate>
    // </Provider>
  );
}

export default App;
