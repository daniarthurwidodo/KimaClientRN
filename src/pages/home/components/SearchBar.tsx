import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Search20Regular } from '@fluentui/react-native-icons';
import { palette, radius, text } from '../../../shared/theme';

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
    borderRadius: radius.pill,
    backgroundColor: palette.bgSubtle,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 8,
  },
  input: {
    ...text.secondary,
    flex: 1,
    color: palette.textPrimary,
    padding: 0,
  },
});
