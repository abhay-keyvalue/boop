
import React, { JSX } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { styles } from './style';
import { navigateTo } from '../../navigation/navigationUtils';

export default function Home(): JSX.Element {

  const navigateToMapScreen = () => {
    console.log('Navigate to map screen');
    navigateTo('MapScreen');
  };

  return (
    <View style={styles.container}>
      {/* Centered Card */}
      <View style={styles.card}>
        <Image source={{ uri: 'https://via.placeholder.com/300' }} style={styles.image} />
        <Text style={styles.description}>
          I’m Boop, your local friend for exploring the world.
        </Text>
        <Text onPress={navigateToMapScreen} style={styles.question}>Where are we going next?</Text>
      </View>

      {/* Bottom Action Bar */}
      <BlurView style={styles.bottomBar} blurType="dark" blurAmount={20}>
        <TouchableOpacity style={styles.button}>
          <Text>Keyboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
        <Text>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
        <Text>Mic</Text>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
}
