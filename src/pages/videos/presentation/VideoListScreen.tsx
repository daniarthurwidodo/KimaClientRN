import React from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import { palette, font } from '../../../shared/theme/palette';
import type { VideosStackParamList } from '../../../shared/navigation/types';
import { useVideos } from '../business/useVideos';
import { VideoCard } from '../components/VideoCard';

export function VideoListScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<VideosStackParamList>>();
  const { data, loading, error } = useVideos();

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8 }]}>
      <Text style={styles.header}>Videos</Text>
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {loading && <ActivityIndicator color={palette.blushRose} style={{ marginTop: 24 }} />}
        {error && <Text style={styles.error}>{error}</Text>}
        {!loading && !error && data.length === 0 && (
          <Text style={styles.empty}>No videos available.</Text>
        )}
        {data.map(video => (
          <VideoCard
            key={video.id}
            video={video}
            onPress={() => navigation.navigate('VideoPlayer', { videoId: video.id })}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bgLight, paddingHorizontal: 16 },
  header: {
    fontFamily: font.familyBold,
    fontSize: 22,
    color: palette.textPrimary,
    marginBottom: 12,
  },
  list: { paddingBottom: 32 },
  error: { fontFamily: font.family, fontSize: 13, color: palette.badgeRed, marginTop: 16 },
  empty: { fontFamily: font.family, fontSize: 14, color: palette.textSecondary, marginTop: 24 },
});
