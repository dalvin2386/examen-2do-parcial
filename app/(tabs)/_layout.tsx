import { Tabs } from 'expo-router';
import { Text } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Productos',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>📦</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="crear"
        options={{
          title: 'Crear',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>➕</Text>
          ),
        }}
      />
    </Tabs>
  );
}
