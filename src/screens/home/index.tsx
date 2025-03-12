
import React, { JSX } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { navigateTo } from '../../navigation/navigationUtils';

export default function Home(): JSX.Element {

  const navigateToMapScreen = () => {
    console.log('Navigate to map screen');
    navigateTo('Map');
  };

  return (
    <View style={styles.container}>
      {/* Centered Card */}
      <View style={styles.card}>
        <Image source={require('../../assets/png/boopSq.png')} style={styles.image} />
        <Text style={styles.description}>
          I’m Boop, your local friend for exploring the world.
        </Text>
        <Text onPress={navigateToMapScreen} style={styles.question}>Where are we going next?</Text>
      </View>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button}>
          <Text>Keyboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
        <Text>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
        <Text>Mic</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
