import axios from "axios";

type BinanceExchangeInfoData = {
  symbols: {
    symbol: string;
  }[];
};

type TickerWithHistoricalData = {
  ticker: string,
  historicalData: number[][];
};

const getBinanceTickersWithHistoricalData = async (): Promise<TickerWithHistoricalData[]> => {
  const {data: {symbols}} = await axios
    .get<BinanceExchangeInfoData>("https://api.binance.com/api/v3/exchangeInfo?showPermissionSets=false&permissions=SPOT");
  const nowMinus20Min = new Date().getTime() - 20 * 60 * 1000;

  return Promise.all(
    symbols.filter(({symbol}) => symbol.endsWith("USDT"))
      .map(async ({symbol}) => {
          const {data: historicalData} = await axios
            .get<number[][]>(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=5m&startTime=${nowMinus20Min}`)

          return {ticker: symbol, historicalData};
        }
      )
  );
}

export {getBinanceTickersWithHistoricalData};
