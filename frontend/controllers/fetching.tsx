import axios from "axios";
import { axiosCustom } from "../api/axios";
import { Alert } from "react-native";
import { setCoins } from "../redux/data";
import { setDaily } from "../redux/week";
import { setNotifications } from "../redux/notifications";
import { setNotify } from "../redux/notify";
import { notification } from "../screens/HomePage/homepage";
// all dispatch function must come from parent directory
interface fetchData {
  dispatch: any;
}

const API_CRYPTO = "https://api.coincap.io/v2/assets";
const API_KEY = "34413f7c-4968-4dfb-a496-76844da6f4f1";
const STATISTICS_API = "/statistics/data";
const NOTIFICATION_API = "/notification/messages";
const APP_ID = "6689019f57f098284dab5b56";

// for fetching crypto
export const fetchCrypto = async ({ dispatch }: fetchData) => {
  try {
    const coins = await axios.get(`${API_CRYPTO}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    dispatch(setCoins(coins.data["data"]));
    const data = coins.data["data"];
    const filtered = data.filter(
      (price: { [x: string]: string }) =>
        parseInt(price["changePercent24Hr"]) > 10 ||
        parseInt(price["changePercent24Hr"]) < 0
    );
    const dataObjects = filtered.flatMap((items: { [x: string]: any }) => ({
      name: items["name"],
      symbol: items["symbol"],
      price: items["priceUsd"],
      percentage: items["changePercent24Hr"],
      read: 0,
    }));
    console.log(filtered, "Objects");

    const updateNotifications = await axiosCustom.patch(
      `${NOTIFICATION_API}/${APP_ID}`,
      {
        message: dataObjects,
      }
    );
  } catch (error) {
    Alert.alert("Fetching Error Crypto", "Data not Fetch");
  }
};

//for fetching daily updates
export const fetchDailyUpdates = async ({ dispatch }: fetchData) => {
  try {
    const stats = await axiosCustom.get(`${STATISTICS_API}`);
    dispatch(setDaily(stats.data["stats"]));
  } catch (error) {
    Alert.alert("Fetching Error Updates", "Data not Fetch");
  }
};

//for fetching notifications
export const fetchNotifications = async ({ dispatch }: fetchData) => {
  try {
    const notification = await axiosCustom.get(`${NOTIFICATION_API}`);
    dispatch(setNotifications(notification.data["notif"]));
    const notif = notification.data["notif"];
    const read = notif.flatMap((item: { [x: string]: any }) =>
      parseInt(item["read"])
    );
    console.log(read, "READ");
    if (read[0] === 0) {
      dispatch(setNotify(true));
    }
  } catch (error) {
    Alert.alert("Fetching Error Notification", "Data not Fetch");
  }
};

export const updateNotifications = async () => {
  try {
    const notifications = await axiosCustom.patch(
      `${NOTIFICATION_API}/${APP_ID}`,
      {
        read: 0,
      }
    );
  } catch (error) {
    Alert.alert("Updating Error Notification", "Data not Updated");
  }
};

//update read
export const handleClick = async () => {
  try {
    const notification = await axiosCustom.patch(
      `${NOTIFICATION_API}/${APP_ID}`,
      {
        read: 1,
      }
    );
  } catch (error) {
    Alert.alert("Fetching Error Notification", "Data not Updated");
  }
};

//update item read
export const messageRead = async (
  notifications: notification[],
  index: number
) => {
  const tapped = notifications.map((item) => {
    const change = item.message[index];
    const update = { ...change, read: 1 };
    return { ...item.message, update };
  });
  try {
    const notification = await axiosCustom.patch(
      `${NOTIFICATION_API}/${APP_ID}`,
      {
        message: tapped,
      }
    );
  } catch (error) {
    console.log("ERROR UPDATE");
  }
};
