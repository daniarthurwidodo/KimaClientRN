import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabs } from './src/shared/components/BottomTabs';
import { HomeStack } from './src/pages/home/presentation/HomeStack';
import { CommunityStack } from './src/pages/community/presentation/CommunityStack';
import { GivingScreen } from './src/pages/giving/presentation/GivingScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <BottomTabs
          screens={{
            home: <HomeStack />,
            community: <CommunityStack />,
            giving: <GivingScreen />,
          }}
        />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
