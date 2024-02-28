import CryptoImgs from "../models/cryptoImgs";

//models for Data
const CryptoImage = new CryptoImgs({});
const eachImage = CryptoImage.state.imgs.map((each) => ({
  name: each.name,
  image: each.cryptoImgs,
}));

//return crypto data that has only image
export const filteredDataImage = (data: any[]) => {
  let newData = eachImage.flatMap((symbol) => {
    return data.filter((name) => name["symbol"] === symbol.name);
  });

  return newData;
};

//images
export const Images = {
  NO: require("../assets/imgs/noImg.jpg"),
  StatGreen: require("../assets/imgs/stat_green.png"),
  StatRed: require("../assets/imgs/stat_red.png"),
};

//stat Color
export const statGreen = eachImage.find((stat) => {
  let image = stat.name === "STAT_GREEN";

  return image ? stat.image : null;
});

//function to find the symbol and if the symbol is thesame and it will return its image
export const getCryptoImage = (symbol: string) => {
  const Image = eachImage.find((img) => img.name === symbol);
  const noImage = eachImage.find((img) => img.name === "NO");

  return Image?.image || noImage?.image;
};

//function get the json price and fix it to two decimal only
export const getPriceTwoDecimal = (price: string) => {
  let num = parseInt(price);

  return num.toFixed(2);
};

//function get the json price and fix it to two decimal only
export const getPrice = (price: string) => {
  let num = parseInt(price);

  return num;
};

//remove the decimal and make it a whole number
export const getPercent = (percent: string) => {
  let num = parseInt(percent);

  return num;
};

//get crypto name and split the two word  name and split it to two and return the first name
export const getCryptoNameAndSplit = (name: string) => {
  let cryptoName = name.split(" ");

  return cryptoName[0];
};

//get the priceadded using percentage
export const getPercentageChange = (percent: string, price: string) => {
  const change = parseInt(percent);
  const currentPrice = parseInt(price);
  const priceChange: number = Math.floor((currentPrice * change) / 100);
  const yesterDayPrice = currentPrice - priceChange;

  return yesterDayPrice;
};
