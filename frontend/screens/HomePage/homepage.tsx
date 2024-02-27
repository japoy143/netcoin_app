import React, { Component, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
  KeyboardAvoidingView,
} from "react-native";
import { BellIcon } from "react-native-heroicons/outline";

//components
import { Trends } from "../../components/export";

//screens
import { Coins, Statistics, Market } from "./export";

//api
const API_KEY = `34413f7c-4968-4dfb-a496-76844da6f4f1`;

const API = "api.coincap.io/v2/assets";
import axios from "axios";
import { filteredDataImage } from "../../components/reusableFunctions";

//coin objects

export default function Home() {
  //statusbar spacing
  const height: number | undefined = StatusBar.currentHeight;
  const [notification, isNotification] = useState();
  const window = useWindowDimensions();

  // all crypto
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCrypto = async () => {
      const coins = await axios.get("https://api.coincap.io/v2/assets", {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
      setCoins(coins.data["data"]);
      console.log(coins);
    };

    const intervalID = setInterval(() => {
      fetchCrypto();
    }, 10000);
    fetchCrypto();
    return () => clearInterval(intervalID);
  }, []);

  //Navigations
  const nav = ["Coins", "Market", "Statistics"];
  const screens = [
    <Coins data={coins} />,
    <Market data={coins} />,
    <Statistics data={coins} />,
  ];
  const [navIndex, setNavIndex] = useState(0);

  //topfive
  const topFive: string[] = coins.slice(0, 5);

  return (
    <KeyboardAvoidingView className="flex-1" behavior="padding" enabled>
      <View className={` h-[30%]  bg-black  `} style={{ marginTop: height }}>
        <View className=" flex-row   mt-2 items-center justify-between px-5">
          <View className=" w-10"></View>
          <Text
            className=" text-3xl   text-white "
            style={{ fontFamily: "poppins" }}
          >
            netcoin
          </Text>
          <TouchableOpacity className="relative">
            <BellIcon color={"white"} size={30} />
            {notification && (
              <View className=" bg-red-500 h-2 rounded-full w-2 absolute right-1 top-1"></View>
            )}
          </TouchableOpacity>
        </View>
        <View className=" items-center">
          <Trends data={topFive} />
        </View>
      </View>
      <View className="flex-row justify-between mt-2 mx-2">
        {nav.map((nav, i) => (
          <TouchableOpacity
            key={i}
            className="bg-black rounded-md items-center justify-center"
            style={{
              height: (window.height * 0.1) / 2,
              width: window.width * 0.3,
            }}
            onPress={() => setNavIndex(i)}
          >
            <Text className="text-white font-semibold text-xl">{nav}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className="mt-2 items-center flex-1 ">{screens[navIndex]}</View>
    </KeyboardAvoidingView>
  );
}
