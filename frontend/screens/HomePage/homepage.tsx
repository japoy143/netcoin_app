import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
  KeyboardAvoidingView,
} from "react-native";
import { BellIcon } from "react-native-heroicons/outline";

//controllers
import {
  fetchCrypto,
  fetchDailyUpdates,
  fetchNotifications,
  updateNotifications,
  handleClick,
} from "../../controllers/fetching";
//components
import { Trends, Notification } from "../../components/export";

//screens
import { Coins, Statistics, Market } from "./export";
//redux hooks
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setNotify } from "../../redux/notify";

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
  updatedAt: string;
}
export default function Home() {
  //statusbar spacing
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
  //isnotified
  const isNotified = useAppSelector((state) => state.isnotify.value);

  // dispatch function
  const dispatch = useAppDispatch();

  useEffect(() => {
    //get the crypto data
    fetchCrypto({ dispatch });
    // ensure that it will only render once a day
    if (isDataFetch !== 1) {
      fetchDailyUpdates({ dispatch });
      fetchNotifications({ dispatch });
      setIsDataFetch(1);
    }
    // fetch data every 10 seconds
    const fetchCryptoIntervalId = setInterval(() => {
      fetchCrypto({ dispatch });
    }, 10000);

    //update read to 0 for new notifications
    const updateNotifs = setInterval(() => {
      updateNotifications();
    }, 1700000);

    // fetch notifications every 30 minutes
    const fetchNotificationsIntervalID = setInterval(() => {
      fetchNotifications({ dispatch });
    }, 1800000);

    return () => {
      clearInterval(fetchCryptoIntervalId);
      clearInterval(updateNotifs);
      clearInterval(fetchNotificationsIntervalID);
    };
  }, []);

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

  const isNotifyTapped = () => {
    setNotificationOpen(true);
    dispatch(setNotify(false));
    handleClick;
  };

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
          <TouchableOpacity className="relative" onPress={isNotifyTapped}>
            <Notification
              notifications={notifications}
              isOpen={isNotificationOpen}
              setIsOpen={setNotificationOpen}
            />
            <BellIcon color={"white"} size={30} />
            {isNotified && (
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
