import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';

// import type {RootState} from './src/store';
import Root from './navigation/root';

function Init(): React.JSX.Element {

  const themeStyle = {
    container: {
      backgroundColor: '#000'
    },
  };

  return (
    <View style={[styles.container, themeStyle.container]}>
      <SafeAreaView style={styles.container}>
        <Root />
      </SafeAreaView>
      <SafeAreaView style={styles.bottom} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  bottom: {
    flex: 0,
  },
});

export default Init;
