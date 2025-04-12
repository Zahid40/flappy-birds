import { View, Text } from 'react-native';
import React from 'react';
import { Button } from '@/components/ui/button';
import ToggleTheme from '@/components/toggle-theme';
import { Link } from 'expo-router';

const HomePage = () => {
  return (
    <View className='justify-center items-center flex-1 '>
      <Text>HomePage</Text>
      {/* <ToggleTheme/> */}
      <Button>
        <Link href="/game">
          <Text className="text-sm">GAME</Text>
        </Link>
      </Button>
    </View>
  );
};

export default HomePage;
