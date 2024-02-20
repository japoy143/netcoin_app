import React, { Component } from "react";
import { Text, StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CoinsPage from "../screens/Coins/coinsPage";
import StatisticPage from "../screens/Statistics/statisticPage";
import MarketPage from "../screens/Market/marketPage";
import Home from "../screens/HomePage/homepage";

export type StackParamList = {
  home: undefined;
  coins: undefined;
  statistics: undefined;
  market: undefined;
};
const Stack = createNativeStackNavigator<StackParamList>();

export default function StackRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="coins" component={CoinsPage} />
        <Stack.Screen name="statistics" component={StatisticPage} />
        <Stack.Screen name="market" component={MarketPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
