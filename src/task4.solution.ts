import {PrismaClient} from "@prisma/client";
import {getAndSaveBinanceTickersWithHistoricalData} from "./binance/database.ts";

const dbClient = new PrismaClient();

console.log(`Entries in historical_data before fetching data: ${await dbClient.historical_data.count()}`);
await getAndSaveBinanceTickersWithHistoricalData();
console.log(`Entries in historical_data after fetching data: ${await dbClient.historical_data.count()}`);