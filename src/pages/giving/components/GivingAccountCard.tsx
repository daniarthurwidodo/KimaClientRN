import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { palette, radius, text } from '../../../shared/theme';
import type { GivingAccount } from '../business/givingOptions';

type Props = { accounts: GivingAccount[] };

export function GivingAccountCard({ accounts }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Transfer To</Text>
      {accounts.map(account => (
        <View key={account.bank} style={styles.account}>
          <Text style={styles.bank}>{account.bank}</Text>
          <Text style={styles.number}>{account.accountNumber}</Text>
          <Text style={styles.name}>{account.accountName}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: palette.white,
    borderRadius: radius.md,
    padding: 16,
  },
  title: {
    ...text.sectionHeader,
    color: palette.textPrimary,
    marginBottom: 12,
  },
  account: { marginBottom: 12 },
  bank: {
    ...text.caption,
    color: palette.textSecondary,
  },
  number: {
    ...text.sectionHeader,
    color: palette.textPrimary,
    marginTop: 2,
  },
  name: {
    ...text.secondary,
    color: palette.textSecondary,
    marginTop: 2,
  },
});
