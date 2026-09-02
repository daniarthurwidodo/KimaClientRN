import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { PlayCircle24Filled } from '@fluentui/react-native-icons';
import { palette, font } from '../../../shared/theme/palette';
import type { Video } from '../../../shared/services/videoApi';

type Props = {
  video: Video;
  onPress: () => void;
};

export function VideoCard({ video, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress} accessibilityRole="button">
      <View style={styles.thumbWrap}>
        {video.thumbnailUrl ? (
          <Image source={{ uri: video.thumbnailUrl }} style={styles.thumb} />
        ) : (
          <View style={[styles.thumb, styles.thumbFallback]} />
        )}
        <View style={styles.playOverlay}>
          <PlayCircle24Filled color={palette.white} width={40} height={40} />
        </View>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {video.title}
      </Text>
      {video.publishedAt && <Text style={styles.date}>{video.publishedAt}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 20 },
  thumbWrap: { position: 'relative', borderRadius: 10, overflow: 'hidden' },
  thumb: { width: '100%', aspectRatio: 16 / 9, backgroundColor: palette.dustyGrape },
  thumbFallback: { backgroundColor: palette.dustyGrape },
  playOverlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  title: {
    fontFamily: font.familyBold,
    fontSize: 15,
    color: palette.textPrimary,
    marginTop: 8,
    lineHeight: 20,
  },
  date: {
    fontFamily: font.family,
    fontSize: 12,
    color: palette.textSecondary,
    marginTop: 2,
  },
});
