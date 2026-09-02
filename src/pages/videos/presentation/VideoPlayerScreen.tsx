import React from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import { ArrowLeft24Regular } from '@fluentui/react-native-icons';
import { palette, font } from '../../../shared/theme/palette';
import type { VideosStackParamList } from '../../../shared/navigation/types';
import { YoutubePlayer } from '../../../shared/components/YoutubePlayer';
import { useVideos } from '../business/useVideos';
import { findVideo } from '../business/selectors';

export function VideoPlayerScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<VideosStackParamList, 'VideoPlayer'>>();
  const { videoId } = route.params;
  const { data, loading, error } = useVideos();
  const video = findVideo(data, videoId);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          accessibilityRole="button"
          accessibilityLabel="Back"
        >
          <ArrowLeft24Regular color={palette.textPrimary} width={24} height={24} />
        </Pressable>
      </View>

      {loading && <ActivityIndicator color={palette.blushRose} style={{ marginTop: 32 }} />}
      {error && <Text style={styles.error}>{error}</Text>}
      {!loading && !error && !video && <Text style={styles.error}>Video not found.</Text>}

      {video && (
        <ScrollView contentContainerStyle={styles.body}>
          <YoutubePlayer link={video.url} />
          <Text style={styles.title}>{video.title}</Text>
          {video.publishedAt && <Text style={styles.date}>{video.publishedAt}</Text>}
          {video.description && <Text style={styles.description}>{video.description}</Text>}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bgLight },
  topBar: { paddingHorizontal: 8, paddingVertical: 4 },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  body: { padding: 16, paddingBottom: 32 },
  title: {
    fontFamily: font.familyBold,
    fontSize: 18,
    color: palette.textPrimary,
    marginTop: 16,
    lineHeight: 24,
  },
  date: {
    fontFamily: font.family,
    fontSize: 12,
    color: palette.textSecondary,
    marginTop: 4,
  },
  description: {
    fontFamily: font.family,
    fontSize: 14,
    color: palette.textPrimary,
    marginTop: 12,
    lineHeight: 22,
  },
  error: {
    fontFamily: font.family,
    fontSize: 14,
    color: palette.badgeRed,
    marginHorizontal: 16,
    marginTop: 16,
  },
});
