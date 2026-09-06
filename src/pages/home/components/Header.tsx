import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  TicketDiagonal24Regular,
  Mail24Regular,
  Settings24Regular,
} from '@fluentui/react-native-icons';
import { palette, radius, text } from '../../../shared/theme';

type Props = { name: string; unreadCount: number };

export function Header({ name, unreadCount }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.headerBar, { paddingTop: insets.top + 8 }]}>
      <Text style={styles.greeting}>Hi {name}</Text>
      <View style={styles.headerIcons}>
        <TicketDiagonal24Regular color={palette.white} />
        <View>
          <Mail24Regular color={palette.white} />
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
        <Settings24Regular color={palette.white} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    backgroundColor: palette.headerGreen,
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greeting: {
    ...text.sectionHeader,
    color: palette.white,
  },
  headerIcons: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: palette.badgeRed,
    borderRadius: radius.circle,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    ...text.caption,
    color: palette.white,
    letterSpacing: 0,
  },
});
