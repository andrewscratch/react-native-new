import React from 'react';
import { View, Text } from "react-native";

import * as SplashScreen from "expo-splash-screen";
// import { useFonts } from "expo-font";
import * as Font from "expo-font";

// import { StyleSheet } from 'react-native';
import { Provider } from "react-redux";
import { store } from './redux/store';

import Main from './assets/Components/Main';

export default function App() {

  const fontsLoaded = async () => {
    await Font.loadAsync({
    RobotoReg: require("./assets/Fonts/Roboto/Roboto-Regular.ttf"),
    RobotoMed: require("./assets/Fonts/Roboto/Roboto-Medium.ttf"),
    RobotoBold: require("./assets/Fonts/Roboto/Roboto-Bold.ttf"),
  })
  };

   if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Something wetn wrong. Please reload the page!</Text>
      </View>
    );
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <Provider store={store}>
    <Main />
    </Provider>
  );
}