import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import { palette, font } from '../theme/palette';
import { extractYoutubeId } from '../utils/youtube';

type Props = {
  link: string;
  height?: number;
  autoplay?: boolean;
  onError?: (message: string) => void;
};

const DEFAULT_HEIGHT = 220;

export function YoutubePlayer({ link, height = DEFAULT_HEIGHT, autoplay = false, onError }: Props) {
  const [playing, setPlaying] = useState(autoplay);
  const [failed, setFailed] = useState<string | null>(null);
  const videoId = extractYoutubeId(link);

  if (!videoId) {
    return (
      <View style={[styles.fallback, { height }]}>
        <Text style={styles.fallbackText}>Invalid YouTube link.</Text>
      </View>
    );
  }

  if (failed) {
    return (
      <View style={[styles.fallback, { height }]}>
        <Text style={styles.fallbackText}>{failed}</Text>
      </View>
    );
  }

  return (
    <YoutubeIframe
      videoId={videoId}
      height={height}
      play={playing}
      onChangeState={(state: string) => {
        if (state === 'ended') setPlaying(false);
      }}
      onError={(err: string) => {
        setFailed(`Playback error: ${err}`);
        onError?.(err);
      }}
    />
  );
}

const styles = StyleSheet.create({
  fallback: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.midnightViolet,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  fallbackText: {
    fontFamily: font.family,
    fontSize: 13,
    color: palette.mutedText,
    textAlign: 'center',
  },
});
