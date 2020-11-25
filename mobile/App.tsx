import React from 'react';
import {useFonts} from 'expo-font';
import { StatusBar } from 'react-native';
import {Jost_600SemiBold, Jost_700Bold, Jost_800ExtraBold} from '@expo-google-fonts/jost';

import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_600SemiBold, 
    Jost_700Bold, 
    Jost_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Routes />
    </>
  );
}

