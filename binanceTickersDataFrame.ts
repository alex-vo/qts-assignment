import axios from "axios";

type BinanceExchangeInfo = {
  symbols: {
    symbol: string;
  }[];
};

// const {data: {symbols}} = await axios.get<BinanceExchangeInfo>('https://api.binance.com/api/v3/exchangeInfo?symbols=["ETHUSDT"]&showPermissionSets=false');
const {data: {symbols}} = await axios.get<BinanceExchangeInfo>("https://api.binance.com/api/v3/exchangeInfo?showPermissionSets=false&permissions=SPOT");

const nowMinus20Min = new Date().getTime() - 20 * 60 * 1000;
const data = await Promise.all(
  symbols.filter(({symbol}) => symbol.endsWith("USDT"))
    .map(async ({symbol}) => {
        const {data: klinesData} = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=5m&startTime=${nowMinus20Min}`)

        return {ticker: symbol, klinesData};
      }
    )
);
console.log("Dataframe:");
console.log(data);