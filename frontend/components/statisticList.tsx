import React, { Component } from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";

type StatisticsProps = {
  height: number;
  width: number;
  data: any[];
};
export function StatisticList({ height, width, data }: StatisticsProps) {
  return (
    <View
      className="  mt-2 rounded-md  items-center justify-evenly"
      style={{ height: height, width: width }}
    >
      <FlatList
        data={data}
        horizontal
        snapToInterval={width}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            className=" items-center justify-center bg-white flex-1 rounded-lg  "
            style={{ width: width }}
          >
            <Text className="">{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
