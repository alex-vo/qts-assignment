import {getHistoricalData} from "./binance/historicalData.ts";

const ticker = "DOGEUSDT";
const historicalDataDays = 150;
const interval = "1h";

console.log(`Dataframe for ${ticker} perp future ${historicalDataDays} days historical candle data with ${interval} interval:`);
console.log({ticker, historicalData: await getHistoricalData(ticker, interval, historicalDataDays)});