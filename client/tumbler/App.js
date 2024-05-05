import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainNavigation from './src/components/navigations/MainNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/client';
import client from './src/config/apolloConnection';
import HomeScreen from './src/screens/HomeScreen';
import MainTabNavigation from './src/components/navigations/TabNavigation';



export default function App() {
  return (
    <ApolloProvider client={client}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <MainNavigation />
          {/* <HomeScreen/> */}
          {/* <MainTabNavigation /> */}
        </NavigationContainer>
      </GestureHandlerRootView>
    </ApolloProvider>
  );
}

