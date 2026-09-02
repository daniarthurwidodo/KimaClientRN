import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabs } from './src/shared/components/BottomTabs';
import { StubScreen } from './src/shared/components/StubScreen';
import { HomeStack } from './src/pages/home/presentation/HomeStack';
import { VideosStack } from './src/pages/videos/presentation/VideosStack';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <BottomTabs
          screens={{
            home: <HomeStack />,
            community: <StubScreen label="Community" />,
            ministry: <StubScreen label="Ministry" />,
            giving: <StubScreen label="Giving" />,
            resources: <VideosStack />,
          }}
        />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
