import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Home24Regular,
  Home24Filled,
  People24Regular,
  People24Filled,
  Gift24Regular,
  Gift24Filled,
} from '@fluentui/react-native-icons';
import { palette, font, text } from '../theme';

export type TabKey = 'home' | 'community' | 'giving';

type IconCmp = React.ComponentType<{ color?: string; width?: number; height?: number }>;
type Tab = { key: TabKey; label: string; Regular: IconCmp; Filled: IconCmp };

const TABS: Tab[] = [
  { key: 'home', label: 'Home', Regular: Home24Regular, Filled: Home24Filled },
  { key: 'community', label: 'Community', Regular: People24Regular, Filled: People24Filled },
  { key: 'giving', label: 'Giving', Regular: Gift24Regular, Filled: Gift24Filled },
];

type Props = { screens: Record<TabKey, React.ReactNode> };

export function BottomTabs({ screens }: Props) {
  const [active, setActive] = useState<TabKey>('home');
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <View style={styles.body}>{screens[active]}</View>
      <View style={[styles.bar, { paddingBottom: insets.bottom || 8 }]}>
        {TABS.map(tab => {
          const isActive = tab.key === active;
          const Icon = isActive ? tab.Filled : tab.Regular;
          const color = isActive ? palette.saffron : palette.mutedText;
          return (
            <Pressable
              key={tab.key}
              style={styles.tab}
              onPress={() => setActive(tab.key)}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              <Icon color={color} width={24} height={24} />
              <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.midnightViolet },
  body: { flex: 1 },
  bar: {
    flexDirection: 'row',
    backgroundColor: palette.darkAmethyst,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: palette.dustyGrape,
  },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  label: {
    ...text.caption,
    color: palette.mutedText,
    marginTop: 4,
  },
  labelActive: {
    color: palette.saffron,
    fontFamily: font.familyBold,
  },
});
