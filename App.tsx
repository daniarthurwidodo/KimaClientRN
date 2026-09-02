import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomTabs } from './src/shared/components/BottomTabs';
import { StubScreen } from './src/shared/components/StubScreen';
import { HomeScreen } from './src/pages/home/presentation/HomeScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <BottomTabs
        screens={{
          home: <HomeScreen />,
          community: <StubScreen label="Community" />,
          ministry: <StubScreen label="Ministry" />,
          giving: <StubScreen label="Giving" />,
          resources: <StubScreen label="Resources" />,
        }}
      />
    </SafeAreaProvider>
  );
}

export default App;
