import React from 'react';
import { View, Text, ScrollView, ImageBackground, ActivityIndicator, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import { ArrowLeft24Regular } from '@fluentui/react-native-icons';
import { palette, font } from '../../../shared/theme/palette';
import type { HomeStackParamList } from '../../../shared/navigation/types';
import { useRenunganMonth } from '../business/useRenunganMonth';
import { pickDay } from '../business/selectors';

const HERO_HEIGHT = 260;

export function RenunganDetailScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<HomeStackParamList, 'RenunganDetail'>>();
  const { date } = route.params;
  const month = date.slice(0, 7);
  const { data, loading, error } = useRenunganMonth(month);
  const day = pickDay(data, date);

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {day?.imageUrl ? (
          <ImageBackground source={{ uri: day.imageUrl }} style={styles.hero} imageStyle={styles.heroImage}>
            <View style={styles.heroOverlay} />
          </ImageBackground>
        ) : (
          <View style={[styles.hero, styles.heroFallback]} />
        )}

        <Pressable
          style={[styles.backBtn, { top: insets.top + 8 }]}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Back"
        >
          <ArrowLeft24Regular color={palette.white} width={24} height={24} />
        </Pressable>

        <View style={styles.body}>
          <Text style={styles.date}>{date}</Text>
          {loading && <ActivityIndicator color={palette.blushRose} style={{ marginTop: 16 }} />}
          {error && <Text style={styles.error}>{error}</Text>}
          {!loading && !error && !day?.hasContent && (
            <Text style={styles.placeholder}>Belum ada renungan untuk tanggal ini.</Text>
          )}
          {day?.hasContent && (
            <>
              <Text style={styles.title}>{day.title}</Text>
              {day.scripture && (
                <View style={styles.scriptureBox}>
                  <Text style={styles.scriptureRef}>{day.scripture.ref}</Text>
                  <Text style={styles.scriptureText}>{day.scripture.text}</Text>
                </View>
              )}
              <Text style={styles.content}>{day.content}</Text>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bgLight },
  hero: { height: HERO_HEIGHT, backgroundColor: palette.dustyGrape },
  heroImage: { resizeMode: 'cover' },
  heroOverlay: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.25)' },
  heroFallback: { backgroundColor: palette.dustyGrape },
  backBtn: {
    position: 'absolute',
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { padding: 20 },
  date: { fontFamily: font.family, fontSize: 12, color: palette.textSecondary, letterSpacing: 1 },
  title: {
    fontFamily: font.familyBold,
    fontSize: 24,
    color: palette.textPrimary,
    marginTop: 8,
    lineHeight: 30,
  },
  scriptureBox: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(69,31,85,0.08)',
    borderLeftWidth: 3,
    borderLeftColor: palette.dustyGrape,
  },
  scriptureRef: {
    fontFamily: font.familyBold,
    fontSize: 13,
    color: palette.darkAmethyst,
    marginBottom: 6,
  },
  scriptureText: {
    fontFamily: font.family,
    fontSize: 14,
    color: palette.textPrimary,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  content: {
    fontFamily: font.family,
    fontSize: 15,
    color: palette.textPrimary,
    marginTop: 20,
    lineHeight: 24,
  },
  error: { fontFamily: font.family, fontSize: 13, color: palette.badgeRed, marginTop: 16 },
  placeholder: { fontFamily: font.family, fontSize: 14, color: palette.textSecondary, marginTop: 16 },
});
