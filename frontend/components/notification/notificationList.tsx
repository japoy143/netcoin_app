import React, { useState } from "react";
import {
  Text,
  View,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { EnvelopeIcon } from "react-native-heroicons/outline";
import { notification } from "../../screens/HomePage/homepage";
import { getCryptoNameAndSplit, getPrice } from "../reusableFunctions";
type NotificationListProps = {
  notifications: notification[];
};

export default function NotificationList({
  notifications,
}: NotificationListProps) {
  const height = useWindowDimensions().height;
  const width = useWindowDimensions().width;
  const flatedData = notifications.flatMap((data) => data["message"]);
  const [tappedIndex, setTappedIndex] = useState<number | null>(null);
  const [read, isRead] = useState<boolean>(false);

  //time
  const timeStamp = notifications[0].updatedAt;
  const time = new Date(timeStamp);
  const fottedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const messageRead = (index: number) => {
    setTappedIndex(read ? null : index);
    isRead((prev) => !prev);
  };

  const unRead = () => {
    setTappedIndex(null);
  };
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
            <TouchableOpacity
              className=" justify-center px-4 rounded-lg mb-2  "
              style={{
                backgroundColor: "rgba(21, 21, 22, 1)",
                height: tappedIndex === index ? height * 0.2 : height * 0.1,
                width: width * 0.9,
              }}
              onPressIn={() => messageRead(index)}
            >
              <View className="flex-row items-center justify-between">
                <Text className=" text-white text-2xl font-medium">
                  {getCryptoNameAndSplit(item.name)}
                </Text>

                {parseInt(item.percentage) > 0 ? (
                  <Text
                    className=" text-base"
                    style={{ color: "rgba(34, 204, 99, 1)" }}
                  >
                    new price high
                  </Text>
                ) : (
                  <Text
                    className="text-base"
                    style={{ color: "rgba(190, 21, 50, 1)" }}
                  >
                    new price decrease
                  </Text>
                )}
              </View>

              {tappedIndex === index && (
                <View className="">
                  <View className=" items-center mt-4">
                    <Text className=" text-2xl text-white font-medium">
                      ${getPrice(item.price)}
                    </Text>
                  </View>

                  <View className=" relative items-end">
                    <Text className=" text-white font-medium absolute top-3">
                      As of {fottedTime}
                    </Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
