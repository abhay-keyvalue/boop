
import React, { JSX } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { navigateTo } from '../../navigation/navigationUtils';

import Keyboard from '../../assets/svg/keyboard.svg';
import Mic from '../../assets/svg/mic.svg';
import Camera from '../../assets/svg/camera.svg';

export default function Home(): JSX.Element {

  const navigateToMapScreen = () => {
    navigateTo('Chat');
  };

  return (
    <View style={styles.container}>
      {/* Centered Card */}
      <View style={styles.card}>
        <Image source={require('../../assets/png/boopSq.png')} style={styles.image} />
        <Text style={styles.description}>
          I’m Boop, your local friend for exploring the world.
        </Text>
        <Text style={styles.question}>Where are we going next?</Text>
      </View>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={navigateToMapScreen} style={styles.button}>
          <Keyboard />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToMapScreen} style={styles.button}>
          <Camera />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToMapScreen} style={styles.button}>
          <Mic />
        </TouchableOpacity>
      </View>
    </View>
  );
}
