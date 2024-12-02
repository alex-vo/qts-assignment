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

const getHistoricalData = async (ticker: string, interval: string, days: number) => {
  const intervalMillis = toMillis(interval);
  const now = new Date().getTime();
  const requests = Math.ceil((days * 24 * 60 * 60 * 1000) / (toMillis(interval) * API_MAX_RESPONSE_LINES));
  const startMillis = now - days * 24 * 60 * 60 * 1000;

  return (await Promise.all([...Array(requests)]
    .map((_, i) => startMillis + i * API_MAX_RESPONSE_LINES * intervalMillis)
    .map(
      async (startTime) => (
        await axios.get(`https://fapi.binance.com/fapi/v1/klines?symbol=${ticker}&interval=${interval}&startTime=${startTime}&endTime=${now}&limit=1500`)
      ).data
    )
  )).flat();
};

export {toMillis, getHistoricalData};