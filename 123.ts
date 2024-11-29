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

const API_MAX_RESPONSE_LINES = 1500;
const interval = "1h";
const intervalMillis = toMillis(interval);
const now = new Date().getTime();
const nowMinus150Days = now - 150 * 24 * 60 * 60 * 1000;
const ss = await Promise.all([...Array(Math.ceil((150 * 24 * 60 * 60 * 1000) / (toMillis(interval) * API_MAX_RESPONSE_LINES)))]
  .map((_, i) => nowMinus150Days + i * API_MAX_RESPONSE_LINES * intervalMillis)
  .map(async (startTime) => (await axios
    .get(`https://fapi.binance.com/fapi/v1/klines?symbol=DOGEUSDT&interval=${interval}&startTime=${startTime}&endTime=${now}&limit=1500`))
    .data)
);
console.log(ss.length);
for (let obj of ss) {
  console.log(new Date(obj[0][0]));
  console.log(new Date(obj[obj.length - 1][0]));
}

// // // console.log((now - nowMinus150Days) / toMillis(interval));
// // // console.log(((now - nowMinus150Days) / toMillis(interval)) / API_MAX_RESPONSE_LINES);
// // // console.log(new Date(nowMinus150Days + API_MAX_RESPONSE_LINES * toMillis(interval)));
// // // console.log(new Date(nowMinus150Days + 2 * API_MAX_RESPONSE_LINES * toMillis(interval)));
// // // console.log(new Date(nowMinus150Days + 3 * API_MAX_RESPONSE_LINES * toMillis(interval)));
// // // // console.log(new Date(nowMinus150Days));
