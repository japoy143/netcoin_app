import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

type ChartProps = {
  yesterday: number;
  today: number;
  width: number;
  height: number;
};

export default function ChartStatistics({
  yesterday,
  today,
  width,
  height,
}: ChartProps) {
  const data = {
    labels: ["Yesterday", "Today"],
    datasets: [
      {
        data: [yesterday, today],
        strokeWidth: 2,
      },
    ],
  };
  return (
    <View>
      <LineChart
        data={data}
        width={width}
        height={height}
        verticalLabelRotation={1}
        chartConfig={{
          backgroundColor: "black",
          backgroundGradientFrom: "black",
          backgroundGradientTo: "black",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        bezier
      />
    </View>
  );
}
