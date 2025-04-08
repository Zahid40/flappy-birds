import { StatusBar } from 'expo-status-bar';
import '../global.css';

import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <StatusBar />
    </Stack>
  );
}
