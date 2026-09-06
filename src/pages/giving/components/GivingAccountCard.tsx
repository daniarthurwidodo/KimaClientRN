import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { palette, font } from '../../../shared/theme/palette';
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
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.searchBorder,
    padding: 16,
  },
  title: {
    color: palette.textPrimary,
    fontFamily: font.familyBold,
    fontSize: 15,
    marginBottom: 12,
  },
  account: { marginBottom: 12 },
  bank: {
    color: palette.textSecondary,
    fontFamily: font.familyMedium,
    fontSize: 12,
  },
  number: {
    color: palette.textPrimary,
    fontFamily: font.familyBold,
    fontSize: 18,
    marginTop: 2,
  },
  name: {
    color: palette.textSecondary,
    fontFamily: font.family,
    fontSize: 12,
    marginTop: 2,
  },
});
