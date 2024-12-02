import axios from "axios";
import crypto from "crypto";

type BinanceAccountData = {
  balances: any[];
};

const computeHmacSha256 = (secret: string, message: string) => {
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(message);
  return hmac.digest("hex");
}

const params = `timestamp=${new Date().getTime()}`;

const getAccountBalances = async (binanceApiKey: string, binanceApiKeySecret: string) => {
  return (await axios.get<BinanceAccountData>(
    `https://api.binance.com/api/v3/account?${params}&signature=${computeHmacSha256(binanceApiKeySecret, params)}`,
    {
      headers: {
        "X-MBX-APIKEY": binanceApiKey
      }
    }
  )).data.balances;
};

export {getAccountBalances};
