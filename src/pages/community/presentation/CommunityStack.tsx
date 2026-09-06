import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { CommunityStackParamList } from '../../../shared/navigation/types';
import { CommunityScreen } from './CommunityScreen';
import { VideosStack } from '../../videos/presentation/VideosStack';

const Stack = createNativeStackNavigator<CommunityStackParamList>();

export function CommunityStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CommunityHome" component={CommunityScreen} />
      <Stack.Screen name="Videos" component={VideosStack} />
    </Stack.Navigator>
  );
}
