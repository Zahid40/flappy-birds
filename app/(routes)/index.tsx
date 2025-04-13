import { View, Text, ImageBackground, Image } from 'react-native';
import React from 'react';
import { Button } from '@/components/ui/button';
import ToggleTheme from '@/components/toggle-theme';
import { Link } from 'expo-router';
import { GameTheme } from '@/const';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const image = { uri: '@/assets/sprites/background-day.png' };

const HomePage = () => {
  return (
    <>
      <ImageBackground source={image} resizeMode="cover" />
      <View className="flex-1 items-center justify-center ">
        <Text className="font-micro stroke-1 text-8xl text-background">
          Flappy Bird
        </Text>
        <ToggleTheme />
        <Button>
          <Link href="/game">
            <Text className="text-sm">Start</Text>
          </Link>
        </Button>
      </View>
    </>
  );
};

export default HomePage;
