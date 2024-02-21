import { Component } from "react";

interface Imgs {
  cryptoImgs: any;
  name: string;
}

interface State {
  imgs: Imgs[];
}

class CryptoImgs extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      imgs: [
        {
          cryptoImgs: require("../assets/imgs/bitcoin.png"),
          name: "BTC",
        },
        {
          cryptoImgs: require("../assets/imgs/etheruem.png"),
          name: "ETH",
        },
        {
          cryptoImgs: require("../assets/imgs/tether.png"),
          name: "USDT",
        },
        {
          cryptoImgs: require("../assets/imgs/binance.png"),
          name: "BNB",
        },
        {
          cryptoImgs: require("../assets/imgs/solana.png"),
          name: "SOL",
        },
        {
          cryptoImgs: require("../assets/imgs/USDC.png"),
          name: "USDC",
        },
        {
          cryptoImgs: require("../assets/imgs/XRP.png"),
          name: "XRP",
        },
        {
          cryptoImgs: require("../assets/imgs/ADA.png"),
          name: "ADA",
        },
        {
          cryptoImgs: require("../assets/imgs/AVAX.png"),
          name: "AVAX",
        },
        {
          cryptoImgs: require("../assets/imgs/TRX.png"),
          name: "TRX",
        },
        {
          cryptoImgs: require("../assets/imgs/WBTC.png"),
          name: "WBTC",
        },
        {
          cryptoImgs: require("../assets/imgs/SHIB.png"),
          name: "SHIB",
        },
        {
          cryptoImgs: require("../assets/imgs/BCH.png"),
          name: "BCH",
        },
        {
          cryptoImgs: require("../assets/imgs/LTC.png"),
          name: "LTC",
        },
        {
          cryptoImgs: require("../assets/imgs/UNI.png"),
          name: "UNI",
        },
        {
          cryptoImgs: require("../assets/imgs/ATOM.png"),
          name: "ATOM",
        },
        {
          cryptoImgs: require("../assets/imgs/STX.png"),
          name: "STX",
        },
        {
          cryptoImgs: require("../assets/imgs/ETC.png"),
          name: "ETC",
        },
        {
          cryptoImgs: require("../assets/imgs/OP.png"),
          name: "OP",
        },
        {
          cryptoImgs: require("../assets/imgs/noImg.jpg"),
          name: "NO",
        },
      ],
    };
  }
}

export default CryptoImgs;
