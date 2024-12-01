import axios from "axios";

type BinanceExchangeInfo = {
  symbols: {
    symbol: string;
  }[];
};

const {data: {symbols}} = await axios
  .get<BinanceExchangeInfo>("https://api.binance.com/api/v3/exchangeInfo?showPermissionSets=false&permissions=SPOT");

const nowMinus20Min = new Date().getTime() - 20 * 60 * 1000;
const data = await Promise.all(
  symbols.filter(({symbol}) => symbol.endsWith("USDT"))
    .map(async ({symbol}) => {
        const {data: historicalData} = await axios
          .get(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=5m&startTime=${nowMinus20Min}`)

        return {ticker: symbol, historicalData};
      }
    )
);
console.log("Dataframe for spot tickers traded in USDT with 5 minute interval historical candle data:");
console.log(data);