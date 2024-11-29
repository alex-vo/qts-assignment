import axios from "axios";

const toMillis = (interval: string): number => {
  const absoluteInterval = Number(interval.substring(0, interval.length - 1));
  if (interval.endsWith("d")) {
    return absoluteInterval * 24 * 60 * 60 * 1000;
  } else if (interval.endsWith("h")) {
    return absoluteInterval * 60 * 60 * 1000;
  } else if (interval.endsWith("m")) {
    return absoluteInterval * 60 * 1000;
  } else if (interval.endsWith("s")) {
    return absoluteInterval * 1000;
  }
  throw new Error(`Unexpected interval ${interval}`);
}

// const {data: {symbols}} = await axios.get<BinanceExchangeInfo>('https://api.binance.com/api/v3/exchangeInfo?symbols=["ETHUSDT"]&showPermissionSets=false');
const interval = "1h";
const now = new Date().getTime();
const nowMinus150Days = now - 150 * 24 * 60 * 60 * 1000;
const {data} = await axios.get(`https://fapi.binance.com/fapi/v1/klines?symbol=DOGEUSDT&interval=${interval}&startTime=${nowMinus150Days}&endTime=${now}&limit=1500`);

console.log(data.length);
console.log(new Date(data[0][0]));
console.log(new Date(data[data.length - 1][0]));
console.log((data[data.length - 1][0] - data[0][0]) / (1000 * 60 * 60));