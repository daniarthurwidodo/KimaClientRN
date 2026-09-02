import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import { palette } from '../../../shared/theme/palette';
import type { HomeStackParamList } from '../../../shared/navigation/types';
import { Banner } from '../components/Banner';
import { useTodayRenungan } from '../business/useTodayRenungan';

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
  const { day, today, loading } = useTodayRenungan();

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Banner
          day={day}
          loading={loading}
          onPress={() => navigation.navigate('RenunganDetail', { date: today })}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bgLight },
  scroll: { flex: 1, backgroundColor: palette.bgLight },
  scrollContent: { paddingBottom: 24 },
});
