import {getBinanceTickersWithHistoricalData} from "./binance/tickersDataFrame.ts";

console.log("Dataframe for spot tickers traded in USDT with 5 minute interval historical candle data:");
console.log(await getBinanceTickersWithHistoricalData());