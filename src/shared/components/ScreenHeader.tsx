import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { palette, font } from '../theme/palette';

type Props = { title: string; subtitle?: string };

export function ScreenHeader({ title, subtitle }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: palette.darkAmethyst,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    color: palette.white,
    fontFamily: font.familyBold,
    fontSize: 24,
  },
  subtitle: {
    color: palette.mutedText,
    fontFamily: font.family,
    fontSize: 13,
    marginTop: 4,
  },
});
