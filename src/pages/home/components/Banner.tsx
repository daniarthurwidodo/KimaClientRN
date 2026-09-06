import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable, Animated } from 'react-native';
import { Speaker224Filled } from '@fluentui/react-native-icons';
import { palette, radius, text } from '../../../shared/theme';
import type { RenunganDay } from '../../../shared/services/renunganApi';

const SKELETON_MIN_OPACITY = 0.4;
const SKELETON_MAX_OPACITY = 1;
const SKELETON_PULSE_MS = 900;

function BannerSkeleton() {
  const opacity = useRef(new Animated.Value(SKELETON_MAX_OPACITY)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: SKELETON_MIN_OPACITY,
          duration: SKELETON_PULSE_MS,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: SKELETON_MAX_OPACITY,
          duration: SKELETON_PULSE_MS,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View style={[styles.skeletonBox, { opacity }]}>
      <View style={[styles.skeletonBar, styles.skeletonBarShort]} />
      <View style={styles.skeletonBar} />
      <View style={styles.skeletonBar} />
      <View style={[styles.skeletonBar, styles.skeletonBarMedium]} />
    </Animated.View>
  );
}

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

        {loading && <BannerSkeleton />}

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
    borderRadius: radius.circle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skeletonBox: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: 12,
    borderRadius: radius.md,
  },
  skeletonBar: {
    height: 12,
    borderRadius: radius.sm,
    backgroundColor: 'rgba(255,255,255,0.35)',
    marginBottom: 8,
  },
  skeletonBarShort: { width: '30%', marginBottom: 10 },
  skeletonBarMedium: { width: '60%', marginBottom: 0 },
  scriptureBox: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: 12,
    borderRadius: radius.md,
  },
  scriptureRef: {
    ...text.caption,
    color: palette.saffron,
    marginBottom: 4,
  },
  scriptureText: {
    ...text.secondary,
    color: palette.white,
    fontStyle: 'italic',
  },
  placeholder: {
    ...text.secondary,
    color: palette.white,
  },
});
