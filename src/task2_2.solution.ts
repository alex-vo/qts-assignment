import {getAccountBalances} from "./binance/accountBalance.ts";

console.log("Current account balance:");
console.log(await getAccountBalances(process.env.BINANCE_API_KEY!!, process.env.BINANCE_API_KEY_SECRET!!));