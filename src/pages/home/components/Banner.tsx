import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable, ActivityIndicator } from 'react-native';
import { Speaker224Filled } from '@fluentui/react-native-icons';
import { palette, font } from '../../../shared/theme/palette';
import type { RenunganDay } from '../../../shared/services/renunganApi';

type Props = {
  day: RenunganDay | null;
  loading?: boolean;
  onPress?: () => void;
};

const PLACEHOLDER_TEXT = 'Belum ada renungan hari ini.';

export function Banner({ day, loading, onPress }: Props) {
  const bg = day?.imageUrl ? { uri: day.imageUrl } : undefined;

  return (
    <Pressable onPress={onPress} disabled={!onPress} accessibilityRole="button">
      <ImageBackground source={bg} style={styles.banner} imageStyle={styles.image}>
        <View style={styles.tint} />
        <View style={styles.speakerChip}>
          <Speaker224Filled color={palette.white} width={14} height={14} />
        </View>

        {loading && <ActivityIndicator color={palette.white} style={styles.loader} />}

        {!loading && day?.hasContent && day.scripture && (
          <View style={styles.scriptureBox}>
            <Text style={styles.scriptureRef}>{day.scripture.ref}</Text>
            <Text style={styles.scriptureText} numberOfLines={4}>
              {day.scripture.text}
            </Text>
          </View>
        )}

        {!loading && !day?.hasContent && (
          <View style={styles.scriptureBox}>
            <Text style={styles.placeholder}>{PLACEHOLDER_TEXT}</Text>
          </View>
        )}
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 180,
    justifyContent: 'flex-end',
    padding: 16,
    backgroundColor: palette.bannerOrange,
    overflow: 'hidden',
  },
  image: { resizeMode: 'cover' },
  tint: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.25)' },
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
  loader: { alignSelf: 'center' },
  scriptureBox: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: 12,
    borderRadius: 10,
  },
  scriptureRef: {
    color: palette.saffron,
    fontFamily: font.familyBold,
    fontSize: 12,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  scriptureText: {
    color: palette.white,
    fontFamily: font.family,
    fontSize: 13,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  placeholder: {
    color: palette.white,
    fontFamily: font.family,
    fontSize: 13,
  },
});
