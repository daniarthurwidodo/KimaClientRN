import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Search20Regular } from '@fluentui/react-native-icons';
import { palette, font } from '../../../shared/theme/palette';

type Props = { placeholder?: string };

export function SearchBar({ placeholder = 'Find events, classes & other feature' }: Props) {
  return (
    <View style={styles.bar}>
      <Search20Regular color={palette.textSecondary} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={palette.textSecondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    marginHorizontal: 16,
    marginTop: -20,
    height: 44,
    borderRadius: 22,
    backgroundColor: palette.searchBg,
    borderWidth: 1,
    borderColor: palette.searchBorder,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 8,
  },
  input: {
    flex: 1,
    fontFamily: font.family,
    fontSize: 13,
    color: palette.textPrimary,
    padding: 0,
  },
});
