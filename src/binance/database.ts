import {exchange, PrismaClient} from "@prisma/client";
import {getBinanceTickersWithHistoricalData} from "./tickersDataFrame.ts";

const dbClient = new PrismaClient();

const getAndSaveBinanceTickersWithHistoricalData = async () => {
  const data = (await getBinanceTickersWithHistoricalData())
    .map(({ticker, historicalData}) => historicalData.map(historicalDataItem => ({
        id: crypto.randomUUID(),
        ticker,
        exchange: exchange.Binance,
        open_time: historicalDataItem[0],
        open: historicalDataItem[1],
        high: historicalDataItem[2],
        low: historicalDataItem[3],
        close: historicalDataItem[4],
        volume: historicalDataItem[5]
      }))
    )
    .flat();

  await dbClient.historical_data.createMany({
    data
  });
};

export {getAndSaveBinanceTickersWithHistoricalData};