import React, {memo, useEffect, useRef, useState} from 'react';
import {
  Animated,
  PanResponder,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Text,
  StyleSheet,
} from 'react-native';
import NetworkLogger, {startNetworkLogging} from 'react-native-network-logger';

const NetworkLogs = ({onPress}: {onPress?: () => void}) => {
  const [isNetworkModalVisible, setIsNetworkVIsible] = useState(false);
  const pan = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    startNetworkLogging({forceEnable: true});
  }, []);

  const themeStyle = {
    primaryColorBackground: {
      backgroundColor: '#598ef7',
    },
    primary: {
      color: '#FFF',
    },
    border: {
      borderColor: '#FFF',
    },
  };

  const theme = {
    colors: {
      background: '#FFF',
      link: '#598ef7',
      card: '#FFF',
      text: '#000',
    },
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderGrant: () => {
        pan.setOffset({x: pan.x._value, y: pan.y._value});
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  ).current;

  return (
    <>
      <Modal
        style={styles.modal}
        visible={isNetworkModalVisible}
        animationType="slide"
        onRequestClose={() => setIsNetworkVIsible(false)}
        transparent={false}>
        <SafeAreaView style={styles.contentContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsNetworkVIsible(false)}>
            <Text style={styles.close}>Close</Text>
          </TouchableOpacity>
          <NetworkLogger theme={theme} maxRows={100} compact />
        </SafeAreaView>
      </Modal>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          {transform: [{translateX: pan.x}, {translateY: pan.y}]},
          styles.container,
          themeStyle.primaryColorBackground,
          themeStyle.border,
        ]}>
        <TouchableOpacity
          onPress={() => {
            onPress && onPress();
            setIsNetworkVIsible(true);
          }}>
          <Text style={styles.content}>Logs</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 10,
    bottom: 140,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  content: {
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
    color: '#FFF',
  },
  contentContainer: {
    flex: 1,
    padding: 12,
  },
  closeButton: {
    width: '100%',
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  close: {
    fontSize: 17,
    fontWeight: '600',
    color: 'red',
  },
});

export default memo(NetworkLogs);
