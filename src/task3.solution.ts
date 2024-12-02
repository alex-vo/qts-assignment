import {subscribeForTicks} from "./binance/websockets.ts";

subscribeForTicks("btcusdt", 20000);
subscribeForTicks("ethusdt", 10000);
subscribeForTicks("solusdt", 5000);