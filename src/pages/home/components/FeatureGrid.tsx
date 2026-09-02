import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import {
  News24Filled,
  CalendarStar24Filled,
  Lightbulb24Filled,
  Home24Filled,
  Handshake24Filled,
  Emoji24Filled,
  ChatHelp24Filled,
  Grid24Filled,
} from '@fluentui/react-native-icons';
import { palette, font } from '../../../shared/theme/palette';

const FEATURE_COLUMNS = 4;

export type FeatureIconKey =
  | 'newsfeed'
  | 'event'
  | 'classes'
  | 'parenting'
  | 'prayer'
  | 'praise'
  | 'support'
  | 'more';

type IconCmp = React.ComponentType<{ color?: string; width?: number; height?: number }>;

const FEATURE_ICONS: Record<FeatureIconKey, IconCmp> = {
  newsfeed: News24Filled,
  event: CalendarStar24Filled,
  classes: Lightbulb24Filled,
  parenting: Home24Filled,
  prayer: Handshake24Filled,
  praise: Emoji24Filled,
  support: ChatHelp24Filled,
  more: Grid24Filled,
};

export type Feature = { id: string; label: string; icon: string };

type Props = { features: Feature[] };

export function FeatureGrid({ features }: Props) {
  return (
    <View style={styles.grid}>
      {features.map(f => {
        const Icon = FEATURE_ICONS[f.icon as FeatureIconKey];
        return (
          <Pressable key={f.id} style={styles.item}>
            <View style={styles.iconWrap}>
              <Icon color={palette.accentGreen} width={28} height={28} />
            </View>
            <Text style={styles.label}>{f.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    marginTop: 18,
    paddingHorizontal: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: `${100 / FEATURE_COLUMNS}%`,
    alignItems: 'center',
    paddingVertical: 10,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 6,
    fontFamily: font.familyMedium,
    fontSize: 12,
    color: palette.textPrimary,
  },
});
