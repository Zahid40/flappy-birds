import { View, Text } from 'react-native';
import React from 'react';
import { Button } from './ui/button';
import { useColorScheme } from '@/lib/useColorScheme';
import { Moon, Sun } from 'lucide-react-native';

const ToggleTheme = () => {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  return (
    <Button onPress={() => setColorScheme(isDarkColorScheme ? 'light' : 'dark')}>
      <Text className='text-sm'>
        {isDarkColorScheme ? <Sun className='text-yellow-500 size-8'  /> : <Moon className='text-blue-50 size-8' />}
        {colorScheme}
      </Text>
    </Button>
  );
};

export default ToggleTheme;
