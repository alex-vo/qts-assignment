import WebSocket from "ws";

type BinanceTradeTickData = {
  q: number,
  p: number,
};

const PING_MESSAGE = "ping Binance server";
const RECONNECT_TIMEOUT = 10000;
const NEXT_CONNECTION_ATTEMPT_TIMEOUT = 2000;
const PING_INTERVAL = 3000;

const subscribeForTicks = (ticker: string, tickQuantityUSDTThreshold: number) => {
  let lastPong = new Date().getTime();

  const ws = new WebSocket(`wss://stream.binance.com/ws/${ticker}@trade`);

  ws.on("open", () => {
    console.log(`WebSocket connection for '${ticker}' tick stream opened`);
  });

  ws.on("ping", (data) => {
    ws.pong(data);
  });

  ws.on("pong", (data) => {
    if (data.toString() === PING_MESSAGE) {
      lastPong = new Date().getTime();
    }
  });

  ws.on("message", (data) => {
    const tick: BinanceTradeTickData = JSON.parse(data.toString());
    if (tick.q * tick.p > tickQuantityUSDTThreshold) {
      console.log(tick);
    }
  });

  ws.on("error", (error) => {
    console.error("WebSocket Error:", error);
  });

  ws.on("close", (code, reason) => {
    console.log(`Closing websocket with code ${code} and reason ${reason}`);
  });

  const pingInterval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.ping(PING_MESSAGE);
    }
    if (lastPong < new Date().getTime() - RECONNECT_TIMEOUT) {
      clearInterval(pingInterval);
      ws.terminate();
      setTimeout(() => {
        console.log(`Attempting to re-establish '${ticker}' tick stream connection...`);
        subscribeForTicks(ticker, tickQuantityUSDTThreshold);
      }, NEXT_CONNECTION_ATTEMPT_TIMEOUT);
    }
  }, PING_INTERVAL);
};

export {subscribeForTicks};
