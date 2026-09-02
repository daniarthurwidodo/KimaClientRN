import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { palette, font } from '../../../shared/theme/palette';

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.midnightViolet,
  },
  title: {
    color: palette.white,
    fontFamily: font.familyBold,
    fontSize: 24,
  },
});
