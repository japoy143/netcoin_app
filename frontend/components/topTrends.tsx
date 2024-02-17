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

//API
const API_KEY = "34413f7c-4968-4dfb-a496-76844da6f4f1";
import axios from "axios";
const API = "https://api.coincap.io/v2/assets";

export default function TopTrends({ data }: coinsProps) {
  const window = useWindowDimensions();
  const [currentindex, setCurrentIndex] = useState(0);

  //imgs
  const imgs: any = {
    BTC: require("../assets/imgs/bitcoin.png"),
    ETH: require("../assets/imgs/etheruem.png"),
    USDT: require("../assets/imgs/tether.png"),
    BNB: require("../assets/imgs/binance.png"),
    SOL: require("../assets/imgs/solana.png"),
    NO: require("../assets/imgs/noImg.jpg"),
  };

  const [nowCoins, setNowCoins] = useState([]);
  useEffect(() => {
    const fetchCrypto = async () => {
      const coins = await axios.get(API, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
      setNowCoins(coins.data["data"]);
    };

    const intervalID = setInterval(() => {
      fetchCrypto();
    }, 5000);
    fetchCrypto();
    return () => clearInterval(intervalID);
  }, []);

  // function to make the crypto price in two decimal
  const getPrice = (price: string) => {
    let priceJson = parseInt(price);
    return priceJson.toFixed(2);
  };

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
              className="  bg-white  justify-evenly items-center  flex-row "
              style={{ height: window.height * 0.2, width: window.width }}
            >
              <View className=" items-center">
                <Image
                  source={imgs[item.symbol] || imgs.NO}
                  className=" h-20 w-20"
                  resizeMode="contain"
                />

                <Text className=" text-xl font-semibold">{item.name}</Text>
                <Text className=" text-lg font-medium">{item.symbol}</Text>
              </View>

              <View>
                <Text className=" text-3xl font-semibold">
                  ${getPrice(item.priceUsd)}
                </Text>
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
