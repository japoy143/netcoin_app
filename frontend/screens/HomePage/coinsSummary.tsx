import React from "react";
import {
  Text,
  Image,
  View,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackParamList } from "../../routes/StackRoutes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  getPercent,
  getPrice,
  getCryptoImage,
  Images,
  getCryptoNameAndSplit,
  filteredDataImage,
} from "../../components/reusableFunctions";

interface Coins {
  data: any[];
}

export default function CoinSummaryPage({ data }: Coins) {
  const window = useWindowDimensions();
  const height = window.height;
  const width = window.width;
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  return (
    <View>
      <FlatList
        data={filteredDataImage(data)}
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
                source={getCryptoImage(item.symbol)}
                className="h-[80%] w-[60] mr-4"
                resizeMode="contain"
              />
              <View>
                <Text className=" text-white font-medium text-xl">
                  {getCryptoNameAndSplit(item.name)}
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
                  getPercent(item.changePercent24Hr) < 0
                    ? Images.StatRed
                    : Images.StatGreen
                }
                className=" h-[60%] w-[50] mr-2"
                resizeMode="contain"
              />
              <Text
                className={`${
                  getPercent(item.changePercent24Hr) < 0
                    ? "text-red-500"
                    : "text-green-500"
                } text-lg font-medium mt-4`}
              >
                {getPercent(item.changePercent24Hr)}%
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
