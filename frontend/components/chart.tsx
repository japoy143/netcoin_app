import React from "react";
import { View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { DailyUpdate } from "../screens/HomePage/homepage";

interface ChartProps {
  width: number;
  height: number;
  dailyUpdates: DailyUpdate[];
  index: number;
}

export default function ChartStatistics({
  width,
  height,
  dailyUpdates,
  index,
}: ChartProps) {
  const prices = dailyUpdates.flatMap((data) => data["price"]);
  const [saturday, friday, thursday, wednesday, tuesday, monday, sunday] =
    prices || [];

  const dailyDataSet = [
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
  ];

  const data = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
    datasets: [
      {
        data: dailyDataSet.flatMap((day) => parseInt(day[index].price)),
        strokeWidth: 2,
      },
    ],
  };
  return (
    <View className=" items-center px-4">
      <LineChart
        data={data}
        width={width - width * 0.1}
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
