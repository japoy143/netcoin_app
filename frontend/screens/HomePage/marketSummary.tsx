import React, { useState } from "react";
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

//reusable functions
import {
  getPrice,
  getCryptoImage,
  getCryptoNameAndSplit,
  getPercent,
  filteredDataImage,
} from "../../components/reusableFunctions";

type Crypto = {
  data: any[];
};

export default function MarketSummaryPage({ data }: Crypto) {
  const window = useWindowDimensions();
  const height = window.height;
  const width = window.width;

  const [search, setSearch] = useState("");
  const [cryptoImg, setCryptoImg] = useState(sample);

  //cryptoName
  const [cryptoName, setCryptoName] = useState<string>("Crypto");
  //cryptoCount
  const [cryptoCount, setCryptoCount] = useState<number | undefined>(undefined);
  const handleCryptoCount = (count: string) => {
    const num = parseInt(count);

    setCryptoCount(isNaN(num) ? undefined : num);
  };
  //price
  const [cryptoPrice, setCryptoPrice] = useState<number | undefined>(undefined);
  const handleCryptoPrice = (price: string) => {
    const num = parseInt(price);

    setCryptoPrice(isNaN(num) ? undefined : num);
  };

  //state for converting values
  const changeValueForConversion = (
    name: string,
    symbol: string,
    cryptoPrice: string
  ) => {
    setCryptoName(name);
    setCryptoImg(getCryptoImage(symbol));
    setCryptoPrice(getPercent(cryptoPrice));
    setCryptoCount(1);
  };

  //convert
  const convertCrypto = () => {
    let cryptocount = cryptoCount === undefined ? 0 : cryptoCount;
    let cryptoprice = cryptoPrice === undefined ? 0 : cryptoPrice;
    setCryptoPrice(cryptocount * cryptoprice);
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
        className=" bg-black rounded-md mt-2  px-6 "
        style={{ height: height * 0.15 }}
      >
        <View className="flex-row mt-4 justify-between ">
          <Text className=" text-xl text-white font-medium ">{cryptoName}</Text>
          <TouchableOpacity
            className=" h[10%] w-20 bg-white  rounded items-center justify-center"
            onPress={() => convertCrypto()}
          >
            <Text className=" text-base font-medium">Convert</Text>
          </TouchableOpacity>
        </View>

        <View className=" flex-row   ">
          <Image
            source={cryptoImg}
            className=" h-16 w-10 mr-2 "
            resizeMode="contain"
          />
          <View className=" flex-row  items-center">
            <View
              className=" bg-white rounded-md px-2 justify-center"
              style={{ height: (height * 0.1) / 2.5, width: width * 0.3 }}
            >
              <TextInput
                value={cryptoCount === undefined ? "" : cryptoCount.toString()}
                onChangeText={handleCryptoCount}
                keyboardType="numeric"
                placeholder="0"
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
                value={cryptoPrice === undefined ? "" : cryptoPrice.toString()}
                onChangeText={handleCryptoPrice}
                placeholder="0"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>
      </View>
      <View className=" items-center mt-2 flex-1">
        <FlatList
          data={filteredDataImage(data)}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              className=" bg-black mr-1 ml-1  mb-2 rounded-md flex-row items-center justify-evenly"
              style={{ height: height * 0.1, width: width * 0.44 }}
              onPress={() =>
                changeValueForConversion(item.name, item.symbol, item.priceUsd)
              }
            >
              <Image
                source={getCryptoImage(item.symbol)}
                className="h-14 w-14"
                resizeMode="contain"
              />
              <View>
                <Text className=" text-white font-medium text-base">
                  {getCryptoNameAndSplit(item.name)}
                </Text>
                <Text className=" text-white">{getPrice(item.priceUsd)}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
