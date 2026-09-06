import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { palette, radius, text } from '../theme';

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
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
  },
  title: {
    ...text.screenTitle,
    color: palette.white,
  },
  subtitle: {
    ...text.secondary,
    color: palette.mutedText,
    marginTop: 4,
  },
});
