import React, { useMemo } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import StatisticList from "../../components/statisticList";
import { DailyUpdate } from "./homepage";
type statisticsSummaryProps = {
  data: any[];
  dailyUpdates: DailyUpdate[];
};

export default function StatisticsSummaryPage({
  data,
  dailyUpdates,
}: statisticsSummaryProps) {
  //for dynamic sizing or responsiveness
  const window = useWindowDimensions();
  const height = window.height;
  const width = window.width;
  //date today
  const dateNow = new Date();
  //day number
  const dayToday = dateNow.getDay();

  const meomizedData = useMemo(() => data, [data]);
  const week = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return (
    <View className=" flex-1 ">
      <StatisticList
        width={width * 0.95}
        height={height * 0.5}
        data={meomizedData}
        dailyUpdates={dailyUpdates}
        date={dayToday}
      />

      <View className="mt-2 items-center">
        <View className=" flex-row ">
          {week.map((day, i) => (
            <View className=" items-center " key={i}>
              <Text className=" text-xl font-semibold ml-2 mr-2 ">{day}</Text>
              <View
                className={`${
                  dayToday === i ? "bg-black" : "bg-none"
                } h-3 w-3 rounded-full mt-1`}
              ></View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
