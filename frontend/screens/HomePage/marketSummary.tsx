import React, { Component, useState } from "react";
import {
  Text,
  View,
  TextInput,
  useWindowDimensions,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

//icons
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";

//image
const sample = require("../../assets/imgs/etheruem.png");

//cryptoImages
import CryptoImgs from "../../models/cryptoImgs";

const CryptoImage = new CryptoImgs({});
const eachCryptoImage = CryptoImage.state.imgs.map((each) => ({
  name: each.name,
  image: each.cryptoImgs,
}));

type Crypto = {
  data: any[];
};

export default function MarketSummaryPage({ data }: Crypto) {
  const window = useWindowDimensions();
  const height = window.height;
  const width = window.width;

  const [search, setSearch] = useState("");
  const [crypto, setCrypto] = useState("Etheruem");
  const [cryptoImg, setCryptoImg] = useState(sample);

  //cryptoCount
  const [cryptoCount, setCryptoCount] = useState<number>(0);
  //price
  const [cryptoPrice, setCryptoPrice] = useState<number>(0);

  //show only the crypto with picture
  const showOnlyWithPicture = eachCryptoImage.flatMap((cryp) => {
    return data.filter((name) => name["symbol"] === cryp.name);
  });

  //getSameImageFunction
  const getCryptoImage = (symbol: string) => {
    const image = eachCryptoImage.find((cryp) => cryp.name === symbol);

    return image?.image || null;
  };

  // fixed without decimal
  const getprice = (price: string) => {
    let num = parseInt(price);

    return num;
  };

  //split one word crypto name
  const getCryptoName = (name: string) => {
    let cryptoName = name.split(" ");

    return cryptoName[0];
  };

  return (
    <View className=" flex-1">
      <View className=" flex-row  items-center ">
        <View
          className=" bg-gray-300 justify-center px-4 rounded-md "
          style={{ height: (height * 0.1) / 2, width: width * 0.8 }}
        >
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search"
            className=" font-medium text-base"
          />
        </View>
        <TouchableOpacity>
          <MagnifyingGlassIcon size={(height * 0.1) / 2} color={"gray"} />
        </TouchableOpacity>
      </View>

      <View
        className=" bg-black rounded-md mt-2 items-center "
        style={{ height: height * 0.15 }}
      >
        <Text className=" text-xl text-white font-medium ">{crypto}</Text>
        <View className=" flex-row  items-center ">
          <Image
            source={cryptoImg}
            className=" h-16 w-10 mr-2 "
            resizeMode="contain"
          />
          <View className=" flex-row mt-4  items-center">
            <View
              className=" bg-white rounded-md px-2 justify-center"
              style={{ height: (height * 0.1) / 2.5, width: width * 0.3 }}
            >
              <TextInput
                value={cryptoCount.toString()}
                onChangeText={(val) => setCryptoCount(parseInt(val))}
              />
            </View>
            <Text className=" ml-2 mr-2 text-white font-medium text-5xl">
              $
            </Text>
            <View
              className=" bg-white rounded-md px-2 justify-center"
              style={{ height: (height * 0.1) / 2.5, width: width * 0.3 }}
            >
              <TextInput
                value={cryptoPrice.toString()}
                onChangeText={(val) => setCryptoPrice(parseInt(val))}
              />
            </View>
          </View>
        </View>
      </View>
      <View className=" items-center mt-2 flex-1">
        <FlatList
          data={showOnlyWithPicture}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              className=" bg-black mr-1 ml-1  mb-2 rounded-md flex-row items-center justify-evenly"
              style={{ height: height * 0.1, width: width * 0.44 }}
            >
              <Image
                source={getCryptoImage(item.symbol)}
                className="h-14 w-14"
                resizeMode="contain"
              />
              <View>
                <Text className=" text-white font-medium text-base">
                  {getCryptoName(item.name)}
                </Text>
                <Text className=" text-white">{getprice(item.priceUsd)}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
