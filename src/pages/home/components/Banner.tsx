import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Speaker224Filled } from '@fluentui/react-native-icons';
import { palette, font } from '../../../shared/theme/palette';

type Props = { title: string; subtitle: string; body: string };

export function Banner({ title, subtitle, body }: Props) {
  return (
    <View style={styles.banner}>
      <View style={styles.speakerChip}>
        <Speaker224Filled color={palette.white} width={14} height={14} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    padding: 16,
    backgroundColor: palette.bannerOrange,
    overflow: 'hidden',
    height: 180,
  },
  speakerChip: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: palette.bannerAccent,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: palette.white,
    fontFamily: font.familyBold,
    fontSize: 22,
    marginTop: 24,
    lineHeight: 26,
  },
  subtitle: {
    color: palette.white,
    fontFamily: font.familyBold,
    fontSize: 14,
    marginTop: 10,
  },
  body: {
    color: palette.white,
    fontFamily: font.family,
    fontSize: 12,
    marginTop: 6,
    lineHeight: 16,
  },
});
