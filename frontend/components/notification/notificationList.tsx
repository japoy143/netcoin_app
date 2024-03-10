import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { EnvelopeIcon } from "react-native-heroicons/outline";
import { notification } from "../../screens/HomePage/homepage";

type NotificationListProps = {
  notifications: notification[];
};

export default function NotificationList({
  notifications,
}: NotificationListProps) {
  const height = useWindowDimensions().height;
  const width = useWindowDimensions().width;
  const flatedData = notifications.flatMap((data) => data["message"]);

  return (
    <View className=" flex-1 items-center mt-4">
      {notifications.length === 0 ? (
        <View className=" flex-1 items-center justify-center">
          <EnvelopeIcon size={100} color={"white"} />
          <Text
            className=" text-white text-xl font-medium"
            style={{ fontFamily: "poppins" }}
          >
            no recent notification
          </Text>
        </View>
      ) : (
        <FlatList
          data={flatedData}
          renderItem={({ item, index }) => (
            <View
              className=" rounded-lg "
              style={{
                backgroundColor: "rgba(21, 21, 22, 1)",
                height: height * 0.1,
                width: width * 0.9,
              }}
            >
              <TouchableOpacity className=" flex-row">
                <Text>{item.name}</Text>
                <Text>{item.price}</Text>
                <Text>{item.read}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}
