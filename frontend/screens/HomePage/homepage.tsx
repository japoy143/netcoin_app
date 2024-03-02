import React, { Component, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { BellIcon } from "react-native-heroicons/outline";

//components
import { Trends } from "../../components/export";

//screens
import { Coins, Statistics, Market } from "./export";

//api
const API_KEY = `34413f7c-4968-4dfb-a496-76844da6f4f1`;

const API = "http://192.168.254.161:3000/statistics/data";
import axios from "axios";

interface PriceItem {
  price: string;
  symbol: string;
}
export interface DailyUpdate {
  _id: string;
  price: PriceItem[][];
  dayIndex: string;
  day: string;
  done: any;
}

export default function Home() {
  //statusbar spacing
  const height: number | undefined = StatusBar.currentHeight;
  const [notification, isNotification] = useState();
  const [isDataFetch, setIsDataFetch] = useState<number>(0);
  const window = useWindowDimensions();

  // all crypto
  const [coins, setCoins] = useState([]);

  //daiyUpdates
  const [daily, setDaily] = useState<DailyUpdate[]>([]);

  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        const coins = await axios.get("https://api.coincap.io/v2/assets", {
          headers: { Authorization: `Bearer ${API_KEY}` },
        });
        setCoins(coins.data["data"]);
        console.log(coins);
      } catch (error) {
        Alert.alert("Fetching Error", "Data not Fetch");
      }
    };
    const fetchDailyUpdates = async () => {
      try {
        const stats = await axios.get(API);
        setDaily(stats.data["stats"]);
        console.log(stats.data["stats"]);
      } catch (error) {
        Alert.alert("Fetching Error", "Data not Fetch");
      }
    };

    if (isDataFetch !== 1) {
      fetchDailyUpdates();
      setIsDataFetch(1);
    }

    const intervalID = setInterval(() => {
      fetchCrypto();
    }, 10000);
    fetchCrypto();
    return () => clearInterval(intervalID);
  }, []);

  //Navigation
  const nav = ["Coins", "Market", "Statistics"];
  const screens = [
    <Coins data={coins} />,
    <Market data={coins} />,
    <Statistics data={coins} dailyUpdates={daily} />,
  ];
  const [navIndex, setNavIndex] = useState(0);
  console.log(daily.map((price) => price.price[0]));
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
