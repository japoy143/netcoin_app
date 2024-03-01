import React, { Component, useEffect, useMemo } from "react";
import { Text, StyleSheet, View, FlatList, Image } from "react-native";

import {
  getPercent,
  filteredDataImage,
  getCryptoImage,
  getPrice,
  getCryptoNameAndSplit,
  getPercentageChange,
  Images,
  dayStringToInt,
} from "./reusableFunctions";

import ChartStatistics from "./chart";
import { DailyUpdate } from "../screens/HomePage/homepage";
import axios from "axios";
const API = "http://192.168.254.161:3000/statistics/data";

type StatisticsProps = {
  height: number;
  width: number;
  data: any[];
  dailyUpdates: DailyUpdate[];
  date: number;
};
export default function StatisticList({
  height,
  width,
  data,
  dailyUpdates,
  date,
}: StatisticsProps) {
  const filtered = filteredDataImage(data);
  const halfData = filtered.slice(0, filtered.length / 2);
  const currentPrice = filtered.flatMap((cryp) => ({
    price: cryp["priceUsd"],
    symbol: cryp["symbol"],
  }));
  const getTodayDate = dailyUpdates.find(
    (day) => date === parseInt(day["dayIndex"])
  );
  console.log(getTodayDate);

  //destructuring
  const { _id, price, dayIndex, day, done } = getTodayDate || {};

  console.log(day);
  const isDone = dayStringToInt(done);
  useEffect(() => {
    const updateToday = async () => {
      const stats = await axios.patch(`${API}/${_id}`, {
        price: [currentPrice],
        dayIndex: dayIndex,
        day: day,
        done: 1,
      });
    };
    if (isDone === 0) {
      updateToday();
    }
  }, []);

  return (
    <View className="rounded-md  " style={{ height: height, width: width }}>
      <FlatList
        data={halfData}
        snapToInterval={width}
        horizontal
        renderItem={({ item }) => (
          <View
            className="  justify-center  flex-1 rounded-lg bg-black px-6 "
            style={{ width: width, height: height }}
          >
            <View className=" flex-row  justify-evenly">
              <View className=" flex-row justify-evenly ">
                <Image
                  source={getCryptoImage(item.symbol)}
                  className="h-10 w-10 mr-2"
                  resizeMode="contain"
                />
                <View>
                  <Text className=" text-white font-medium text-3xl mr-4 ml-2">
                    {getCryptoNameAndSplit(item.name)}
                  </Text>
                  <View className=" flex-row justify-evenly ">
                    <Text className=" text-white  font-light text-lg">
                      {item.symbol}
                    </Text>
                    <Text className="text-white font-light  text-lg">
                      ${getPrice(item.priceUsd)}
                    </Text>
                  </View>
                </View>
              </View>
              <View className=" flex-row  items-end  justify-evenly">
                <Image
                  source={
                    getPercent(item.changePercent24Hr) < 0
                      ? Images.StatRed
                      : Images.StatGreen
                  }
                  className="h-14 w-14"
                  resizeMode="contain"
                />
                <Text
                  className={` text-xl mb-1 ml-2 ${
                    getPercent(item.changePercent24Hr) < 0
                      ? "text-red-500"
                      : "text-green-500"
                  } `}
                >
                  {getPercent(item.changePercent24Hr)} %
                </Text>
              </View>
            </View>
            <View className=" item-center mt-2 ">
              <ChartStatistics
                yesterday={getPercentageChange(
                  item.changePercent24Hr,
                  item.priceUsd
                )}
                today={getPrice(item.priceUsd)}
                height={height - height * 0.3}
                width={width - width * 0.2}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}
