import React, { Component, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";

type coinsProps = {
  data: any[];
};

import {
  getPrice,
  getCryptoImage,
  getPercent,
  getPriceTwoDecimal,
  Images,
} from "./reusableFunctions";

export default function TopTrends({ data }: coinsProps) {
  const window = useWindowDimensions();
  const [currentindex, setCurrentIndex] = useState(0);

  return (
    <View className="mt-4 items-center mx-4  ">
      {data.length === 5 ? (
        <FlatList
          data={data}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          decelerationRate="fast"
          snapToInterval={window.width}
          onScroll={(e) => {
            const x = e.nativeEvent.contentOffset.x;
            setCurrentIndex(Math.floor(x / window.width));
          }}
          renderItem={({ item, index }) => (
            <View
              className="  bg-white  justify-between items-center  flex-row px-8 "
              style={{ height: window.height * 0.2, width: window.width }}
            >
              <View className=" items-center">
                <Image
                  source={getCryptoImage(item.symbol)}
                  className=" h-20 w-20"
                  resizeMode="contain"
                />

                <Text className=" text-2xl font-semibold">{item.name}</Text>
                <Text className=" text-xl font-bold ">{item.symbol}</Text>
              </View>

              <View>
                <Text className=" text-4xl font-semibold">
                  ${getPriceTwoDecimal(item.priceUsd)}
                </Text>
                <View className=" flex-row justify-end  items-center mr-4 mt-2">
                  <Image
                    source={
                      getPercent(item.changePercent24Hr) < 0
                        ? Images.StatRed
                        : Images.StatGreen
                    }
                    className="h-[120%] w-20"
                    resizeMode="contain"
                  />
                  <Text
                    className={`${
                      getPercent(item.changePercent24Hr) < 0
                        ? " text-red-500"
                        : " text-green-500"
                    } font-medium text-3xl mt-4 ml-2`}
                  >
                    {getPercent(item.changePercent24Hr)}%
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      ) : (
        <View
          className="  bg-white  justify-center items-center px-4 "
          style={{ height: window.height * 0.2, width: window.width }}
        >
          <ActivityIndicator size={"large"} color={"gray"} />
        </View>
      )}

      <View className="flex-row mt-1">
        {data.map((item, index) => (
          <View
            key={index}
            className={`${
              currentindex === index ? "bg-white" : "bg-gray-500"
            } h-2 w-2 rounded-full mr-1`}
          ></View>
        ))}
      </View>
    </View>
  );
}
