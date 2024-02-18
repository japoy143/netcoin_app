import React, { Component } from "react";
import {
  Text,
  Image,
  View,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import CryptoImgs from "../../models/cryptoImgs";
import { useNavigation } from "@react-navigation/native";
import { StackParamList } from "../../routes/StackRoutes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
interface Coins {
  data: any[];
}

const crypto = new CryptoImgs({});
const eachCrypto = crypto.state.imgs.map((img) => ({
  image: img.cryptoImgs,
  name: img.name,
}));

const StatImage = {
  statGreen: require("../../assets/imgs/stat_green.png"),
  statRed: require("../../assets/imgs/stat_red.png"),
};

const noImage = require("../../assets/imgs/noImg.jpg");

export default function CoinSummaryPage({ data }: Coins) {
  const window = useWindowDimensions();
  const height = window.height;
  const width = window.width;
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const filterExistCrypto = eachCrypto.flatMap((crypto) => {
    return data.filter((name) => name["symbol"] === crypto.name);
  });

  // get the name and return its image value
  const getSymbol = (symbol: string) => {
    const coin = eachCrypto.find((crypto) => crypto.name === symbol);

    return coin?.image || noImage;
  };

  //make the price two decimal place
  const getPrice = (price: string) => {
    const partialPrice = parseInt(price);

    return partialPrice.toFixed(0);
  };

  //remove decimal
  const getPercentage = (percent: string) => {
    const pricePercentage = parseInt(percent);

    return pricePercentage;
  };

  //split the name make it only one to make it shorter
  const getCryptoName = (name: string) => {
    let currentName = name.split(" ");

    return currentName[0];
  };

  return (
    <View>
      <FlatList
        data={filterExistCrypto}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("coins")}
            className="bg-black my-2 rounded-lg  flex-row px-2  item-center  py-4 justify-between"
            style={{
              height: height * 0.1 + (height * 0.1) / 2,
              width: width * 0.9,
            }}
          >
            <View className=" flex-row items-center ">
              <Image
                source={getSymbol(item.symbol)}
                className="h-[80%] w-[60] mr-4"
                resizeMode="contain"
              />
              <View>
                <Text className=" text-white font-medium text-xl">
                  {getCryptoName(item.name)}
                </Text>
                <View className=" flex-row items-center ">
                  <Text className=" text-white font-medium text-base">
                    {item.symbol}
                  </Text>
                  <Text className=" text-white font-medium text-base ml-4">
                    ${getPrice(item.priceUsd)}
                  </Text>
                </View>
              </View>
            </View>
            <View className=" flex-row  items-center pr-4   ">
              <Image
                source={
                  getPercentage(item.changePercent24Hr) < 0
                    ? StatImage.statRed
                    : StatImage.statGreen
                }
                className=" h-[60%] w-[50] mr-2"
                resizeMode="contain"
              />
              <Text
                className={`${
                  getPercentage(item.changePercent24Hr) < 0
                    ? "text-red-500"
                    : "text-green-500"
                } text-lg font-medium mt-4`}
              >
                {getPercentage(item.changePercent24Hr)}%
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
