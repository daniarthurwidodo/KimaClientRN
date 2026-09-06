import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { palette } from '../../../shared/theme';
import { ScreenHeader } from '../../../shared/components/ScreenHeader';
import { GivingFundList } from '../components/GivingFundList';
import { GivingAccountCard } from '../components/GivingAccountCard';
import {
  getGivingFunds,
  getGivingAccounts,
  type GivingFundKey,
} from '../business/givingOptions';

export function GivingScreen() {
  const [selected, setSelected] = useState<GivingFundKey>('tithe');
  const funds = getGivingFunds();
  const accounts = getGivingAccounts();

  return (
    <View style={styles.root}>
      <ScreenHeader title="Giving" subtitle="Give with a cheerful heart" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <GivingFundList funds={funds} selectedKey={selected} onSelect={setSelected} />
        <GivingAccountCard accounts={accounts} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bgSubtle },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 24 },
});
