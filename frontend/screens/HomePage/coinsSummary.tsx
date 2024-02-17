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

const noImage = require("../../assets/imgs/noImg.jpg");

export default function CoinSummaryPage({ data }: Coins) {
  const window = useWindowDimensions();
  const height = window.height;
  const width = window.width;
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const filterExistCrypto = eachCrypto.flatMap((crypto) => {
    return data.filter((name) => name["symbol"] === crypto.name);
  });

  const getImageForSymbol = (symbol: string) => {
    const coin = eachCrypto.find((c) => c.name === symbol);

    return coin?.image || noImage;
  };

  return (
    <View>
      <FlatList
        data={filterExistCrypto}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("coins")}
            className="bg-black my-2 rounded-lg  flex-row px-2  item-center  py-4"
            style={{
              height: height * 0.1 + (height * 0.1) / 2,
              width: width * 0.9,
            }}
          >
            <View className=" flex-row items-center ">
              <Image
                source={getImageForSymbol(item.symbol)}
                className="h-[80%] w-[60] mr-4"
                resizeMode="contain"
              />
              <View>
                <Text className=" text-white font-medium text-xl">
                  {item.name}
                </Text>
                <Text className=" text-gray-400 font-medium text-base">
                  {item.symbol}
                </Text>
              </View>
            </View>
            <View></View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
