import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import { palette } from '../../../shared/theme/palette';
import { ScreenHeader } from '../../../shared/components/ScreenHeader';
import type { CommunityStackParamList } from '../../../shared/navigation/types';
import { CommunityMenuList } from '../components/CommunityMenuList';
import { getCommunityMenu, type CommunityMenuKey } from '../business/communityMenu';

export function CommunityScreen() {
  const navigation = useNavigation<NavigationProp<CommunityStackParamList>>();
  const items = getCommunityMenu();

  const handleSelect = (key: CommunityMenuKey) => {
    if (key === 'videos') {
      navigation.navigate('Videos');
    }
  };

  return (
    <View style={styles.root}>
      <ScreenHeader title="Community" subtitle="Grow together with the church" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <CommunityMenuList items={items} onSelect={handleSelect} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bgLight },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 24 },
});
