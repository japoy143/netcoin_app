import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { BellIcon } from "react-native-heroicons/outline";

//controllers
import {
  fetchCrypto,
  fetchDailyUpdates,
  fetchNotifications,
} from "../../controllers/fetching";
//components
import { Trends, Notification } from "../../components/export";

//screens
import { Coins, Statistics, Market } from "./export";

//api
// const API_KEY = `34413f7c-4968-4dfb-a496-76844da6f4f1`;

// const STATISTICS_API = "http://192.168.254.161:3000/statistics/data";
// const NOTIFICATION_API = "http://192.168.254.161:3000/notification/messages/";
// const ID = "65ed029393bc1629a0fcba23";

import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setDaily } from "../../redux/week";
import { setNotifications } from "../../redux/notifications";
import { setCoins } from "../../redux/data";

//server props
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
//notification type
interface message {
  name: string;
  symbol: string;
  price: string;
  percentage: string;
  read: string;
}
export interface notification {
  message: message[];
}

export default function Home() {
  //statusbar spacing
  const [notification, isNotification] = useState();
  const [isDataFetch, setIsDataFetch] = useState<number>(0);
  const [isNotificationOpen, setNotificationOpen] = useState<boolean>(false);
  const window = useWindowDimensions();

  // all crypto
  // const [coins, setCoins] = useState([]);
  const coins = useAppSelector((state) => state.coins.value);
  //dailyupdates
  const daily = useAppSelector((state) => state.daily.value);
  //notifications list
  const notifications = useAppSelector((state) => state.notifications.value);

  // dispatch function
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchNotifications({ dispatch });
    if (isDataFetch !== 1) {
      fetchDailyUpdates({ dispatch });
      setIsDataFetch(1);
    }
    const intervalID = setInterval(() => {
      fetchCrypto({ dispatch });
    }, 10000);
    fetchCrypto({ dispatch });
    return () => clearInterval(intervalID);
  }, []);

  console.log(notifications);

  console.log(daily);
  //Navigation
  const nav = ["Coins", "Market", "Statistics"];
  const screens = [
    <Coins data={coins} />,
    <Market data={coins} />,
    <Statistics data={coins} dailyUpdates={daily} />,
  ];
  const [navIndex, setNavIndex] = useState(0);

  //topfive
  const topFive: string[] = coins.slice(0, 5);

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior="height"
      enabled={true}
      keyboardVerticalOffset={100}
    >
      <View className={` h-[30%]  bg-black  `}>
        <StatusBar barStyle={"light-content"} />
        <View className=" flex-row   mt-2 items-center justify-between px-5">
          <View className=" w-10"></View>
          <Text
            className=" text-3xl   text-white "
            style={{ fontFamily: "poppins" }}
          >
            netcoin
          </Text>
          <TouchableOpacity
            className="relative"
            onPress={() => setNotificationOpen(true)}
          >
            <Notification
              notifications={notifications}
              isOpen={isNotificationOpen}
              setIsOpen={setNotificationOpen}
            />
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
