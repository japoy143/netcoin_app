import React from "react";
import { View, Modal, Text, Image, TouchableOpacity } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import NotificationList from "./notificationList";
import { notification } from "../../screens/HomePage/homepage";
type NotificationProps = {
  isOpen: boolean;
  notifications: notification[];
  setIsOpen: (value: boolean) => void; // usetate type
};

export default function Notification({
  isOpen,
  setIsOpen,
  notifications,
}: NotificationProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => setIsOpen(!isOpen)}
    >
      <View className=" bg-black flex-1 mt-2">
        <View className=" flex-row items-center justify-between mx-4">
          <TouchableOpacity onPress={() => setIsOpen(false)}>
            <ChevronLeftIcon size={30} color={"white"} />
          </TouchableOpacity>

          <Text
            className=" text-white text-xl font-semibold"
            style={{ fontFamily: "poppins" }}
          >
            Notifications
          </Text>
          <View></View>
        </View>
        <NotificationList notifications={notifications} />
      </View>
    </Modal>
  );
}
