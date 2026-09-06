import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { palette, text } from '../theme';

export function StubScreen({ label }: { label: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{label}</Text>
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
    ...text.sectionHeader,
    color: palette.mutedText,
  },
});
