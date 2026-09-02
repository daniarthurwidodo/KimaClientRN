import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../../shared/navigation/types';
import { HomeScreen } from './HomeScreen';
import { RenunganDetailScreen } from '../../renungan/presentation/RenunganDetailScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="RenunganDetail" component={RenunganDetailScreen} />
    </Stack.Navigator>
  );
}
