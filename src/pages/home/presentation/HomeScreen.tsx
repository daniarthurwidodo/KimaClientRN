import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { palette } from '../../../shared/theme/palette';
import { Header } from '../components/Header';
import { Banner } from '../components/Banner';
import { SearchBar } from '../components/SearchBar';
import { FeatureGrid } from '../components/FeatureGrid';
import { NewReleases } from '../components/NewReleases';
import mock from '../data/mock.json';

export function HomeScreen() {
  return (
    <View style={styles.root}>
      <Header name={mock.user.name} unreadCount={mock.user.unreadCount} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Banner
          title={mock.banner.title}
          subtitle={mock.banner.subtitle}
          body={mock.banner.body}
        />
        <SearchBar />
        <FeatureGrid features={mock.features} />
        <NewReleases items={mock.newReleases} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bgLight },
  scroll: { flex: 1, backgroundColor: palette.bgLight },
  scrollContent: { paddingBottom: 24 },
});
