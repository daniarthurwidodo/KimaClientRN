import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import {
  News24Filled,
  CalendarStar24Filled,
  People24Filled,
  Handshake24Filled,
  Building24Filled,
  Video24Filled,
  ChevronRight24Regular,
} from '@fluentui/react-native-icons';
import { palette, radius, text } from '../../../shared/theme';
import type { CommunityMenuItem, CommunityMenuKey } from '../business/communityMenu';

type IconCmp = React.ComponentType<{ color?: string; width?: number; height?: number }>;

const ICONS: Record<CommunityMenuKey, IconCmp> = {
  newsfeed: News24Filled,
  events: CalendarStar24Filled,
  smallGroups: People24Filled,
  prayer: Handshake24Filled,
  ministry: Building24Filled,
  videos: Video24Filled,
};

type Props = {
  items: CommunityMenuItem[];
  onSelect?: (key: CommunityMenuKey) => void;
};

export function CommunityMenuList({ items, onSelect }: Props) {
  return (
    <View style={styles.list}>
      {items.map(item => {
        const Icon = ICONS[item.key];
        return (
          <Pressable
            key={item.key}
            style={styles.row}
            onPress={() => onSelect?.(item.key)}
            accessibilityRole="button"
          >
            <View style={styles.iconWrap}>
              <Icon color={palette.accentGreen} width={22} height={22} />
            </View>
            <View style={styles.texts}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <ChevronRight24Regular color={palette.textSecondary} width={20} height={20} />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 16, paddingTop: 16 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.white,
    borderRadius: radius.md,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.circle,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.headerGreen + '33',
  },
  texts: { flex: 1, marginLeft: 12 },
  label: {
    ...text.cardTitle,
    color: palette.textPrimary,
  },
  description: {
    ...text.secondary,
    color: palette.textSecondary,
    marginTop: 2,
  },
});
