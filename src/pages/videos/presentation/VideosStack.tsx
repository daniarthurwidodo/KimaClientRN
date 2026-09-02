import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { VideosStackParamList } from '../../../shared/navigation/types';
import { VideoListScreen } from './VideoListScreen';
import { VideoPlayerScreen } from './VideoPlayerScreen';

const Stack = createNativeStackNavigator<VideosStackParamList>();

export function VideosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="VideoList" component={VideoListScreen} />
      <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
    </Stack.Navigator>
  );
}
