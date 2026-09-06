import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import {
  Gift24Filled,
  Heart24Filled,
  Globe24Filled,
  Building24Filled,
  ChevronRight24Regular,
} from '@fluentui/react-native-icons';
import { palette, radius, text } from '../../../shared/theme';
import type { GivingFund, GivingFundKey } from '../business/givingOptions';

type IconCmp = React.ComponentType<{ color?: string; width?: number; height?: number }>;

const ICONS: Record<GivingFundKey, IconCmp> = {
  tithe: Gift24Filled,
  offering: Heart24Filled,
  mission: Globe24Filled,
  building: Building24Filled,
};

type Props = {
  funds: GivingFund[];
  selectedKey?: GivingFundKey;
  onSelect?: (key: GivingFundKey) => void;
};

export function GivingFundList({ funds, selectedKey, onSelect }: Props) {
  return (
    <View style={styles.list}>
      {funds.map(fund => {
        const Icon = ICONS[fund.key];
        const isSelected = fund.key === selectedKey;
        return (
          <Pressable
            key={fund.key}
            style={[styles.row, isSelected && styles.rowSelected]}
            onPress={() => onSelect?.(fund.key)}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
          >
            <View style={styles.iconWrap}>
              <Icon color={palette.blushRose} width={22} height={22} />
            </View>
            <View style={styles.texts}>
              <Text style={styles.label}>{fund.label}</Text>
              <Text style={styles.description}>{fund.description}</Text>
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
  rowSelected: { backgroundColor: palette.blushRose + '14' },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.circle,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.blushRose + '22',
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
