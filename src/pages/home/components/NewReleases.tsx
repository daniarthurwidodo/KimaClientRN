import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { palette, font, radius, text } from '../../../shared/theme';

const CARD_WIDTH = 150;
const CARD_HEIGHT = 190;

export type Release = { id: string; title: string; color: string };

type Props = { items: Release[]; onSeeAll?: () => void };

export function NewReleases({ items, onSeeAll }: Props) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>New Releases</Text>
        <Pressable onPress={onSeeAll}>
          <Text style={styles.seeAll}>See All</Text>
        </Pressable>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {items.map(r => (
          <View key={r.id} style={[styles.card, { backgroundColor: r.color }]}>
            <Text style={styles.cardTitle} numberOfLines={2}>
              {r.title}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 18 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  title: {
    ...text.sectionHeader,
    color: palette.textPrimary,
  },
  seeAll: {
    ...text.secondary,
    fontFamily: font.familyMedium,
    color: palette.accentGreen,
  },
  row: { paddingHorizontal: 16, gap: 8 },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: radius.md,
    padding: 12,
    justifyContent: 'flex-end',
  },
  cardTitle: {
    ...text.sectionHeader,
    color: palette.white,
  },
});
